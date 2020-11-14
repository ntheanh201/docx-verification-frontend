import { React, styled } from 'core'
import { TextBox } from '../TextArea/TextArea'

export const NormalText = ({ content }) => {
  return (
    <Wrapper>
      <Title>Văn bản gốc</Title>
      <TextBox value={content} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 50%;
  margin-right: 10px;
`

const Title = styled.h2`
  text-align: center;
`
