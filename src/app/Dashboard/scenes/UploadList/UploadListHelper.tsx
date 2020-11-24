/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, styled } from 'core'

import { Link } from 'router'
import config from 'environment'
import { Button as ButtonAntd, Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import { BookProgress } from '../../components/BookProgress/BookProgress'
import { BookGenAudioProgress } from '../../components/BookGenAudioProgress/BookGenAudioProgress'
// import { AudioDownload } from '../../components/AudioDownload/AudioDownload'
import VoiceColumn from '../../components/VoiceColumn'
import CloneBookModal from '../../components/CloneBookModal'
import GenAllAudioModal from '../../components/GenAllAudioModal'
import DeleteBook from '../../components/DeleteBook'
import BookName from '../../components/BookName'
import MergeAll from '../../components/MergeAll'
import UploaderFilterDropdown from '../../components/UploadFilterDropdown'

const restructuredFilterVoices = voices =>
  voices.map(({ id, name }) => ({
    value: id,
    text: name
  }))

export const columns = voices => [
  {
    title: 'Tên sách',
    dataIndex: 'name',
    key: 'name',
    render: (text: React.ReactNode, record: { id: number }) => (
      <BookName id={record.id} name={text} />
    )
  },
  {
    title: 'Tiến trình audio',
    key: 'audioProgress',
    width: '15%',
    render: (_: React.ReactNode, record: { id: number }) => (
      <BookGenAudioProgress id={record.id} />
    )
  },
  {
    title: 'Tiến trình xác minh',
    key: 'progress',
    width: '15%',
    dataIndex: 'progress',
    sorter: true,
    render: (_: React.ReactNode, record: { id: string }) => (
      <BookProgress id={record.id} />
    )
  },
  {
    title: 'Người upload',
    key: 'uploader',
    filters: [],
    dataIndex: 'uploader.name',
    // onFilter: (value, record) => record.uploader.name.indexOf(value) === 0,
    render: (text: React.ReactNode, record: { uploader: any }) => {
      return record.uploader?.name
    },
    filterDropdown: UploaderFilterDropdown
  },
  {
    title: 'Giọng mặc định',
    key: 'default_voice',
    dataIndex: 'default_voice',
    filters: restructuredFilterVoices(voices),
    // onFilter: (value, record) => record.name.indexOf(value) === 0,
    render: (text: string) => <VoiceColumn voice_id={text} />
  },
  {
    title: 'Upload lúc',
    key: 'created_at',
    dataIndex: 'created_at',
    sortDirections: ['ascend', 'descend'],
    sorter: true,
    render: (text: string) => {
      const d = text && new Date(text)
      return <>{d && d.toLocaleString()}</>
    }
  },

  {
    title: 'Chức năng',
    width: '15%',
    align: 'center',
    key: 'action',
    render: (
      _: React.ReactNode,
      record: {
        id: string
        saved_name: string
        name: string
        audio_url: string
        acceptAudioDownload: boolean
        default_voice: string
      }
    ) => {
      return (
        <Dropdown overlay={<DropdownMenu {...record} />}>
          <a className='ant-dropdown-link' onClick={e => e.preventDefault()}>
            Thao tác <DownOutlined />
          </a>
        </Dropdown>
      )
    }
  }
]

const Button = styled(ButtonAntd)``

const Text = styled.span`
  //margin-left: 8px;
`

const DropdownMenu = ({
  id,
  // acceptAudioDownload,
  audio_url,
  saved_name,
  name,
  default_voice
}) => {
  return (
    <Menu>
      <Menu.Item>
        <Button type='link'>
          <Link to={`/book/${id}`}>Verify</Link>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <GenAllAudioModal id={id} default_voice={default_voice} />
      </Menu.Item>
      <Menu.Item>
        <CloneBookModal id={id} />
      </Menu.Item>
      <Menu.Item>
        <MergeAll id={id} audio_url={audio_url} />
      </Menu.Item>
      {/*{acceptAudioDownload && (*/}
      {/*  <Menu.Item>*/}
      {/*    <AudioDownload*/}
      {/*      id={id}*/}
      {/*      audio_url={audio_url}*/}
      {/*      acceptAudioDownload={acceptAudioDownload}*/}
      {/*    />*/}
      {/*  </Menu.Item>*/}
      {/*)}*/}
      <Menu.Item>
        <Button
          type='link'
          // onClick={() => onClickDownloadBook(saved_name)}
        >
          <a
            href={config.serverUrl + 'books/download/' + saved_name}
            // eslint-disable-next-line react/jsx-no-target-blank
            target='_blank'
            download={name}
          >
            {/*<DownloadOutlined />*/}
            <Text>Download </Text>
          </a>
        </Button>
      </Menu.Item>
      <Menu.Item danger>
        {/*<Button type='link' danger onClick={() => onModalVisible(id)}>*/}
        {/*  /!*<DeleteOutlined />*!/*/}
        {/*  Xoá*/}
        {/*</Button>*/}
        <DeleteBook id={id} />
      </Menu.Item>
    </Menu>
  )
}
