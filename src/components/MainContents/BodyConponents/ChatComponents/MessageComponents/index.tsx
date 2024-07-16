import React from 'react'
import MessageComponent from './MessageComponent'
import { frontendChat } from '../../../../../@types'

type MessageComponentsProps = {
  allChats: Array<frontendChat>
}

const MessageComponents: React.FC<MessageComponentsProps> = ({allChats}) => {
  const mapParts = allChats.map((chat,index) =>
    <MessageComponent
      key={index}
      direction={chat.direction}
      message={chat.message}
      avaterName={chat.avaterName}
      avaterSrc={chat.avaterSrc}
    />
  )
  return (
    <>
      <MessageComponent
        direction='incoming'
        message='こんにちは'
        avaterName='Akira'
        avaterSrc='https://raw.githubusercontent.com/Kosei805/demo_chat/main/images/avaterLogo/akira_icon.svg'
      />
      {mapParts}
    </>
  )
}

export default MessageComponents