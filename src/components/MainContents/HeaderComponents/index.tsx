import React from 'react'
import { Button, Layout } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'

type HeaderContentsProps = {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  backgroundColorData: string
}

const { Header } = Layout

const HeaderComponents: React.FC<HeaderContentsProps> = ({ collapsed, setCollapsed, backgroundColorData }) => {
  return (
    <Header
      style={{ padding:0, background: backgroundColorData }}  
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
    </Header>
  )
}

export default HeaderComponents