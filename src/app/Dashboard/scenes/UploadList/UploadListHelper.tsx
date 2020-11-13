/* eslint-disable jsx-a11y/anchor-is-valid */
import { React } from 'core'

import { Space, Tag } from 'antd'

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
          <a href={`/book/${record.id}`}>Check out</a>
        </Tag>
        <Tag color='red'>
          <a href={`/book/${record.id}`}>Delete</a>
        </Tag>
        {/* {record.id} */}
      </Space>
    )
  }
]
