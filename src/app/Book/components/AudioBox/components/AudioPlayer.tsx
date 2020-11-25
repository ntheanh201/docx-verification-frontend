import { React, styled, useState } from 'core'

import Sound from 'react-sound'
import { useSelector, useDispatch } from 'redux-core'
import {
  getAudioState,
  updatePlayStatus,
  updateAudioPosition,
  getPageState,
  updateDuration,
  updatePlaying,
  updateFinished
} from 'Store'

import PlayIcon from 'assets/play.svg'
import ResumeIcon from 'assets/pause.svg'
import StopIcon from 'assets/stop.svg'

import { PositionSlider } from './PositionSlider'

export const AudioPlayer = () => {
  const dispatch = useDispatch()

  const [state, setState] = useState({
    onFetch: true,
    resumePos: 0
  })

  const { resumePos, onFetch } = state

  const { playStatus, playing, playAll } = useSelector(getAudioState)
  const { book } = useSelector(getPageState)

  const onFetchPlayButton = () => {
    dispatch(updatePlaying(!playing))
    dispatch(updatePlayStatus(Sound.status.PLAYING))
  }

  const onClickPlayButton = () => {
    dispatch(updatePlaying(true))
    dispatch(updatePlayStatus(Sound.status.PLAYING))
  }

  const onClickPausedButton = () => {
    dispatch(updatePlaying(false))
    setState({ onFetch: false })
    dispatch(updatePlayStatus(Sound.status.PAUSED))
  }

  return (
    <>
      <Sound
        url={book.audio_url}
        playFromPosition={resumePos}
        playStatus={playStatus}
        onLoad={sound => {
          dispatch(updateDuration(sound.duration))
        }}
        onPlaying={sound => {
          sound.position !== 0 && dispatch(updateAudioPosition(sound.position))
        }}
        onPause={sound => {
          setState({ resumePos: sound.position })
          dispatch(updateAudioPosition(sound.position))
        }}
        onResume={sound => {
          setState({ resumePos: sound.position })
          dispatch(updateAudioPosition(sound.position))
        }}
        onFinishedPlaying={() => {
          setState({ resumePos: 0, onFetch: true })
          dispatch(updatePlaying(false))
          if (playAll) {
            dispatch(updateAudioPosition(0))
            dispatch(updateFinished(true))
          } else {
            dispatch(updatePlayStatus(Sound.status.STOPPED))
          }
        }}
      />
      <MediaPlayer>
        {!playing ? (
          onFetch ? (
            <Img src={PlayIcon} onClick={onFetchPlayButton} />
          ) : (
            <Img src={PlayIcon} onClick={onClickPlayButton} />
          )
        ) : (
          <Img src={ResumeIcon} onClick={onClickPausedButton} />
        )}
        <StyledStop
          playing={!playing && onFetch}
          src={StopIcon}
          onClick={() => {
            setState({ resumePos: 0, onFetch: true })
            dispatch(updateAudioPosition(0))
            dispatch(updatePlaying(false))
            dispatch(updatePlayStatus(Sound.status.STOPPED))
          }}
        />
        <PositionSlider
          setResumePos={value => setState({ resumePos: value })}
        />
      </MediaPlayer>
    </>
  )
}

const Img = styled.img`
  cursor: pointer;
  width: 26px;
  height: 26px;
`

const StyledStop = styled(Img)<{ playing: boolean }>`
  opacity: ${props => (props.playing ? '0.5' : '1')};
`

const MediaPlayer = styled.div`
  background-color: #1890ff;
  padding: 0.1rem 4rem;
  display: grid;
  grid-template-columns: 24px 24px auto;
  grid-gap: 16px;
  align-items: center;
  border-radius: 0.8rem;
`
