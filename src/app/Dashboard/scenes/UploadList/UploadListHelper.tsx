/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, styled } from 'core'

import { Link } from 'router'
import config from 'environment'
import { Button as ButtonAntd, Menu, Dropdown } from 'antd'
import {
  DownloadOutlined,
  DeleteOutlined,
  DownOutlined
} from '@ant-design/icons'

import { BookProgress } from '../../components/BookProgress/BookProgress'
import { BookGenAudioProgress } from '../../components/BookGenAudioProgress/BookGenAudioProgress'
import { AudioDownload } from '../../components/AudioDownload/AudioDownload'

export const columns = (
  onModalVisible,
  onClickDownloadBook,
  onClickGenBookAudio
) => [
  {
    title: 'Tên sách',
    dataIndex: 'name',
    key: 'name',
    render: (text: React.ReactNode) => <>{text}</>
  },
  {
    title: 'Tiến trình audio',
    key: 'audioProgress',
    width: '25%',
    render: (_: React.ReactNode, record: { id: string }) => (
      <BookGenAudioProgress id={record.id} />
    )
  },
  {
    title: 'Tiến trình xác minh',
    key: 'progress',
    width: '25%',
    render: (_: React.ReactNode, record: { id: string }) => (
      <BookProgress id={record.id} />
    )
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
      }
    ) => {
      const menu = (
        <Menu>
          <Menu.Item>
            <Button type='link'>
              <Link to={`/book/${record.id}`}>Kiểm tra</Link>
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button type='link' onClick={() => onClickGenBookAudio(record.id)}>
              Gen All Audio
            </Button>
          </Menu.Item>
          <AudioDownload id={record.id} audio_url={record.audio_url} />
          <Menu.Item>
            <Button
              type='link'
              onClick={() => onClickDownloadBook(record.saved_name)}
            >
              <a
                href={config.serverUrl + 'books/download/' + record.saved_name}
                // eslint-disable-next-line react/jsx-no-target-blank
                target='_blank'
                download={record.name}
              >
                <DownloadOutlined />
                <Text>Download Book</Text>
              </a>
            </Button>
          </Menu.Item>
          <Menu.Item danger>
            <Button
              type='link'
              danger
              onClick={() => onModalVisible(record.id)}
            >
              <DeleteOutlined />
              Xoá
            </Button>
          </Menu.Item>
        </Menu>
      )
      return (
        <Dropdown overlay={menu}>
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
  margin-left: 8px;
`
