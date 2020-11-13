import { React, styled } from 'core'

export const NormalText = ({ content }) => {
  return (
    <Wrapper>
      <Title>Văn bản gốc</Title>
      <Content>{content}</Content>
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

const Content = styled.div`
  max-height: 70vh;
  overflow: scroll;
`
