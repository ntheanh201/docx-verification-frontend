import { Table, Button as PrimaryButton } from 'antd'

import { Container } from 'layout'
import { LoadingIndicator } from 'ui'
import { React, styled, useEffect, FC, useState, useCallback } from 'core'
import { audioService } from 'service'
import { getAllBooksActionCreator, getBooksState, getVoices } from 'Store'
import { useDispatch, useSelector } from 'redux-core'
// import { useHistory } from 'router'

import { UploadModal } from '../../components/UploadModal'

import { columns, onChangeTable } from './UploadListHelper'

const _UploadList: FC<{ className?: string }> = ({ className }) => {
  const dispatch = useDispatch()
  // const history = useHistory()
  const { books, total_pages, page_size, loadingMergeAudio } = useSelector(
    getBooksState
  )

  const voices = useSelector(getVoices)

  const [state, setState] = useState({
    bookId: 1,
    currentPage: 1,
    // deleteModalVisible: false,
    // deleteId: null,
    transmitting: false,
    file: null,
    // genAllAudioVisible: false,
    voiceId: '11',
    pendingTasks: 0
  })

  const { currentPage, pendingTasks } = state

  const getAllBooks = useCallback(async () => {
    await dispatch(getAllBooksActionCreator(currentPage - 1))
  }, [dispatch, currentPage])

  // const onHandleUpload = async event => {
  //   const file = event?.target?.files[0]
  //   await setState({ transmitting: true })
  //   const book = await dispatch(uploadBookActionCreator(file))
  //   await setState({
  //     transmitting: false,
  //     //@ts-ignore
  //     bookId: book?.id,
  //     genAllAudioVisible: true
  //   })
  //   await getAllBooks()
  //
  //   // history.push(`/book/${book?.id}`)
  // }

  const onChangePage = page => {
    setState({ currentPage: page })
  }

  // const onModalVisible = id => {
  //   setState({ deleteModalVisible: true, deleteId: id })
  // }

  // const onModalCancel = () => {
  //   setState({ deleteModalVisible: false, genAllAudioVisible: false })
  // }
  //
  // const onModalConfirm = async () => {
  //   await dispatch(deleteBookActionCreator(state.deleteId))
  //   await setState({ deleteModalVisible: false })
  // }

  // const onClickDownloadBook = async (savedName: string) => {
  //   const data = await bookService.downloadBook(savedName)
  //   // console.log(data)
  //   await setState({ file: data })
  // }

  // const onConfirmGenAudio = async () => {
  //   pageService.genAllAudio(bookId, voiceId).then(res => {
  //     console.log(res)
  //   })
  //   await setState({ genAllAudioVisible: false })
  //   toast('Gen audio đang được xử lý')
  // }
  //
  // const onChangeVoice = async voiceId => {
  //   await setState({ voiceId })
  // }

  // const onClickGenBookAudio = async id => {
  //   await setState({
  //     bookId: id,
  //     genAllAudioVisible: true
  //   })
  // }

  useEffect(() => {
    getAllBooks()
  }, [getAllBooks])
  useEffect(() => {
    audioService.getPendingTasks().then(res => setState({ pendingTasks: res }))
  }, [])

  if (!books || state.transmitting || loadingMergeAudio || !voices) {
    return <LoadingIndicator />
  }

  return (
    <Container className={className}>
      <Header>
        <Title>Sách</Title>
        {/*<Button>*/}
        {/*  <input*/}
        {/*    accept='.docx'*/}
        {/*    type='file'*/}
        {/*    name='file'*/}
        {/*    id='file'*/}
        {/*    onChange={onHandleUpload}*/}
        {/*  />*/}
        {/*  <Label htmlFor='file'>*/}
        {/*    <CloudUploadOutlined /> Tải sách lên*/}
        {/*  </Label>*/}
        {/*</Button>*/}
        <UploadModal />
      </Header>
      <div className='ant-table-wrapper space-bottom'>
        <Button type='dashed'>Pending tasks: {pendingTasks} </Button>
      </div>
      <Table
        //@ts-ignore
        columns={columns(voices)}
        onChange={onChangeTable}
        dataSource={books}
        rowKey={record => record.id}
        pagination={{
          total: total_pages * page_size,
          defaultPageSize: page_size,
          onChange: onChangePage
        }}
      />
      {/*<Modal*/}
      {/*  title='Xoá Sách'*/}
      {/*  visible={state.deleteModalVisible}*/}
      {/*  onOk={onModalConfirm}*/}
      {/*  onCancel={onModalCancel}*/}
      {/*>*/}
      {/*  <p>Bạn có chắc chắn muốn xoá sách này?</p>*/}
      {/*</Modal>*/}
      {/*<Modal*/}
      {/*  title='Gen Audio'*/}
      {/*  visible={state.genAllAudioVisible}*/}
      {/*  onOk={onConfirmGenAudio}*/}
      {/*  onCancel={onModalCancel}*/}
      {/*>*/}
      {/*  <GenAllAudio onChangeVoice={onChangeVoice} id={record.id} />*/}
      {/*</Modal>*/}
    </Container>
  )
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 0 1rem 0;
`

const Title = styled.h2`
  margin-left: 1rem;
`

const Button = styled(PrimaryButton)`
  // height: unset;
  // padding: 10px 30px;
  // flex: none;
  // width: 25%;
  input {
    display: none;
    width: 0;
    height: 0;
  }
  margin-right: 10px;
`

export const UploadList = styled(_UploadList)`
  margin-top: 20px;

  .ant-table-wrapper {
    margin: 0 10px;
  }
`
