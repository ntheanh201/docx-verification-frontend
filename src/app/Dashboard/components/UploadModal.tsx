import { React, useCallback, useState } from 'core'
import {
  CloudUploadOutlined,
  DeleteOutlined,
  InboxOutlined
} from '@ant-design/icons'
import { Form, Upload, Button, Modal, message } from 'antd'
import { useDispatch } from 'redux-core'
import { LoadingIndicator } from 'ui'
// import { message } from 'antd/es'

import { uploadBookActionCreator } from '../../Store/Books'

import VoiceSelect from './VoiceSelect'
import { PaperClipOutlined } from '@ant-design/icons'

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
  const [fileList, setFileList] = useState([])
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
      .then(async values => {
        const antFile = fileList[0]
        if (!antFile) {
          message.warn('Bạn chưa chọn file nào !')
          return
        }
        const file = antFile.originFileObj
        await callUpload(file, values.voice_id)
        setFileList(() => [])
        form.resetFields()
      })
      .catch(info => {
        console.log('Validate Failed:', info)
        setVisible(false)
      })
  }, [setVisible, form, callUpload, fileList, setFileList])
  const onCancel = useCallback(() => {
    setVisible(false)
  }, [setVisible])
  const onShowModal = useCallback(() => {
    setVisible(visible => !visible)
  }, [setVisible])

  const onUploadChange = useCallback(info => {
    const fileList = info.fileList
    setFileList(fileList.slice(-1))
  }, [])
  const onRemoveFile = useCallback(
    uid => {
      setFileList(list => list.filter(i => i.uid !== uid))
    },
    [setFileList]
  )
  console.log(fileList)

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
                name='files'
                accept='.docx'
                showUploadList={false}
                beforeUpload={() => false}
                fileList={fileList}
                onChange={onUploadChange}
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
            <UploadList list={fileList} onRemove={onRemoveFile} />
          </Form>
        )}
      </Modal>
    </>
  )
}

const UploadList = function ({ list, onRemove }) {
  return (
    <>
      <div className='ant-upload-list ant-upload-list-text'>
        <div className=''>
          {list.map((file, i) => (
            <UploadItem {...file} key={i} onRemove={onRemove} />
          ))}
        </div>
      </div>
    </>
  )
}

function UploadItem(props) {
  return (
    <span>
      <div className='ant-upload-list-item ant-upload-list-item-undefined ant-upload-list-item-list-type-text'>
        <div className='ant-upload-list-item-info'>
          <span>
            <div className='ant-upload-text-icon'>
              <PaperClipOutlined />
            </div>
            <span
              className='ant-upload-list-item-name ant-upload-list-item-name-icon-count-1'
              title='specification_docx-verification (1).docx'
            >
              {props.name}
            </span>
            <span className='ant-upload-list-item-card-actions '>
              <button
                title='Remove file'
                type='button'
                className='ant-btn ant-btn-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-card-actions-btn'
                onClick={props.onRemove.bind(null, props.uid)}
              >
                <DeleteOutlined />
              </button>
            </span>
          </span>
        </div>
      </div>
    </span>
  )
}
