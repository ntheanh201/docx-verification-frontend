import { React, styled, useState, useEffect, useCallback } from 'core'
import { useDispatch, useSelector } from 'redux-core'
import { useParams, useHistory } from 'router'

import { Pagination, Select, Button, PageHeader } from 'antd'

import {
  getBooksState,
  getAudioState,
  getPageState,
  getPageInfoActionCreator,
  getBookInfoActionCreator,
  getVoicesActionCreator,
  verifyNormTextActionCreator,
  genAudioActionCreator,
  editNormTextActionCreator
} from 'Store'
import { LoadingIndicator, toast } from 'ui'
import { Container } from 'layout'

import { TextArea } from '../../components/TextArea/TextArea'
import { NormalText } from '../../components/NormalText/NormalText'
import { AudioBox } from '../../components/AudioBox/AudioBox'

const { Option } = Select

export const BookScene = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  let { bookId } = useParams<any>()
  const { bookDetail } = useSelector(getBooksState)
  const { book } = useSelector(getPageState)
  const { voices } = useSelector(getAudioState)

  const [state, setState] = useState({
    currentPage: 1,
    voiceId: (voices && voices[0]?.id) || '11',
    reGenAudio: false
  })

  const { currentPage, voiceId, reGenAudio } = state

  const fetchBookDetail = useCallback(async () => {
    await dispatch(getPageInfoActionCreator(bookId, currentPage))
  }, [bookId, currentPage, dispatch])

  useEffect(() => {
    const getBookInfo = async () => {
      await dispatch(getVoicesActionCreator())
      await dispatch(getBookInfoActionCreator(bookId))
      fetchBookDetail()
    }
    getBookInfo()
  }, [dispatch, bookId, currentPage, fetchBookDetail])

  if (!book || !bookDetail) {
    return <LoadingIndicator />
  }

  const onChangePage = page => {
    setState({ currentPage: page })
  }

  const onChangeVoice = id => {
    setState({ voiceId: id })
  }

  const onClickVerify = async () => {
    await dispatch(verifyNormTextActionCreator(book.id))
  }

  const onSubmitNormText = async textNorm => {
    await dispatch(editNormTextActionCreator(book.id, textNorm))
  }

  const onClickGenAudio = async () => {
    if (book.audio_url) {
      await setState({ reGenAudio: true })
    }
    await dispatch(genAudioActionCreator(book.id, voiceId))
    toast('Audio sẽ được xử lý trong vài phút')

    if (!book.audio_url) {
      setTimeout(() => {
        fetchBookDetail()
      }, 2000)
    }
  }

  const { text_norm, text_raw, status } = book

  return (
    <Wrapper>
      <PageHeader onBack={() => history.push('/')} title='Kiểm tra sách' />
      <ActionBar>
        <Select
          defaultValue={voices[0].id}
          style={{ width: 240 }}
          onChange={onChangeVoice}
        >
          {voices?.map(({ id, name }) => (
            <Option key={id} value={id}>
              {name}
            </Option>
          ))}
        </Select>
        <Button type='primary' onClick={onClickGenAudio}>
          Gen Audio
        </Button>
        <AudioBox reGenAudio={reGenAudio} />
        {status === 'verified' ? (
          <Button type='primary' danger onClick={onClickVerify}>
            Đã verify
          </Button>
        ) : (
          <Button type='primary' onClick={onClickVerify}>
            Verify
          </Button>
        )}
      </ActionBar>
      <ContentWrapper>
        <NormalText content={text_raw} />
        <TextArea content={text_norm} onSubmitNormText={onSubmitNormText} />
      </ContentWrapper>
      <Pagination
        style={{ textAlign: 'center' }}
        showQuickJumper
        current={currentPage}
        pageSize={1}
        defaultCurrent={1}
        total={bookDetail.total_pages - 1}
        onChange={onChangePage}
      />
    </Wrapper>
  )
}

const Wrapper = styled(Container)`
  padding: 15px 0;
`

const ActionBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`
