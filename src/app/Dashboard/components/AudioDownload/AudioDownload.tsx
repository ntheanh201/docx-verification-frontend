import { React, useState, useEffect } from 'core'
import { bookService, pageService } from 'service'

import { Button, Menu } from 'antd'

export const AudioDownload = ({ id, audio_url }) => {
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
    <Menu.Item>
      <Button type='link' onClick={onClickDownloadAudio}>
        <a
          href={audio_url}
          // eslint-disable-next-line react/jsx-no-target-blank
          target='_blank'
          download={audio_url}
        >
          Download Audio
        </a>
      </Button>
    </Menu.Item>
  )
}
