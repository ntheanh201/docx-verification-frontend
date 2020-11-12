import { styled } from 'core'

export const ButtonWrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
`

interface ButtonProps {
  [x: string]: any
}

export const Button = styled.button<ButtonProps>`
  position: relative;
  flex: 0 1 100%;
  border: 0;
  height: 60px;
  font-size: 16px;
  text-transform: uppercase;
  padding: 14px;
  cursor: pointer;
  outline: none;
  background: #f8f8f8;
  color: #999;
  border-radius: calc(0.3rem - 1px);

  ${props =>
    props.template === 'warning' &&
    `
    background: #ffa502;
    color: #fff;
  `} ${props =>
    props.template === 'primary' &&
    `
    background: #4580c2;
    color: #fff;
  `}
  &:hover:not(:disabled) {
    ${props =>
      props.template === 'warning' &&
      `
      color: #ffa502;
      background: #F8F8F8;
    `};
    ${props =>
      props.template === 'primary' &&
      `
      color: #12B1CF;
      background: #F8F8F8;
    `};
  }

  letter-spacing: 0.05em;
  &:first-child:last-child {
    text-align: center;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  transition: all 0.1412s ease-in-out;
`

export const SecondaryButton = styled(Button)`
  background: #ddd;
  color: #666;
  &:hover {
    color: #ddd;
    background: #999;
  }
`

export const SuccessButton = styled(Button)`
  background: #2ecc71;
  color: #fff;
  &:hover {
    background: #3edc81;
  }
`

export const DangerButton = styled(Button)`
  background: #ec644b;
  color: #fff;

  &:hover {
    color: #ec644b;
    background: #fff;
  }
`

export const PrimaryButton = styled(Button)`
  background: #4580c2;
  color: #fff;

  &:hover:not(:disabled) {
    color: #4580c2;
    background: #f8f8f8;
  }
`
