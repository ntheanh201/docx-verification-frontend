import { React, styled, useState } from 'core'

import Sound from 'react-sound'
import { useSelector, useDispatch } from 'redux-core'
import {
  getAudioState,
  getPageState,
  updatePlayStatus,
  updateAudioPosition,
  updateDuration
} from 'Store'
import { Button, Slider as SliderAntd } from 'antd'

import PlayIcon from 'assets/play.svg'
import ResumeIcon from 'assets/pause.svg'
import StopIcon from 'assets/stop.svg'

const SliderAudio = ({ setResumePos }) => {
  const { position, duration } = useSelector(getAudioState)

  return (
    <Slider value={position} min={0} max={duration} onChange={setResumePos} />
  )

  // const { duration } = useSelector(getAudioState)

  // return <Slider value={0} min={0} max={duration} onChange={setResumePos} />
}

export const AudioPlayer = () => {
  const dispatch = useDispatch()

  const [state, setState] = useState({
    playing: false,
    onFetch: true,
    resumePos: 0,
    loading: false
  })
  console.log(state)

  const { book } = useSelector(getPageState)
  const { playStatus } = useSelector(getAudioState)

  const { playing, resumePos, onFetch } = state

  if (book?.task_id && !book.audio_url) {
    return (
      <Button type='primary' loading>
        Đang xử lý file audio
      </Button>
    )
  } else if (!book?.audio_url) {
    return (
      <Button type='primary' danger disabled>
        Chưa gen audio
      </Button>
    )
  }

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
        <SliderAudio setResumePos={value => setState({ resumePos: value })} />
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

const Slider = styled(SliderAntd)`
  width: 60px;
`
