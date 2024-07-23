import React from 'react'
import { Button, Layout, Menu } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'

type HeaderContentsProps = {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  backgroundColorData: string
  setModeFunc: React.Dispatch<React.SetStateAction<'single' | 'multi'>>
}

const { Header } = Layout

const HeaderComponents: React.FC<HeaderContentsProps> = ({ collapsed, setCollapsed, backgroundColorData, setModeFunc }) => {
  const headerStyle = {
    padding: 0,
    background: backgroundColorData,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  const menuStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
  }

  return (
    <Header
      style={headerStyle}
    >
      <Button
        type='text'
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> }
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <Menu
        style={menuStyle}
        mode='horizontal'
        defaultSelectedKeys={['single']}
        onClick={(e) => {setModeFunc(e.key as 'single' | 'multi')}}
      >
        <Menu.Item key='single'>Single User</Menu.Item>
        <Menu.Item key='multi'>Multi User</Menu.Item>
      </Menu>
    </Header>
  )
}

export default HeaderComponents