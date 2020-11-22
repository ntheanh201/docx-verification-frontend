import { React, useState } from 'core'
import { Button } from 'antd'
// import { setLoadingMergeAudio, mergeAudioActionCreator } from 'Store'
import { useDispatch } from 'redux-core'

export const AudioDownload = ({ id, audio_url, acceptAudioDownload }) => {
  // const dispatch = useDispatch()

  const [state, setState] = useState({
    audioUrl: null
  })

  const onClickDownloadAudio = async () => {
    // await dispatch(setLoadingMergeAudio(true))
    // const url = await dispatch(mergeAudioActionCreator(id))
    // await setState({ audioUrl: url })
    // await dispatch(setLoadingMergeAudio(false))
  }

  if (!acceptAudioDownload) {
    return null
  }

  const audioUrl = state.audioUrl || audio_url

  return (
    <Button type='link' onClick={onClickDownloadAudio}>
      <a
        href={audioUrl}
        // eslint-disable-next-line react/jsx-no-target-blank
        target='_blank'
        download={audioUrl}
      >
        Download Audio
      </a>
    </Button>
  )
}
