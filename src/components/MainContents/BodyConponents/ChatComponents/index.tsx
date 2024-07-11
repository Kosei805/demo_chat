import React, { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
  MainContainer,ChatContainer, MessageList, MessageInput, TypingIndicator
} from '@chatscope/chat-ui-kit-react'
import MessageComponents from './MessageComponents'
import { frontendChat } from '../../../../@types'
import { sendMessage } from '../../../../util'

const ChatComponents = () => {
  const [chatAll, setChatALl] = useState<frontendChat[]>([])
  const [nowTyping, setNowTyping] = useState(false)

  const updateChat = (message: string) => {
    const nextChat = chatAll.concat({
      direction: "outgoing",
      message,
      avaterName: ""
    })
    setChatALl(nextChat)
    sendMessage(setNowTyping,setChatALl,nextChat)
  }

  return (
<div style={{ position: "relative", height: '75vh' }}>
  <MainContainer>
    <ChatContainer>
      <MessageList
        typingIndicator={nowTyping ? <TypingIndicator content="Emily is typing" />: undefined}
      >
        <MessageComponents allChats={chatAll}/>
      </MessageList>
      <MessageInput
        placeholder="Type message here"
        onSend={(value) => {updateChat(value)}}
      />
    </ChatContainer>
  </MainContainer>
</div>
  )
}

export default ChatComponents