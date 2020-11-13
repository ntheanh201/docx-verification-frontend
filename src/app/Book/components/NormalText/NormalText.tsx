import { React, styled } from 'core'

export const NormalText = ({ content }) => {
  return <Wrapper>{content}</Wrapper>
}

const Wrapper = styled.div`
  width: 50%;
`
