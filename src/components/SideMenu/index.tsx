import React from 'react'
import { Layout } from 'antd'

const { Sider } = Layout

type SideMenuProps = {
  collapsed: boolean
}

const SideMenu: React.FC<SideMenuProps> = ({collapsed}) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      SideMenu
    </Sider>
  )
}

export default SideMenu