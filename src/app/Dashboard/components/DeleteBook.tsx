import React from 'react'
import { Button, Popconfirm } from 'antd'
import { useCallback } from 'core'
import { useDispatch } from 'redux-core'
import { deleteBookActionCreator } from '../../Store/Books'

const DeleteBook = ({ id }: { id: number }) => {
  const dispatch = useDispatch()
  const onConfirm = useCallback(async () => {
    await dispatch(deleteBookActionCreator(id))
  }, [dispatch, id])
  return (
    <>
      <Popconfirm placement="topLeft" title="Bạn có muốn xóa sách này ?" onConfirm={onConfirm} okText="Yes"
                  cancelText="No">
        <Button type='link' danger>
          {/*<DeleteOutlined />*/}
          Xoá
        </Button>
      </Popconfirm>
    </>
  )
}

export default DeleteBook
