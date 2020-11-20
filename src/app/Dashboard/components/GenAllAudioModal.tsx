import React from 'react'
import { Alert, Button, message, Modal } from 'antd'
import { useCallback, useMemo, useState } from 'core'
import useVoiceName from '../hooks/useVoiceName'
import { pageService } from 'service'

const GenAllAudioModal = ({ id, default_voice }) => {
  const [visible, setVisible] = useState(false)
  const voiceName = useVoiceName(default_voice)
  const text = useMemo(
    () =>
      `Giọng đọc mặc định đang là: ${voiceName} . \n Bạn có muốn tiếp tục ?`,
    [voiceName]
  )
  const onOk = useCallback(() => {
    pageService
      .genAllAudio(id)
      .then(res => {
        message.success('Tiến trình được đưa vào hàng đợi !')
        console.log(res)
      })
      .catch(e => {
        message.error(e.message)
      })
  }, [id])
  return (
    <div>
      <Button type='link' onClick={() => setVisible(true)}>
        Gen Audio
      </Button>
      <Modal
        visible={visible}
        title={`Gen audio for #${id}`}
        onCancel={() => setVisible(false)}
        onOk={onOk}
      >
        <Alert message={text} type='warning' />
      </Modal>
    </div>
  )
}

export default GenAllAudioModal
