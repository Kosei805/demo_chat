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
        avaterSrc='https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg'
      />
      {mapParts}
    </>
  )
}

export default MessageComponents