/* eslint-disable jsx-a11y/anchor-is-valid */
import { React } from 'core'

import { Space, Tag } from 'antd'
import { Link } from 'router'

export const columns = onModalVisible => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: React.ReactNode) => <>{text}</>
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: any, record: { id: string }) => (
      <Space size='middle'>
        <Tag color='geekblue'>
          <Link to={`/book/${record.id}`}>Check out</Link>
        </Tag>
        <Tag color='red'>
          {/* <Link to={`/delete/${record.id}`}>Delete</Link> */}
          <a onClick={() => onModalVisible(record.id)}>Delete</a>
        </Tag>
        {/* {record.id} */}
      </Space>
    )
  }
]
