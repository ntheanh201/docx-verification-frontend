import { useCallback, useRef, useState, React, styled } from 'core'
import { Button, Input, Space, Checkbox, Row } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
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

  const onChange = useCallback(e => {
    setValue(e.target.value)
  }, [])
  const handleSearch = useCallback(value => {
    userService.search(value).then(res => [setList(res)])
  }, [])
  const handleReset = useCallback(clearFilters => {
    clearFilters()
  }, [])

  const onChangeSelectGroup = useCallback(
    checkedValues => {
      console.log(checkedValues)
      setSelectedKeys(checkedValues)
      confirm()
    },
    [setSelectedKeys, confirm]
  )

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
      {/* {list.map(user => user.name)} */}
      <Wrapper>
        <Checkbox.Group
          style={{ width: '100%' }}
          onChange={onChangeSelectGroup}
          value={selectedKeys}
        >
          {list.map(({ name, id }, index) => (
            <Checkbox value={id} key={index}>
              {name}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </Wrapper>

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

const Wrapper = styled.div`
  margin-bottom: 8px;
`
