import { React, styled, useState, useEffect } from 'core'
import { useDispatch, useSelector } from 'redux-core'
import { useParams } from 'router'

import { Pagination, Select } from 'antd'

import {
  getBooksState,
  getAudioState,
  getPageState,
  getPageInfoActionCreator,
  getBookInfoActionCreator,
  getVoicesActionCreator,
  verifyNormTextActionCreator,
  genAudioActionCreator
} from 'Store'
import { LoadingIndicator, PrimaryButton, toast } from 'ui'
import { Container } from 'layout'

import { TextArea } from '../../components/TextArea/TextArea'
import { NormalText } from '../../components/NormalText/NormalText'

const { Option } = Select

export const BookScene = () => {
  const dispatch = useDispatch()
  let { bookId } = useParams<any>()
  const { bookDetail: reduxBookDetail } = useSelector(getBooksState)
  const { book } = useSelector(getPageState)
  const { voices } = useSelector(getAudioState)

  const [state, setState] = useState({
    currentPage: 1,
    bookDetail: null,
    voiceId: (voices && voices[0]?.id) || '11'
  })

  const { currentPage, voiceId } = state

  useEffect(() => {
    const getBookInfo = async () => {
      await dispatch(getVoicesActionCreator())
      await dispatch(getBookInfoActionCreator(bookId))
      const bookDetail = await dispatch(
        getPageInfoActionCreator(bookId, currentPage)
      )
      await setState({
        bookDetail
      })
    }
    getBookInfo()
  }, [dispatch, bookId, currentPage])

  const bookDetail = book || state.bookDetail

  if (!bookDetail || !reduxBookDetail) {
    return <LoadingIndicator />
  }

  const onChangePage = page => {
    setState({ currentPage: page })
  }

  const onChangeVoice = id => {
    setState({ voiceId: id })
  }

  const onClickVerify = async () => {
    await dispatch(verifyNormTextActionCreator(+bookId))
  }

  const onClickGenAudio = async () => {
    await dispatch(genAudioActionCreator(+bookId, voiceId))
    toast('Audio sẽ được xử lý trong vài phút')
  }

  const { text_norm, text_raw } = bookDetail

  return (
    <Container>
      <Select
        defaultValue={voices[0].id}
        style={{ width: 120 }}
        onChange={onChangeVoice}
      >
        {voices?.map(({ id, name }) => (
          <Option key={id} value={id}>
            {name}
          </Option>
        ))}
      </Select>
      <Wrapper>
        <NormalText content={text_raw} />
        <div>
          <PrimaryButton onClick={onClickGenAudio}>Gen Audio</PrimaryButton>
          <PrimaryButton onClick={onClickVerify}>Verify</PrimaryButton>
          <TextArea content={text_norm} />
        </div>
      </Wrapper>
      <Pagination
        showQuickJumper
        current={currentPage}
        pageSize={1}
        defaultCurrent={1}
        total={reduxBookDetail.total_pages - 1}
        onChange={onChangePage}
      />
    </Container>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`
