import React from 'react'
import MessageComponent from './MessageComponent'
import { frontendChat } from '../../../../../@types'
import { ChatRoomType } from '../../../../../@types/chatRoomType'

type MessageComponentsProps = {
  allChats: Array<frontendChat>
  nowChatRoom: ChatRoomType
}

const MessageComponents: React.FC<MessageComponentsProps> = ({allChats, nowChatRoom}) => {
  const mapParts = allChats.map((chat,index) =>
    <MessageComponent
      key={index}
      direction={chat.direction}
      message={chat.message}
      avaterName={chat.avaterName}
      avaterSrc={chat.avaterSrc}
    />
  )
  console.log("ここに注目",nowChatRoom)
  return (
    <>
    {nowChatRoom.chatRoomMember &&
      <MessageComponent
        direction='incoming'
        message='こんにちは'
        avaterName={nowChatRoom.chatRoomMember.name}
        avaterSrc={nowChatRoom.chatRoomMember.src}
      />
    }
      {mapParts}
    </>
  )
}

export default MessageComponents