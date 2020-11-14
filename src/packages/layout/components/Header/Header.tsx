import { React, FC } from 'core'
import styled from 'styled-components'

import { useHistory, useLocation } from 'router'
import { Layout, Menu } from 'antd'

const { Header: HeaderAntd } = Layout

const _Header: FC<{ className?: string }> = ({ className }) => {
  const history = useHistory()
  const { pathname } = useLocation()

  return (
    <HeaderAntd className={className}>
      <div className='logo' />
      <Menu
        mode='horizontal'
        defaultSelectedKeys={['1']}
        selectedKeys={pathname.includes('book') ? ['2'] : ['1']}
      >
        <Menu.Item key='1' onClick={() => history.push('/')}>
          Trang chủ
        </Menu.Item>
        {pathname.includes('book') && <Menu.Item key='2'>Sách</Menu.Item>}
      </Menu>
    </HeaderAntd>
  )
}

export const Header = styled(_Header)`
  position: fixed;
  z-index: 1;
  width: 100%;
  .ant-menu-item {
    font-weight: 500;
  }
`
