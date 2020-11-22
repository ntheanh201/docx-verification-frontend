import React from 'react'
import { Alert, Button, message, Modal } from 'antd'
import { useCallback, useMemo, useState } from 'core'
import useVoiceName from '../hooks/useVoiceName'
import { pageService } from 'service'
import { LoadingIndicator } from 'ui'

const GenAllAudioModal = ({ id, default_voice }) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const voiceName = useVoiceName(default_voice)
  const text = useMemo(
    () =>
      `Giọng đọc mặc định đang là: ${voiceName} . \n Bạn có muốn tiếp tục ?`,
    [voiceName]
  )
  const onOk = useCallback(() => {
    setLoading(true)
    pageService
      .genAllAudio(id)
      .then(res => {
        message.success('Tiến trình được đưa vào hàng đợi !')
        console.log(res)
      })
      .catch(e => {
        message.error(e.message)
      })
      .finally(() => setVisible(false))
  }, [id])

  console.log(loading)

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
        {loading && <LoadingIndicator />}
      </Modal>
    </div>
  )
}

export default GenAllAudioModal
