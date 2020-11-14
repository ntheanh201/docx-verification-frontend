/* eslint-disable jsx-a11y/anchor-is-valid */
import { React } from 'core'

import { Button } from 'antd'
import { Link } from 'router'

export const columns = onModalVisible => [
  {
    title: 'Tên sách',
    dataIndex: 'name',
    key: 'name',
    render: (text: React.ReactNode) => <>{text}</>
  },
  {
    title: 'Chức năng',
    key: 'action',
    render: (text: any, record: { id: string }) => (
      <>
        {' '}
        <Button type='link'>
          <Link to={`/book/${record.id}`}>Kiểm tra</Link>
        </Button>
        <Button type='link' danger>
          <span onClick={() => onModalVisible(record.id)}>Xoá</span>
        </Button>
      </>
    )
  }
]
