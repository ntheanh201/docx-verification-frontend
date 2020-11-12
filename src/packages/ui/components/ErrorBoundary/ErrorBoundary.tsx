import { React, styled, keyframes } from 'core'

interface IProps {}

interface IState {
  errorInfo: any
  error: string
}

export class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error, info) {
    this.setState({
      error,
      errorInfo: info
    })
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <Container>
          <Graphic>
            <Cog xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
              <path d='M29.18 19.07c-1.678-2.908-.668-6.634 2.256-8.328L28.29 5.295c-.897.527-1.942.83-3.057.83-3.36 0-6.085-2.743-6.085-6.126h-6.29c.01 1.043-.25 2.102-.81 3.07-1.68 2.907-5.41 3.896-8.34 2.21L.566 10.727c.905.515 1.69 1.268 2.246 2.234 1.677 2.904.673 6.624-2.24 8.32l3.145 5.447c.895-.522 1.935-.82 3.044-.82 3.35 0 6.066 2.725 6.083 6.092h6.29c-.004-1.035.258-2.08.81-3.04 1.676-2.902 5.4-3.893 8.325-2.218l3.145-5.447c-.9-.515-1.678-1.266-2.232-2.226zM16 22.48c-3.578 0-6.48-2.902-6.48-6.48S12.423 9.52 16 9.52c3.578 0 6.48 2.902 6.48 6.48s-2.902 6.48-6.48 6.48z' />
            </Cog>
          </Graphic>
          <Title>Something went wrong</Title>
          {process.env.NODE_ENV === 'development' && (
            <Details>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </Details>
          )}
        </Container>
      )
    }
    return this.props.children || null
  }
}

const Container = styled.div`
  position: relative;
  background: #d4dfe6;
  min-height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #274c5e;
  text-align: center;
  position: relative;
  flex-direction: column;
  padding: 100px;
`

const Graphic = styled.div`
  position: relative;
`

const Title = styled.h1`
  display: block;
  font-size: 2rem;
  font-weight: lighter;
  text-align: center;
`

const CogAnimation = keyframes`
    0%   {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
`

const Cog = styled.svg`
  width: 10rem;
  height: 10rem;
  fill: #6aafe6;
  transition: easeInOutQuint();
  animation: ${CogAnimation} 5s;
`

const Details = styled.details`
  max-width: 50%;
  font-size: 1.2rem;
  font-weight: lighter;
  text-align: initial;
  overflow: auto;
  white-space: pre-wrap;
`
