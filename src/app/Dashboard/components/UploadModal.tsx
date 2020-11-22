import { React, useCallback, useState } from 'core'
import { CloudUploadOutlined, InboxOutlined } from '@ant-design/icons'
import { Form, Upload, Button, Modal } from 'antd'
import { useDispatch } from 'redux-core'
import { LoadingIndicator } from 'ui'
// import { message } from 'antd/es'

import { uploadBookActionCreator } from '../../Store/Books'

import VoiceSelect from './VoiceSelect'

const normFile = e => {
  console.log('Upload event:', e)
  if (Array.isArray(e)) {
    return e
  }
  return e && e.fileList
}

export function UploadModal() {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const callUpload = useCallback(
    async (file: any, voice_id: string) => {
      setLoading(true)
      await dispatch(uploadBookActionCreator(file, voice_id))
      setLoading(false)
    },
    [dispatch, setLoading]
  )
  const onOk = useCallback(() => {
    form
      .validateFields()
      .then(values => {
        const antFile = values.files[0]
        if (!antFile) {
          return
        }
        const file = antFile.originFileObj
        return callUpload(file, values.voice_id)
      })
      .then(() => form.resetFields())
      .catch(info => {
        console.log('Validate Failed:', info)
        setVisible(false)
      })
  }, [setVisible, form, callUpload])
  const onCancel = useCallback(() => {
    setVisible(false)
  }, [setVisible])
  const onShowModal = useCallback(() => {
    setVisible(visible => !visible)
  }, [setVisible])

  const conChange = e => {
    e && setDisabled(true)
  }

  return (
    <>
      <Button type='dashed' onClick={onShowModal}>
        <CloudUploadOutlined /> Tải sách lên
      </Button>
      <Modal
        title='Upload sách mới'
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        {loading ? (
          <LoadingIndicator />
        ) : (
          <Form form={form}>
            <Form.Item
              name='voice_id'
              rules={[{ required: true, message: 'Trường này được yêu cầu' }]}
            >
              <VoiceSelect />
            </Form.Item>
            <Form.Item
              name='files'
              valuePropName='fileList'
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger
                disabled={disabled}
                name='files'
                action={null}
                accept='.docx'
                onChange={conChange}
              >
                <p className='ant-upload-drag-icon'>
                  <InboxOutlined />
                </p>
                <p className='ant-upload-text'>
                  Click or drag file to this area to upload
                </p>
                <p className='ant-upload-hint'>
                  Support for a single or bulk upload.
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  )
}
