import { React, styled, useState, useEffect } from 'core'
import { useDispatch, useSelector } from 'redux-core'
import { useParams } from 'router'

import { Pagination } from 'antd'

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

export const BookScene = () => {
  const dispatch = useDispatch()
  let { bookId } = useParams<any>()
  // const { books } = useSelector(getBooksState)
  const { book } = useSelector(getPageState)

  const [state, setState] = useState({
    currentPage: 1,
    totalCount: 50
  })

  const { currentPage, totalCount } = state

  useEffect(() => {
    const getBookInfo = async () => {
      await dispatch(getBookInfoActionCreator(bookId))
      await dispatch(getPageInfoActionCreator(bookId, currentPage))
    }
    getBookInfo()
  }, [dispatch, bookId, currentPage])

  console.log(book)

  if (!book) {
    return <LoadingIndicator />
  }

  // const totalPages = getBookTotalPages(books, bookId)

  const onChangePage = page => {
    setState({ currentPage: page })
  }

  const { text_norm, text_raw } = book

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
        defaultCurrent={1}
        total={totalCount}
        onChange={onChangePage}
      />
    </Container>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`
