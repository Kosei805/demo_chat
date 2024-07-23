import { Layout, theme } from 'antd'
import React, {useState} from 'react'
import HeaderComponents from './HeaderComponents'
import BodyComponents from './BodyConponents'
import FooterComponents from './FooterComponents'

type MainContentsProps = {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}



const MainContents: React.FC<MainContentsProps> = ({collapsed, setCollapsed}) => {
  const [mode, setMode] = useState<'single' | 'multi'>('single')
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  return (
    <Layout>
      <div
        style={{height: '100%'}}  
      >
        <HeaderComponents
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          backgroundColorData={colorBgContainer}
          setModeFunc={setMode}
        />
        <BodyComponents
          backgroundColorData={colorBgContainer}
          radiusData={borderRadiusLG}
        />
        <FooterComponents />
      </div>
    </Layout>
  )
}

export default MainContents