import { React, styled, useState, useEffect } from 'core'
import { useDispatch, useSelector } from 'redux-core'
import { useParams } from 'router'

import { Pagination, Select } from 'antd'

import { getBookTotalPages } from 'Shared/utils'
import {
  getBooksState,
  getPageState,
  getPageInfoActionCreator,
  getBookInfoActionCreator
} from 'Store'
import { LoadingIndicator, PrimaryButton } from 'ui'
import { Container } from 'layout'

import { TextArea } from '../../components/TextArea/TextArea'
import { NormalText } from '../../components/NormalText/NormalText'

const { Option } = Select

export const BookScene = () => {
  const dispatch = useDispatch()
  let { bookId } = useParams<any>()
  const { bookDetail: reduxBookDetail } = useSelector(getBooksState)
  const { book } = useSelector(getPageState)

  const [state, setState] = useState({
    currentPage: 1,
    bookDetail: null
  })

  const { currentPage } = state

  useEffect(() => {
    const getBookInfo = async () => {
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

  const { text_norm, text_raw } = bookDetail

  return (
    <Container>
      <Wrapper>
        <NormalText content={text_raw} />
        <div>
          <PrimaryButton>Gen Audio</PrimaryButton>
          <PrimaryButton>Verify</PrimaryButton>
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
