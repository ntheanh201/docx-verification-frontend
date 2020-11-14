import { React, styled, useState } from 'core'

import Sound from 'react-sound'
import { useSelector, useDispatch } from 'redux-core'
import {
  getAudioState,
  updatePlayStatus,
  updateAudioPosition,
  getPageState,
  updateDuration
} from 'Store'

import PlayIcon from 'assets/play.svg'
import ResumeIcon from 'assets/pause.svg'
import StopIcon from 'assets/stop.svg'

import { PositionSlider } from './PositionSlider'

export const AudioPlayer = () => {
  const dispatch = useDispatch()

  const [state, setState] = useState({
    playing: false,
    onFetch: true,
    resumePos: 0
  })

  const { playing, resumePos, onFetch } = state

  const { playStatus } = useSelector(getAudioState)
  const { book } = useSelector(getPageState)

  const onFetchPlayButton = () => {
    setState({ playing: !playing })
    dispatch(updatePlayStatus(Sound.status.PLAYING))
  }

  const onClickPlayButton = () => {
    setState({ playing: true })
    dispatch(updatePlayStatus(Sound.status.PLAYING))
  }

  const onClickPausedButton = () => {
    setState({ playing: false, onFetch: false })
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
          setState({ resumePos: 0, playing: false, onFetch: true })
          dispatch(updatePlayStatus(Sound.status.STOPPED))
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
            setState({ resumePos: 0, playing: false, onFetch: true })
            dispatch(updateAudioPosition(0))
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
  background-color: #227ca2;
  padding: 0.1rem 4rem;
  display: grid;
  grid-template-columns: 24px 24px auto;
  grid-gap: 16px;
  align-items: center;
  border-radius: 0.8rem;
`
