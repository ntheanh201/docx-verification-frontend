/* eslint-disable jsx-a11y/anchor-is-valid */
import { React } from 'core'

import { Space, Tag } from 'antd'
import { Link } from 'router'

export const columns = onModalVisible => [
  {
    title: 'Tên Sách',
    dataIndex: 'name',
    key: 'name',
    render: (text: React.ReactNode) => <>{text}</>
  },
  {
    title: 'Hành động',
    key: 'action',
    render: (text: any, record: { id: string }) => (
      <Space size='middle'>
        <Tag color='geekblue'>
          <Link to={`/book/${record.id}`}>Kiểm tra</Link>
        </Tag>
        <Tag color='red'>
          {/* <Link to={`/delete/${record.id}`}>Delete</Link> */}
          <a onClick={() => onModalVisible(record.id)}>Xoá</a>
        </Tag>
        {/* {record.id} */}
      </Space>
    )
  }
]
