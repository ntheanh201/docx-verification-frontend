import { React, FC } from 'core'

import { useHistory, useLocation } from 'router'
import { Layout, Menu } from 'antd'

const { Header: HeaderAntd } = Layout

export const Header: FC = () => {
  const history = useHistory()
  const { pathname } = useLocation()

  return (
    <HeaderAntd style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className='logo' />
      <Menu
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={['1']}
        selectedKeys={pathname.includes('book') ? ['2'] : ['1']}
      >
        <Menu.Item key='1' onClick={() => history.push('/')}>
          Trang chủ
        </Menu.Item>
        <Menu.Item key='2'>Sách</Menu.Item>
      </Menu>
    </HeaderAntd>
  )
}
