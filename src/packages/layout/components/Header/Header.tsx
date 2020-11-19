import { React, FC } from 'core'
import styled from 'styled-components'

import { useHistory, useLocation } from 'router'
import { Layout, Menu } from 'antd'
import { getCurrentUser, logout } from 'Store'
import { useSelector, useDispatch } from 'redux-core'

const { Header: HeaderAntd } = Layout

const _Header: FC<{ className?: string }> = ({ className }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { pathname } = useLocation()

  const { currentUser } = useSelector(getCurrentUser)

  const onLogoutClick = async () => {
    await dispatch(logout())
  }

  return (
    <HeaderAntd className={className}>
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
      {currentUser && (
        <Logout key='3' onClick={onLogoutClick}>
          Đăng xuất
        </Logout>
      )}
    </HeaderAntd>
  )
}

export const Header = styled(_Header)`
  position: fixed;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .ant-menu-item {
    font-weight: 500;
  }
`
const Logout = styled.div`
  cursor: pointer;
  &:hover {
    color: #4580c2;
  }
`
