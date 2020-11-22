import React from 'react'
import { Alert, Button, Modal } from 'antd'
import { LoadingIndicator } from 'ui'
import { styled, useCallback, useState } from 'core'
import {
  mergeAudioActionCreator
} from '../../Store/Books'
import { useDispatch } from 'redux-core'

const MergeAll = ({ id, audio_url }: { id: number; audio_url: string }) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  // console.log(visible)
  // console.log(audio_url)
  // const [url, setURL] = useState('')
  const dispatch = useDispatch()
  // useEffect(() => {
  //   audio_url && setURL(audio_url)
  // }, [audio_url])
  const onClickDownloadAudio = useCallback(async () => {
    // await dispatch(setLoadingMergeAudio(true))
    await dispatch(mergeAudioActionCreator(id))
    // await dispatch(setLoadingMergeAudio(false))
  }, [dispatch, id])
  const onOK = useCallback(async () => {
    setLoading(true)
    await onClickDownloadAudio()
    return new Promise(resolve => setTimeout(() => {
      setLoading(false)
      resolve()
    }, 1000))
  }, [onClickDownloadAudio])

  return (
    <div>
      <Button type='link' onClick={() => setVisible(true)}>
        Merge
      </Button>
      <Modal
        title='Merge toàn bộ audio'
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={onOK}
        footer={null}
      >
        {loading ? <LoadingIndicator /> : <Container url={audio_url} onClick={onOK} />}
      </Modal>
    </div>
  )
}

export default MergeAll

const Container = styled(({ url, className, onClick }) => {
  return (
    <div className={className}>
      {url && <Alert message={<Message url={url} />} type='success' />}
      {url && <div className='__or'>Hoặc:</div>}
      <Button type='primary' block onClick={onClick}>
        Merge{' '}
      </Button>
    </div>
  )
})`
  > .__or {
    margin: 10px 0;
  }
`

function Message({ url }) {
  return (
    <div>
      {' '}
      Bạn có thể download file :{' '}
      <a href={url} rel='noopener noreferrer' target='_blank'>
        {url && url.substring(0, 30)}
      </a>
    </div>
  )
}
