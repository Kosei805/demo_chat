import React from 'react'
import { Layout } from 'antd'
import ChatComponents from './ChatComponents'

const { Content } = Layout

type BodyComponentsProps = {
  backgroundColorData: string,
  radiusData: number
}

const BodyComponents: React.FC<BodyComponentsProps> = ({
  backgroundColorData,
  radiusData
}) => {
  return (
    <Content style={{ margin: '24px 16px 0' }}>
      <div
        style={{
          padding: 24,
          minHeight: '80vh',
          background: backgroundColorData,
          borderRadius: radiusData
        }}
      >
        <ChatComponents />
      </div>
    </Content>
  )
}

export default BodyComponents