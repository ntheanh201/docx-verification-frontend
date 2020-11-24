import { Table, Button as PrimaryButton } from 'antd'

import { Container } from 'layout'
import { LoadingIndicator } from 'ui'
import {
  React,
  styled,
  useEffect,
  FC,
  useState,
  useCallback,
  useMemo
} from 'core'
import { audioService } from 'service'
import { getAllBooksActionCreator, getBooksState, getVoices } from 'Store'
import { useDispatch, useSelector } from 'redux-core'
// import { useHistory } from 'router'

import { UploadModal } from '../../components/UploadModal'

import { columns } from './UploadListHelper'
import { BookFilter, BookSorter } from 'type'
import { UploaderSearchContext } from './uploaderSearchContext'

const defaultSorter: BookSorter = {
  field: 'created_at',
  order: 'DESC'
}

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
    pendingTasks: 0,
    sorter: defaultSorter,
    filters: undefined
  })

  const [uploader, setUploader] = useState('')

  const { currentPage, pendingTasks, sorter, filters } = state

  const getAllBooks = useCallback(async () => {
    await dispatch(getAllBooksActionCreator(currentPage - 1, filters, sorter))
  }, [dispatch, currentPage, sorter, filters])

  const renderColumns = useMemo(() => {
    return columns(voices || [])
  }, [voices])

  const onChange = useCallback(
    (pagination, filters, sorter) => {
      const fts: BookFilter = {}
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          fts[key] = filters[key]
        }
      })

      let sr: BookSorter
      if (sorter.field) {
        sr = {
          field: sorter.field,
          order: sorter.order === 'ascend' ? 'ASC' : 'DESC'
        }
      } else {
        sr = defaultSorter
      }
      setState({ currentPage: pagination.current, sorter: sr, filters: fts })
    },
    [setState]
  )

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
        <UploadModal />
      </Header>
      <div className='ant-table-wrapper space-bottom'>
        <Button type='dashed'>Pending tasks: {pendingTasks} </Button>
      </div>
      <UploaderSearchContext.Provider value={[uploader, setUploader]}>
        <Table
          //@ts-ignore
          columns={renderColumns}
          onChange={onChange}
          dataSource={books}
          rowKey={record => record.id}
          pagination={{
            total: total_pages * page_size,
            defaultPageSize: page_size
          }}
        />
      </UploaderSearchContext.Provider>
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
