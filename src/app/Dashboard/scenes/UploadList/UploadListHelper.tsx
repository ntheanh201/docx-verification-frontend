/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button as ButtonAntd } from 'antd'
import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons'

import { Link } from 'router'
import { React, styled } from 'core'
import config from 'environment'
import { BookProgress } from '../../components/BookProgress/BookProgress'

export const columns = (onModalVisible, onClickDownloadBook) => [
  {
    title: 'Tên sách',
    dataIndex: 'name',
    key: 'name',
    render: (text: React.ReactNode) => <>{text}</>
  },
  {
    title: 'Tiến trình',
    key: 'progress',
    render: (_: React.ReactNode, record: { id: string }) => (
      <BookProgress id={record.id} />
    )
  },
  {
    title: 'Chức năng',
    width: '30%',
    key: 'action',
    render: (
      text: any,
      record: { id: string; saved_name: string; name: string }
    ) => (
      <>
        {' '}
        <Button type='link'>
          <Link to={`/book/${record.id}`}>Kiểm tra</Link>
        </Button>
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
            <Text>Download</Text>
          </a>
        </Button>
        <Button type='link' danger onClick={() => onModalVisible(record.id)}>
          <DeleteOutlined />
          Xoá
        </Button>
      </>
    )
  }
]

const Button = styled(ButtonAntd)``

const Text = styled.span`
  margin-left: 8px;
`
