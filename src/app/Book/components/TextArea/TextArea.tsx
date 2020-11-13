import { React, styled, useState, useEffect } from 'core'

import { Input, Button as ButtonAntd } from 'antd'

const { TextArea: TextInput } = Input

export const TextArea = ({ content, onSubmitNormText }) => {
  const [state, setState] = useState({
    text: content
  })

  useEffect(() => {
    setState({ text: content })
  }, [content])

  const onChangeText = event => {
    setState({ text: event.target.value })
  }

  return (
    <Wrapper>
      <Title>Văn bản chuẩn hoá</Title>
      <TextBox rows={10} value={state.text} onChange={onChangeText} />
      <Button type='primary' onClick={() => onSubmitNormText(state.text)}>
        Xác nhận sửa đổi
      </Button>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 50%;
  margin-left: 10px;
`

const Title = styled.h2`
  text-align: center;
`

const TextBox = styled(TextInput)`
  min-height: 70vh !important;
`

const Button = styled(ButtonAntd)`
  margin-top: 15px;
  text-align: right;
`
