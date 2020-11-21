import React from 'react'
import { Link } from 'router'
import { useMemo } from 'core'
import { Tooltip } from 'antd'

const BookName = ({ id, name }: { id: number, name: React.ReactNode }) => {
  const nName = useMemo(() => name && name.toString().substring(0, 20), [name])
  return (
    <Tooltip title={name}>
      <Link to={`/book/${id}`}>{nName}</Link>
    </Tooltip>
  )
}

export default BookName
