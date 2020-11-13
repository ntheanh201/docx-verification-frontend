import { React, styled, useEffect, FC, useState } from 'core'
import { useDispatch, useSelector } from 'redux-core'
import { useHistory } from 'router'

import { Table } from 'antd'
import { Container } from 'layout'
import { LoadingIndicator, PrimaryButton } from 'ui'

import './UploadList.css'

import { columns } from './UploadListHelper'
import {
  getAllBooksActionCreator,
  getBooksState,
  uploadBookActionCreator
} from 'Store'

export const UploadList: FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [state, setState] = useState({
    currentPage: 0
  })

  const onHandleUpload = async event => {
    const file = event?.target?.files[0]
    const book = await dispatch(uploadBookActionCreator(file))
    //@ts-ignore
    history.push(`/book/${book?.id}`)
  }

  const onChangePage = page => {
    setState({ currentPage: page })
  }

  useEffect(() => {
    const getAllBooks = async () => {
      await dispatch(getAllBooksActionCreator(state.currentPage))
    }
    getAllBooks()
  }, [dispatch, state.currentPage])

  const { books } = useSelector(getBooksState)

  if (!books) {
    return <LoadingIndicator />
  }

  return (
    <Container>
      <Header>
        <Button>
          <input type='file' name='file' id='file' onChange={onHandleUpload} />
          <Label htmlFor='file'>
            <i className='fa fa-cloud-upload icon-upload'></i> Upload
          </Label>
        </Button>
      </Header>

      <Table
        columns={columns}
        dataSource={books}
        rowKey={record => record.id}
        pagination={{
          current: books.current_page,
          total: books.total_pages,
          defaultPageSize: books.page_size,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30'],
          onChange: onChangePage
        }}
      />
    </Container>
  )
}

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 2rem 0;
`

const Label = styled.label``

const Button = styled(PrimaryButton)`
  height: unset;
  padding: 10px 30px;
`
