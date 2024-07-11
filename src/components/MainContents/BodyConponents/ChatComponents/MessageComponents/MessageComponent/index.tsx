import React from 'react'
import {
  Message, Avatar
} from '@chatscope/chat-ui-kit-react'
import { frontendChat } from '../../../../../../@types'

const MessageComponent: React.FC<frontendChat> = ({
  direction,
  message,
  avaterName,
  avaterSrc
}) => {
  return (
    <Message
      model={{
        direction,
        message,
        position: 'single',
        sender: avaterName,
        sentTime: ''
      }}
    >
      { avaterSrc && <Avatar name={avaterName} src={avaterSrc}/>}
    </Message>
  )
}

export default MessageComponent