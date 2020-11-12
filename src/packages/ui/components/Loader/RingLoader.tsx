import { React, styled, keyframes } from 'core'

export const RingLoader = ({ small, ...props }) => {
  return (
    <Wrapper {...props} small={small}>
      <Ring small={small} />
    </Wrapper>
  )
}

export const ButtonLoader = styled(RingLoader)`
  position: absolute;
  right: 30px;
  top: 10px;
`

interface AnyProps {
  [x: string]: any
}

const Wrapper = styled.div<AnyProps>`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
  ${props =>
    props.small &&
    `
    width: 30px;
    height: 30px;
  `};
`

const loadingRing = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Ring = styled.div<AnyProps>`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  ${props =>
    props.small &&
    `
    width: 30px;
    height: 30px;
    margin: 5px;
    border: 5px solid #fff;
  `} border-radius: 50%;
  animation: ${loadingRing} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff #fff #fff transparent;
  animation-delay: -0.15s;
`
