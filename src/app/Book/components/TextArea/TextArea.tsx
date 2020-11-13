import { React, styled } from 'core'

import { Input } from 'antd'

const { TextArea: TextInput } = Input

export const TextArea = ({ content }) => {
  return (
    <Wrapper>
      <TextInput rows={10} value={content} />
    </Wrapper>
  )
}
const Wrapper = styled.div``
