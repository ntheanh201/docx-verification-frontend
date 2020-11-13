import { React, useEffect } from 'core'

import { useSelector } from 'redux-core'
import { getPageState } from 'Store'
import { Button } from 'antd'

export const AudioPlayer = () => {
  useEffect(() => {})
  const { book } = useSelector(getPageState)

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

  return <div>AudioPlayer</div>
}
