import { React, styled, FC } from 'core'

import { Layout } from 'antd'

import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'

const { Content } = Layout

export const NormalLayout: FC<{
  children: React.ReactChild
}> = ({ children }) => {
  return (
    <ContentContainer>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <NormalLayoutWrapper>
            {/* <div className='row'>{children}</div> */}

            {children}
          </NormalLayoutWrapper>
        </Content>
        <Footer />
      </Layout>
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

const NormalLayoutWrapper = styled.div`
  background: #ffffff;
`
