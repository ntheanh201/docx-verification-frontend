/* eslint-disable jsx-a11y/anchor-is-valid */
import { React } from 'core'

import { Space, Tag } from 'antd'
import { Link } from 'router'

export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: React.ReactNode) => <>{text}</>
  },
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: (tags: any[]) => (
  //     <>
  //       {tags.map((tag: string) => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green'
  //         if (tag === 'loser') {
  //           color = 'volcano'
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         )
  //       })}
  //     </>
  //   )
  // },
  {
    title: 'Action',
    key: 'action',
    render: (text: any, record: { id: string }) => (
      <Space size='middle'>
        <Tag color='geekblue'>
          <Link to={`/book/${record.id}`}>Check out</Link>
        </Tag>
        <Tag color='red'>
          <Link to={`/book/${record.id}`}>Delete</Link>
        </Tag>
        {/* {record.id} */}
      </Space>
    )
  }
]
