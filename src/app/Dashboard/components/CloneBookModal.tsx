import React from 'react'
import { Button, Form, message, Modal } from 'antd'
import { useCallback, useState } from 'core'
import { LoadingIndicator } from 'ui'
import VoiceSelect from './VoiceSelect'
import { useDispatch } from 'redux-core'
import { cloneBookActionCreator } from '../../Store/Books'

const CloneBookModal = ({ id }: { id: string }) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const callClone = useCallback(
    async (id, default_voice) => {
      setLoading(true)
      if (await dispatch(cloneBookActionCreator(id, default_voice))) {
        message.success('Clone thành công !')
        setVisible(false)
      }
      setLoading(false)
    },
    [dispatch]
  )

  const onOk = useCallback(() => {
    form
      .validateFields()
      .then(values => {
        // return callUpload(file, values.voice_id)
        return callClone(id, values.default_voice)
      })
      .then(() => form.resetFields())
      .catch(info => {
        console.log('Validate Failed:', info)
        setVisible(false)
      })
  }, [setVisible, form, id, callClone])
  return (
    <>
      <Button type='link' onClick={() => setVisible(true)}>
        Clone
      </Button>
      <Modal
        title='Clone sách'
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={onOk}
      >
        {loading ? (
          <LoadingIndicator />
        ) : (
          <Form form={form} layout='vertical'>
            <Form.Item
              label='Giọng đọc'
              name='default_voice'
              rules={[{ required: true, message: 'Trường này được yêu cầu' }]}
            >
              <VoiceSelect />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  )
}

export default CloneBookModal
