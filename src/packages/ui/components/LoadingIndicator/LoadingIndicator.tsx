import { React, styled } from 'core'
// import { Icon } from 'ui'

import Loading from '../../assets/loading.svg'

export class LoadingIndicator extends React.PureComponent<{
  message?: string
}> {
  render() {
    return (
      <LoadingIndicatorWrapper>
        <LoadingIcon
          src={Loading}
          width='200px'
          height='200px'
          alt='Loading...'
        />
        {this.props.message ? (
          <LoadingMessage>{this.props.message}</LoadingMessage>
        ) : null}
      </LoadingIndicatorWrapper>
    )
  }
}

const LoadingIndicatorWrapper = styled.div`
  display: inherit;
  flex-direction: inherit;
  flex: inherit;
  align-items: center;
  justify-content: center;
  height: inherit;
  width: inherit;
`

const LoadingMessage = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  color: #000;
`

const LoadingIcon = styled.img`
  align-items: center;
  justify-content: center;
  display: flex;
  margin: auto;
`
