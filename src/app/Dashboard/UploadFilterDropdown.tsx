import React from 'react'
import { Button, Input, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useCallback, useRef, useState } from 'core'
import { userService } from 'service'

const UploaderFilterDropdown = ({
                                  setSelectedKeys,
                                  selectedKeys,
                                  confirm,
                                  clearFilters
                                }) => {
  const ref = useRef()
  const [value, setValue] = useState('')
  const [list, setList] = useState([])

  const onChange = useCallback((e) => {
    setValue(e.target.value)
  }, [])
  const handleSearch = useCallback((value) => {
    userService.search(value).then(res => [
      setList(res)
    ])
  }, [])
  const handleReset = useCallback(clearFilters => {
    clearFilters()
  }, [])
  return (
    <div style={{ padding: 8 }}>
      <Input
        ref={ref}
        placeholder={`Search uploader`}
        value={value}
        onChange={onChange}
        onPressEnter={() => handleSearch(value)}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      {
        list.map(user => user.name)
      }
      <Space>
        <Button
          type='primary'
          onClick={() => handleSearch(value)}
          icon={<SearchOutlined />}
          size='small'
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size='small'
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </Space>
    </div>
  )
}

export default UploaderFilterDropdown
