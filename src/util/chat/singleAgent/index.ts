import React from "react";
import { backendChat, frontendChat, backendResponse } from "../../../@types";
import axios,{ AxiosResponse } from "axios";
import { ChatRoomType } from "../../../@types/chatRoomType";
import { AvaterType } from "../../../@types/avaterType";

const front2back = (chat: frontendChat): backendChat => {
  return {
    role: (chat.direction === "incoming" ? "assistant" : "user"),
    content: chat.message
  }
}

export const back2front = (chat: backendChat): frontendChat => {
  return {
    direction: (chat.role === "assistant" ? "incoming" : "outgoing"),
    message: chat.content,
    avaterName: (chat.role === "assistant" ? "Akira" : ""),
    avaterSrc: (chat.role === "assistant"
      ? "https://raw.githubusercontent.com/Kosei805/demo_chat/main/images/avaterLogo/akira_icon.svg"
      : undefined
    )
  }
}

const makeSystemPrompt = (avater: AvaterType): string => {
  const conservationFeatures = avater.avaterPrompt.conservationSetting.features.join('\n')
  const conservationExample = avater.avaterPrompt.conservationSetting.example.join('\n')

  return `年齢が${avater.avaterPrompt.age}の${avater.shortSetting}である${avater.name}のロールプレイをしながら、Userと会話してください。
以下のような特徴を守って、会話をしてください。
#### 特徴
${conservationFeatures}

回答の例は以下のようになります。
#### 例
${conservationExample}`
}

const makePrompt = (
  nowChatRoom: ChatRoomType,
  modelName: string,
  chatData: Array<backendChat>
): string => {
  let prompt = ""
  switch(true){
    case !!modelName.toLowerCase().includes("gemma-2-9b-it"):
      prompt = "<start_of_turn>system\n" + makeSystemPrompt(nowChatRoom.chatRoomMember) + "<end_if_turn>\n"
      for (let i = 0; i < chatData.length; i++) {
        switch (chatData[i]["role"]) {
          case "user":
            prompt = prompt + "<start_of_turn>user\n" + chatData[i]["content"] + "<end_if_turn>\n"
            break
          case "assistant":
            prompt = prompt + "<start_of_turn>model\n" + chatData[i]["content"] + "<end_if_turn>\n"
            break
        }
      }
      return prompt + "<start_of_turn>model\n"
  }
  return "Model is not exist."
}

const getResponse = async (
  chatRoom: ChatRoomType,
  chatHistory: Array<backendChat>
) => {
  const llmUrl = process.env.REACT_APP_LOCAL_LLM_API
  // const llmUrl = "http://192.168.100.217:8080/completion"
  console.log(llmUrl)
  if (!llmUrl) return "errorが発生しました本当に"
  console.log(chatHistory)
  console.log(makePrompt(
    chatRoom,
    "bartowski/Gemma-2-9B-It-SPPO-Iter3-GGUF",
    chatHistory
  ))
  return axios.post(llmUrl, {
    prompt: makePrompt(
      chatRoom,
      "bartowski/Gemma-2-9B-It-SPPO-Iter3-GGUF",
      chatHistory
    ),
    n_predict: 512
  })
  .then((response: AxiosResponse<backendResponse>) => {
    return response.data.content
  })
}

export const sendSingleMessage = (
    setTyping: React.Dispatch<React.SetStateAction<string | undefined>>,
    setChat: React.Dispatch<React.SetStateAction<frontendChat[]>>,
    allChats: Array<frontendChat>,
    nowChatRoom: ChatRoomType
  ) => {
  const chatData = allChats.map((chat) => front2back(chat))
  setTyping(nowChatRoom.chatRoomMember.name+" is typing...")
  getResponse(nowChatRoom,chatData)
    .then(
      (reply) => {
        setChat(allChats.concat(back2front({role: "assistant", content: reply})))
        setTyping(undefined)
      }
    )
}