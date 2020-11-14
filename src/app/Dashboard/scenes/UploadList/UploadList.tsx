import { React, styled, useEffect, FC, useState } from 'core'
import { useDispatch, useSelector } from 'redux-core'
import { useHistory } from 'router'

import { Modal, Table, Button as PrimaryButton } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'
import { Container } from 'layout'
import { LoadingIndicator } from 'ui'

import './UploadList.css'

import { columns } from './UploadListHelper'
import {
  getAllBooksActionCreator,
  getBooksState,
  uploadBookActionCreator,
  deleteBookActionCreator
} from 'Store'
import { bookService } from 'service'

export const UploadList: FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { books, total_pages, page_size } = useSelector(getBooksState)

  const [state, setState] = useState({
    currentPage: 1,
    deleteModalVisible: false,
    deleteId: null,
    transmitting: false,
    file: null
  })

  const onHandleUpload = async event => {
    const file = event?.target?.files[0]
    await setState({ transmitting: true })
    const book = await dispatch(uploadBookActionCreator(file))
    await setState({ transmitting: false })
    //@ts-ignore
    history.push(`/book/${book?.id}`)
  }

  const onChangePage = page => {
    setState({ currentPage: page })
  }

  const onModalVisible = id => {
    setState({ deleteModalVisible: true, deleteId: id })
  }

  const onModalCancel = () => {
    setState({ deleteModalVisible: false })
  }

  const onModalConfirm = async () => {
    await dispatch(deleteBookActionCreator(state.deleteId))
    await setState({ deleteModalVisible: false })
  }

  const onClickDownloadBook = async (savedName: string) => {
    const data = await bookService.downloadBook(savedName)
    console.log(data)
    await setState({ file: data })
  }

  useEffect(() => {
    const getAllBooks = async () => {
      await dispatch(getAllBooksActionCreator(state.currentPage - 1))
    }
    getAllBooks()
  }, [dispatch, state.currentPage])

  if (!books || state.transmitting) {
    return <LoadingIndicator />
  }

  return (
    <Container>
      <Header>
        <Title>Sách</Title>
        <Button>
          <input
            accept='.docx'
            type='file'
            name='file'
            id='file'
            onChange={onHandleUpload}
          />
          <Label htmlFor='file'>
            <CloudUploadOutlined /> Tải sách lên
          </Label>
        </Button>
      </Header>

      <Table
        columns={columns(onModalVisible, onClickDownloadBook)}
        dataSource={books}
        rowKey={record => record.id}
        pagination={{
          total: total_pages * page_size,
          defaultPageSize: page_size,
          onChange: onChangePage
        }}
      />
      <Modal
        title='Xoá Sách'
        visible={state.deleteModalVisible}
        onOk={onModalConfirm}
        onCancel={onModalCancel}
      >
        <p>Bạn có chắc chắn muốn xoá sách này?</p>
      </Modal>
    </Container>
  )
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;
`

const Title = styled.h2``

const Label = styled.label`
  cursor: pointer;
`

const Button = styled(PrimaryButton)`
  // height: unset;
  // padding: 10px 30px;
  // flex: none;
  // width: 25%;
`
