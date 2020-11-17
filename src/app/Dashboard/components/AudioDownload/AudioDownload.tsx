import { React, useState, useEffect } from 'core'
import { bookService, pageService } from 'service'

import { Button } from 'antd'

export const AudioDownload = ({ id }) => {
  const [acceptDownload, setAcceptDownload] = useState(false)

  useEffect(() => {
    if (id) {
      pageService.getGenAudioProgress(id).then(res => {
        if (res.generated === res.totals) {
          setAcceptDownload(true)
        }
      })
    }
  }, [id, setAcceptDownload])

  const onClickDownloadAudio = () => {
    bookService.mergeAudio(id).then(res => {
      console.log(res)
    })
  }

  if (!acceptDownload) {
    return null
  }

  return (
    <Button type='link' onClick={onClickDownloadAudio}>
      Download Audio
    </Button>
  )
}
