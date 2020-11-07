import { React, styled, FC } from 'core'

import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'

export const NormalLayout: FC<{
  children: React.ReactChild
}> = ({ children }) => {
  return (
    <ContentContainer>
      <Header />
      <NormalLayoutWrapper>
        {/* <div className='row'>{children}</div> */}
        {children}
      </NormalLayoutWrapper>
      <Footer />
    </ContentContainer>
  )
}

export const withNormalLayout = (WrappedComponent: any, layoutProps?: any) => {
  return (props: any) => (
    <NormalLayout {...layoutProps}>
      <WrappedComponent {...props} />
    </NormalLayout>
  )
}

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  width: 100%;
  height: 100%;
`

const NormalLayoutWrapper = styled.div``
