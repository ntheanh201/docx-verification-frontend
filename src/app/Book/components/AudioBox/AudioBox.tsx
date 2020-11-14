import { React } from 'core'

import { useSelector } from 'redux-core'
import { getPageState } from 'Store'
import { Button } from 'antd'

import { AudioPlayer } from './components/AudioPlayer'

export const AudioBox = ({ reGenAudio }) => {
  const { book } = useSelector(getPageState)

  if (reGenAudio) {
    return (
      <Button type='primary' loading>
        Đang gen lại file audio
      </Button>
    )
  }

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

  return <AudioPlayer />
}
