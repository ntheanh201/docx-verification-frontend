import { React, styled, useState, useEffect } from 'core'

import { Input, Button as ButtonAntd } from 'antd'
import { useCallback, useContext } from 'react'
import { NormValueContext } from './norm-value.context'

const { TextArea: TextInput } = Input

export const TextArea = () => {
  const [value, setValue] = useContext(NormValueContext)
  // const [state, setState] = useState({
  //   text: content
  // })
  //
  // useEffect(() => {
  //   setState({ text: content })
  // }, [content])
  //
  // const onChangeText = event => {
  //   setState({ text: event.target.value })
  // }
  const onChangeText = useCallback(event => setValue(event.target.value), [
    setValue
  ])

  return (
    <Wrapper>
      <Title>Văn bản chuẩn hoá</Title>
      <TextBox rows={10} value={value} onChange={onChangeText} />
      {/*<Button type='primary' onClick={() => onSubmitNormText(state.text)}>*/}
      {/*  Xác nhận sửa đổi*/}
      {/*</Button>*/}
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

export const TextBox = styled(TextInput)`
  height: 65vh !important;
`

const Button = styled(ButtonAntd)`
  margin-top: 15px;
  text-align: right;
`
