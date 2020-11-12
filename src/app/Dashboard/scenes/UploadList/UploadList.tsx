import { React, styled } from 'core'
import { useDispatch, useSelector } from 'redux-core'
import { useHistory } from 'router'

import { Table } from 'antd'
import { Container } from 'layout'
import { PrimaryButton } from 'ui'

import './UploadList.css'

import { columns } from './UploadListHelper'

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

export const UploadList = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const onHandleUpload = event => {
    const files = event?.target?.files[0]
    console.log(files)
    // dispatch()
    history.push('/verify')
  }

  return (
    <Container>
      <Button>
        <input type='file' name='file' id='file' onChange={onHandleUpload} />
        <Label htmlFor='file'>
          <i className='fa fa-cloud-upload icon-upload'></i> Upload
        </Label>
      </Button>
      <Table columns={columns} dataSource={data} />
    </Container>
  )
}

const Label = styled.label``

const Button = styled(PrimaryButton)`
  height: unset;
  padding: 10px 30px;
`
