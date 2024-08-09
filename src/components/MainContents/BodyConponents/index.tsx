import React from 'react'
import { Layout } from 'antd'
import ChatComponents from './ChatComponents'
import { ChatRoomType } from '../../../@types/chatRoomType'
import LoadingComponents from './LoadingComponents'

const { Content } = Layout

type BodyComponentsProps = {
  backgroundColorData: string,
  radiusData: number,
  chatRoom: ChatRoomType
  makingChatRoom: boolean
}

const BodyComponents: React.FC<BodyComponentsProps> = ({
  backgroundColorData,
  radiusData,
  chatRoom,
  makingChatRoom
}) => {
  if (makingChatRoom){
    return (<LoadingComponents />)
  } else {
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
          <ChatComponents nowChatRoom={chatRoom}/>
        </div>
      </Content>
    )
  }
}

export default BodyComponents