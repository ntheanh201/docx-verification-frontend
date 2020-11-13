import { React, styled, useEffect, FC, useState } from 'core'
import { useDispatch, useSelector } from 'redux-core'
import { useHistory } from 'router'

import { Modal, Table } from 'antd'
import { Container } from 'layout'
import { LoadingIndicator, PrimaryButton } from 'ui'

import './UploadList.css'

import { columns } from './UploadListHelper'
import {
  getAllBooksActionCreator,
  getBooksState,
  uploadBookActionCreator,
  deleteBookActionCreator
} from 'Store'

export const UploadList: FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { books } = useSelector(getBooksState)

  const [state, setState] = useState({
    currentPage: 0,
    deleteModalVisible: false,
    deleteId: null
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

  useEffect(() => {
    const getAllBooks = async () => {
      await dispatch(getAllBooksActionCreator(state.currentPage))
    }
    getAllBooks()
  }, [dispatch, state.currentPage])

  if (!books) {
    return <LoadingIndicator />
  }

  return (
    <Container>
      <Header>
        <input
          accept='.docx'
          type='file'
          name='file'
          id='file'
          onChange={onHandleUpload}
        />

        <Button>
          <Label htmlFor='file'>
            <i className='fa fa-cloud-upload icon-upload'></i> Upload
          </Label>
        </Button>
      </Header>

      <Table
        columns={columns(onModalVisible)}
        dataSource={books}
        rowKey={record => record.id}
        pagination={{
          current: books.current_page,
          total: books.length,
          defaultPageSize: books.page_size,
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
  justify-content: flex-end;
  padding: 2rem 0;
`

const Label = styled.label`
  cursor: pointer;
`

const Button = styled(PrimaryButton)`
  height: unset;
  padding: 10px 30px;
  flex: none;
  width: 25%;
`
