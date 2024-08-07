import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getClips } from 'src/common/api';
import {
	setClipIndex,
	setClips,
	setClipSeen,
	setCurrentClip,
	setCurrentSearch,
	setFavourites,
	setFilteredClips,
	updateClips
} from 'src/state/reducer';
import { MdWarning } from 'react-icons/md';
import { useStateValue } from 'src/state/state';
import { apiTimePeriod, searchClips } from 'src/types/search';
import ReactGA from 'react-ga';
import './player.scss';
import 'src/styles/button-generic.scss';
import Loader from '../common/loader/Loader';
import {
	addClipSeen,
	addFavourite,
	getClipsSeen,
	getFavourites,
	getUserOptions,
	saveUserOptions
} from 'src/common/localstorage';
import PlayerError from './PlayerError';
import PlayerFinished from './PlayerFinished';
import CommentsBox from './CommentsBox';
import { getRandomInt } from 'src/common/utils';
import VideoTopControls from './VideoTopControls';
import VideoBottomControls from './VideoBottomControls';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import YouTube from 'react-youtube';
import { storageOptions } from 'src/types/options';
import Playlist from './Playlist';

const Player: FC = () => {
	const [{ clips, currentClip, clipIndex, currentSearch }, dispatch] = useStateValue();
	const [indexUsed, setIndexUsed] = useState<number[]>([]);
	const [transition, setTransition] = useState('loading');
	const [error, setError] = useState(false);
	const [finished, setFinished] = useState(false);
	const [videoMaxWidth, setVideoMaxWidth] = useState(1200);
	const [loadingClips, setLoadingClips] = useState(false);
	const [commentsVisible, setCommentsVisible] = useState(true);
	const [nextDisabled, setNextDisabled] = useState(false);
	const [prevDisabled, setPrevDisabled] = useState(true);
	const [innerFullScreen, setInnerFullScreen] = useState(false);
	const [videoPlaying, setVideoPlaying] = useState(false);
	const [videoPercentage, setVideoPercentage] = useState(0);
	const [videoFullScreen, setVideoFullScreen] = useState(false);
	const [controlsVisible, setControlsVisible] = useState(false);
	const [nsfw, setNsfw] = useState(true);
	const [filterSeen, setFilterSeen] = useState(false);
	const [soundMuted, setSoundMuted] = useState(false);
	const [playlistVisible, setPlaylistVisible] = useState(false);
	const videoEl = useRef<HTMLVideoElement>(null);
	const audioEl = useRef<HTMLAudioElement>(null);
	const videoContainer = useRef<HTMLDivElement>(null);
	const params = useParams<searchClips>();
	const handle = useFullScreenHandle();

	useEffect(() => {
		ReactGA.pageview(window.location.pathname + window.location.search);
	}, [params]);

	const loadMoreClips = useCallback(async () => {
		const after = clips.pagination.cursor;
		if (after !== '' && !loadingClips) {
			setLoadingClips(true);
			const data = await getClips(currentSearch, after);
			if ('error' in data) {
				setLoadingClips(false);
				console.log(data.error);
			} else {
				dispatch(updateClips(data));
				setLoadingClips(false);
			}
		}
	}, [clips.pagination.cursor, currentSearch, dispatch, loadingClips]);

	useEffect(() => {
		setTransition('loading');

		const getdata = async () => {
			dispatch(setCurrentSearch(params));
			const data = await getClips(params);

			if ('error' in data) {
				setError(true);
				setTransition('');
			} else {
				dispatch(setClips(data));
				setError(false);
				if (params.timePeriod === apiTimePeriod.shuffle) {
					const randomIndex = getRandomInt(0, data.data.length);
					const clip = data.data[randomIndex];
					dispatch(setCurrentClip(clip));
					dispatch(setClipIndex(randomIndex));
					dispatch(setClipSeen(clip));
					setIndexUsed([randomIndex]);
				} else {
					dispatch(setCurrentClip(data.data[0]));
					dispatch(setClipIndex(0));
				}
				setFinished(false);
				await addFavourite(params);
				const favouritesRes = await getFavourites();

				dispatch(setFavourites(favouritesRes));
			}
		};

		getdata();

		return () => {
			dispatch(
				setCurrentClip({
					id: '',
					title: '',
					video_url: '',
					twitch_url: '',
					comments_url: ''
				})
			);
			setTransition('loading');
		};
	}, [dispatch, params]);

	useEffect(() => {
		const clipsSeen = getClipsSeen();
		const dataFiltered = clips.data.filter((item: any) => !clipsSeen.includes(item.id));

		dispatch(setFilteredClips(dataFiltered));

		if (clips.data.length > 0 && clips.pagination.cursor && dataFiltered.length <= 10) {
			loadMoreClips();
		}
	}, [clips.data, clips.pagination.cursor, dispatch, loadMoreClips]);

	useEffect(() => {
		if (filterSeen && clipIndex === 0 && clips.filtered?.length > 0)
			dispatch(setCurrentClip(clips.filtered[0]));
		else if (filterSeen && clipIndex === 0 && clips.filtered?.length === 0) {
			dispatch(
				setCurrentClip({
					id: '',
					title: '',
					video_url: '',
					comments_url: '',
					twitch_url: ''
				})
			);
		}
	}, [clipIndex, clips.filtered, dispatch, filterSeen]);

	const nextClip = useCallback(
		(direction?: string) => {
			let clipsData = clips.data;
			if (filterSeen) clipsData = clips.filtered;

			let newClipIndex = direction === 'prev' ? clipIndex - 1 : clipIndex + 1;
			if (direction === 'prev' && clipIndex <= 0 && currentSearch.timePeriod !== apiTimePeriod.shuffle)
				return false;

			if (currentSearch.timePeriod === apiTimePeriod.shuffle) {
				const indexUsedPopped = indexUsed.slice(0, indexUsed.length - 1);
				ReactGA.pageview(`${window.location.pathname}${window.location.search}/${indexUsed.length}`);

				//increase clips pool
				clipsData.length < 1100 && loadMoreClips();

				// When going backwards use the previous clips instead of random
				if (direction === 'prev') {
					const indexUsedLength = indexUsed.length;
					if (indexUsedLength > 0) {
						const currentIndex = indexUsed.indexOf(clipIndex);
						newClipIndex = indexUsed[currentIndex - 1];
					}
				}

				// If the user went back show the clips ordered instead of grabbing a new random one
				else if (indexUsed.length > 1 && indexUsedPopped.includes(clipIndex)) {
					const currentIndex = indexUsed.indexOf(clipIndex);
					newClipIndex = indexUsed[currentIndex + 1];
				} else {
					const filteredData = clipsData.filter(clip => !clip.seen);
					if (filteredData.length > 0) {
						const filteredIndex = getRandomInt(0, filteredData.length - 1);
						const filteredClip = filteredData[filteredIndex];
						newClipIndex = clipsData.findIndex(clip => clip === filteredClip);
						setIndexUsed(indexUsed.concat(newClipIndex));
					} else {
						setFinished(true);
						setTransition('');

						return false;
					}
				}
			}

			if (newClipIndex < clips.data.length) {
				let newClip = clipsData[newClipIndex];
				while (newClip.nsfw && !nsfw) {
					direction === 'prev' ? newClipIndex-- : newClipIndex++;
					newClip = clipsData[newClipIndex];
				}

				//Twitch pagination sometimes sends the same clip as the last in the payload and first in the next
				if (clipIndex > 0 && clipsData[clipIndex].video_url === newClip.video_url) {
					nextClip();
				} else {
					setTransition('loading');
					setFinished(false);
					dispatch(setCurrentClip(newClip));
					dispatch(setClipIndex(newClipIndex));
					if (currentSearch.timePeriod === apiTimePeriod.shuffle) dispatch(setClipSeen(newClip));

					if (currentSearch.timePeriod !== apiTimePeriod.shuffle) {
						ReactGA.pageview(`${window.location.pathname}${window.location.search}/${newClipIndex}`);
					}
				}
			} else {
				setFinished(true);
				setTransition('');
			}

			if (currentSearch.timePeriod === apiTimePeriod.shuffle) {
				clipsData.length === indexUsed.length ? setNextDisabled(true) : setNextDisabled(false);
				indexUsed.length === 0 || indexUsed[0] === newClipIndex
					? setPrevDisabled(true)
					: setPrevDisabled(false);
			} else {
				clips.data.length < newClipIndex + 1 ? setNextDisabled(true) : setNextDisabled(false);
				newClipIndex <= 0 ? setPrevDisabled(true) : setPrevDisabled(false);
			}
		},
		[
			clipIndex,
			clips.data,
			clips.filtered,
			currentSearch.timePeriod,
			dispatch,
			filterSeen,
			indexUsed,
			loadMoreClips,
			nsfw
		]
	);

	useEffect(() => {
		//Just in case the first clip is nsfw and nsfw filter is on
		if (currentClip.nsfw && !nsfw) {
			nextClip();
		}
	}, [currentClip.nsfw, nextClip, nsfw]);

	useEffect(() => {
		const clipsTotal = clips.data.length;

		//When there are clips and the currentClip is reaching the last fetch more
		if (clipsTotal > 0 && clipIndex + 10 > clipsTotal) {
			loadMoreClips();
		}
	}, [clips, clipIndex, nextClip, loadMoreClips]);

	useEffect(() => {
		const clipsTotal = clips.filtered?.length;
		if (filterSeen && clipIndex + 10 > clipsTotal) {
			loadMoreClips();
		}
	}, [clips, clipIndex, nextClip, loadMoreClips, filterSeen]);

	const handleVideoPlay = useCallback(() => {
		if (videoPlaying) {
			videoEl.current?.pause();
			if (audioEl?.current?.src) audioEl.current?.pause();
		} else {
			videoEl.current?.play();
			if (audioEl?.current?.src) audioEl.current?.play();
		}
		setVideoPlaying(!videoPlaying);
	}, [videoPlaying]);

	const handleVideoFullScreen = () => {
		if (videoFullScreen) {
			handle.exit();
			setVideoFullScreen(false);
		} else {
			handle.enter();
			setVideoFullScreen(true);
		}
	};

	useEffect(() => {
		const controlsTimeout = setTimeout(() => {
			if (videoPlaying) setControlsVisible(false);
		}, 3000);
		return () => {
			clearTimeout(controlsTimeout);
		};
	}, [controlsVisible, videoPlaying]);

	useEffect(() => {
		const updateVideoSize = () => {
			const vh = window.innerHeight;
			const vw = window.innerWidth;

			if (videoEl && vw > 1000) {
				setVideoMaxWidth((vh - 200) * 1.69);
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') nextClip('prev');
			if (e.key === 'ArrowRight') nextClip();
			if (e.key === ' ') handleVideoPlay();
		};

		updateVideoSize();

		window.onresize = updateVideoSize;
		window.onkeydown = handleKeyDown;
	}, [handleVideoPlay, nextClip]);

	const handleAudioError = () => {
		const audio = audioEl.current;
		if (audio && audio.src.includes('DASH_audio')) {
			const currentSrc = audio.src;

			audio.src = currentSrc?.replace('DASH_audio.mp4', 'audio');
		} else {
			dispatch(
				setCurrentClip({
					...currentClip,
					audio_url: ''
				})
			);
		}
	};

	useEffect(() => {
		const updateVideoSize = () => {
			const vh = window.innerHeight;
			const vw = window.innerWidth;

			if (videoEl && vw > 1000) {
				setVideoMaxWidth((vh - 200) * 1.69);
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') nextClip('prev');
			if (e.key === 'ArrowRight') nextClip();
			if (e.key === ' ') handleVideoPlay();
		};

		updateVideoSize();

		window.onresize = updateVideoSize;
		window.onkeydown = handleKeyDown;
	}, [handleVideoPlay, nextClip]);

	const handleNsfw = () => {
		const savedOptions = getUserOptions();

		saveUserOptions({
			...savedOptions,
			nsfw: !nsfw
		});
		setNsfw(!nsfw);
	};

	const handleFilterSeen = () => {
		const savedOptions = getUserOptions();

		saveUserOptions({
			...savedOptions,
			filterSeen: !filterSeen
		});
		setFilterSeen(!filterSeen);
	};

	useEffect(() => {
		const savedOptions: storageOptions = getUserOptions();

		setNsfw(savedOptions.nsfw);
		setFilterSeen(savedOptions.filterSeen);
	}, []);

	useEffect(() => {
		currentClip.id !== '' && addClipSeen(currentClip.id);
	}, [currentClip.id]);

	const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
		const target = e.currentTarget;

		if (target.src !== currentClip.fallback_url && currentClip.fallback_url) {
			target.src = currentClip.fallback_url;
		} else {
			nextClip();
		}
	};

	const handleVideoUpdate = () => {
		const videoTime = videoEl.current?.currentTime;
		const audioCurrent = audioEl.current;
		const audioTime = audioCurrent?.currentTime;

		if (audioCurrent && videoTime && audioTime && Math.round(videoTime) !== Math.round(audioTime)) {
			audioCurrent.currentTime = videoTime + 0.2;
		}
	};

	const autoplayValue: 0 | 1 | undefined = 1;
	const opts = {
		playerVars: {
			autoplay: autoplayValue
		}
	};

	return (
		<FullScreen handle={handle}>
			<div
				ref={videoContainer}
				className={`player-container ${commentsVisible && currentClip.comments ? 'has-comments' : ''}${
					videoFullScreen ? ' is-fullscreen' : ''
				}${innerFullScreen ? ' is-inner-fullscreen' : ''}`}
				style={{ maxWidth: videoMaxWidth }}
			>
				{finished && <PlayerFinished />}
				{(currentClip.video_url || currentClip.fallback_url) && (
					<>
						<VideoTopControls
							handleComments={() => setCommentsVisible(!commentsVisible)}
							handleNext={() => nextClip()}
							handlePrev={() => nextClip('prev')}
							handleNsfw={() => handleNsfw()}
							handleInnerFullScreen={() => setInnerFullScreen(!innerFullScreen)}
							handleFilterSeen={() => handleFilterSeen()}
							handlePlaylist={() => setPlaylistVisible(!playlistVisible)}
							nsfw={nsfw}
							nextDisabled={nextDisabled}
							prevDisabled={prevDisabled}
							innerFullScreen={innerFullScreen}
							filterSeen={filterSeen}
						/>
						<div className='video-comments-wrapper'>
							{
								<>
									<div
										className={`video-controls-wrapper ${
											(!videoPlaying || controlsVisible) && !currentClip.isYoutube ? 'controls-visible' : ''
										}`}
									>
										{currentClip.loud && (
											<span className='warning-loud'>
												<MdWarning /> Loud
											</span>
										)}

										{currentClip.isYoutube ? (
											<YouTube
												videoId={currentClip.video_url}
												opts={opts}
												containerClassName='youtube-container'
												onStateChange={() => setTransition('')}
												onPlay={() => setVideoPlaying(true)}
												onEnd={() => nextClip()}
												onPause={() => setVideoPlaying(false)}
												onError={() => nextClip()}
											/>
										) : (
											<>
												<video
													className={transition}
													src={
														currentClip.video_url !== '' ? currentClip.video_url : currentClip.fallback_url
													}
													ref={videoEl}
													autoPlay={true}
													muted={soundMuted}
													onEnded={() => nextClip()}
													onLoadedData={() => setTransition('')}
													onError={e => handleVideoError(e)}
													onPlay={() => setVideoPlaying(true)}
													onClick={() => handleVideoPlay()}
													onMouseMove={() => setControlsVisible(true)}
													onTimeUpdateCapture={() => handleVideoUpdate()}
													onTimeUpdate={() =>
														setVideoPercentage(
															(100 / videoEl.current!.duration) * videoEl.current!.currentTime
														)
													}
												></video>

												{currentClip.audio_url && (
													<audio
														ref={audioEl}
														src={currentClip.audio_url}
														autoPlay={videoPlaying}
														controls={false}
														muted={soundMuted}
														onError={() => handleAudioError()}
													></audio>
												)}

												<VideoBottomControls
													videoEl={videoEl.current}
													audioEl={audioEl.current}
													handleVideoPlay={() => handleVideoPlay()}
													videoPlaying={videoPlaying}
													videoPercentage={videoPercentage}
													videoFullScreen={videoFullScreen}
													hasAudio={!!!currentClip.isYoutube}
													soundMuted={soundMuted}
													handleSoundMuted={() => setSoundMuted(!soundMuted)}
													handleVideoFullScreen={handleVideoFullScreen}
													handleMouseMove={() => setControlsVisible(true)}
												/>
											</>
										)}
									</div>
								</>
							}
							{currentClip.comments && transition !== 'loading' ? (
								<CommentsBox
									currentClip={currentClip}
									handleComments={() => setCommentsVisible(!commentsVisible)}
								></CommentsBox>
							) : null}

							<Playlist
								filterSeen={filterSeen}
								playlistVisible={playlistVisible}
								hidePlaylist={() => setPlaylistVisible(false)}
							/>
						</div>
					</>
				)}
				{error && <PlayerError />}

				<Loader visible={transition} />
			</div>
		</FullScreen>
	);
};

export default Player;
