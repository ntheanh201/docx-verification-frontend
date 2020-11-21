import { React, styled, useState, useEffect, useCallback, useMemo } from 'core'
import { useDispatch, useSelector } from 'redux-core'
import { useParams, useHistory } from 'router'
import { Pagination, Button, PageHeader } from 'antd'
import {
  getBooksState,
  getPageState,
  getPageInfoActionCreator,
  verifyNormTextActionCreator,
  genAudioActionCreator,
  editNormTextActionCreator,
  checkIsGenerated,
  getBookInfoActionCreator
} from 'Store'
import { LoadingIndicator, toast } from 'ui'
import { Container } from 'layout'
import { TextArea } from '../../components/TextArea/TextArea'
import { NormalText } from '../../components/NormalText/NormalText'
import { AudioBox } from '../../components/AudioBox/AudioBox'
import { NormValueContext } from '../../components/TextArea/norm-value.context'
import VoiceSelect from '../../../Dashboard/components/VoiceSelect'

// const { Option } = Select

export const BookScene = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  let { bookId } = useParams<any>()
  const { bookDetail, loadingBookDetail } = useSelector(getBooksState)
  const { book } = useSelector(getPageState)
  // const { voices } = useSelector(getAudioState)

  const [state, setState] = useState({
    currentPage: 1
    // voiceId: (voices && voices[0]?.id) || '11'
    // reGenAudio: false
  })
  const [normText, setNormtext] = useState('')
  useEffect(() => {
    if (book && book.text_norm) {
      setNormtext(book.text_norm)
    }
  }, [book])

  const { currentPage } = state

  const fetchBookDetail = useCallback(async () => {
    bookId &&
      (await dispatch(getPageInfoActionCreator(bookId, currentPage - 1)))
  }, [bookId, currentPage, dispatch])

  // useEffect(() => {
  //   const getBookInfo = async () => {
  //     // await dispatch(getVoicesActionCreator())
  //     await dispatch(getBookInfoActionCreator(bookId))
  //     await fetchBookDetail()
  //   }
  //   getBookInfo()
  // }, [dispatch, bookId, currentPage, fetchBookDetail])

  // console.log(bookDetail, book)

  const onChangePage = page => {
    localStorage.setItem(`page-${bookId}`, page)
    setState({ currentPage: page })
  }

  useEffect(() => {
    const tracePage = localStorage?.getItem(`page-${bookId}`)
    if (tracePage) {
      onChangePage(tracePage)
    }
  })
  useEffect(() => {
    bookId && dispatch(getBookInfoActionCreator(bookId))
  }, [bookId, dispatch])
  useEffect(() => {
    !loadingBookDetail && fetchBookDetail()
  }, [fetchBookDetail, loadingBookDetail])

  useEffect(() => {
    if (book && book.task_id && !book.audio_url) {
      const interval = setInterval(() => {
        dispatch(checkIsGenerated(bookId, currentPage - 1, book.task_id))
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [book, dispatch, currentPage, bookId])

  const isGenerated = useMemo(() => {
    return book && book.task_id && book.audio_url !== ''
  }, [book])
  const isGenerating = useMemo(() => {
    return book && book.task_id && !book.audio_url
  }, [book])

  if (!book || !bookDetail || loadingBookDetail) {
    return <LoadingIndicator />
  }

  // const onChangeVoice = id => {
  //   setState({ voiceId: id })
  // }

  const onClickVerify = async () => {
    await dispatch(verifyNormTextActionCreator(book.id))
  }

  const onSubmitNormText = async () => {
    dispatch(editNormTextActionCreator(book.id, normText))
  }

  const onClickGenAudio = async () => {
    // if (book.audio_url) {
    //   await setState({ reGenAudio: true })
    // }
    await onSubmitNormText()
    await dispatch(genAudioActionCreator(book.id, book.default_voice))
    toast('Audio sẽ được xử lý trong vài phút')

    if (!book.audio_url) {
      setTimeout(() => {
        fetchBookDetail()
      }, 2000)
    }
  }

  const { text_raw, status, voice_id } = book

  return (
    <Wrapper>
      <PageHeader
        onBack={() => history.push('/')}
        title={`Kiểm tra sách: ${bookDetail.name}`}
      />
      <ActionBar>
        <VoiceName voice_id={voice_id} />
        <AudioContainer>
          <AudioWrapper>
            <AudioBox reGenAudio={isGenerating} />
          </AudioWrapper>
          <Button type='primary' onClick={onClickGenAudio}>
            Gen Audio
          </Button>

          {isGenerated &&
            (status === 'verified' ? (
              <Button type='primary' danger onClick={onClickVerify}>
                Bỏ xác minh
              </Button>
            ) : (
              <Button type='primary' onClick={onClickVerify}>
                Xác minh
              </Button>
            ))}
        </AudioContainer>

        {/* <Button type='primary' onClick={onSubmitNormText}>
          Cập nhật nội dung
        </Button> */}
      </ActionBar>
      <ContentWrapper>
        <NormalText content={text_raw} />
        <NormValueContext.Provider value={[normText, setNormtext]}>
          <TextArea />
        </NormValueContext.Provider>
      </ContentWrapper>
      <Pagination
        style={{ textAlign: 'center' }}
        showQuickJumper
        current={currentPage}
        pageSize={1}
        defaultCurrent={1}
        total={bookDetail.total_pages}
        showSizeChanger={false}
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

const AudioContainer = styled.div`
  display: flex;
  align-items: center;
  //flex-grow: 1;
  button {
    margin-left: 20px;
  }
`

const AudioWrapper = styled.div`
  flex-grow: 1;
  > * {
    width: 400px;
    border-radius: 5px;
  }

  //display: flex;
`

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  overflow: hidden;
`

function VoiceName({ voice_id }) {
  return <VoiceSelect value={voice_id} disabled />
}
