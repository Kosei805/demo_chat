import React from "react";
import { backendChat, frontendChat, backendResponse } from "../../../@types";
import axios,{ AxiosResponse } from "axios";
import { ChatRoomType } from "../../../@types/chatRoomType";
// import { AvaterType } from "../../../@types/avaterType";

// const front2back = (chat: frontendChat): backendChat => {
//   return {
//     role: (chat.direction === "incoming" ? "assistant" : "user"),
//     content: chat.message
//   }
// }

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

const makeSystemPrompt = (
  mode:string,
  chatRoom: ChatRoomType
): string => {
  const smarterAvater = chatRoom.smarterRoomMember
  const stupiderAvater = chatRoom.stupiderRoomMember
  const equalAvater = chatRoom.chatRoomMember
  let basePrompt = ""
  let speakerAvater
  let conservationFeatures: string = ""
  let conservationExample: string = ""
  switch (mode) {
    case "smart":
      if (smarterAvater) {
        conservationFeatures = smarterAvater.avaterPrompt.conservationSetting.features.join('\n');
        conservationExample = smarterAvater.avaterPrompt.conservationSetting.example.join('\n');
        speakerAvater = smarterAvater
        basePrompt = `あなたはUserよりも賢い${smarterAvater.shortSetting}である${smarterAvater.name}のロールプレイをしながら、Userと会話してください。

### 状況
以下に書かれている他3人と会話している。
- User
- ${stupiderAvater?.shortSetting}である${stupiderAvater?.name}
- ${equalAvater.shortSetting}である${equalAvater.name}
`
      }
      break;
    case "stupid":
      if (stupiderAvater) {
        conservationFeatures = stupiderAvater.avaterPrompt.conservationSetting.features.join('\n');
        conservationExample = stupiderAvater.avaterPrompt.conservationSetting.example.join('\n');
        basePrompt = `あなたはUserよりも頭が悪い${stupiderAvater.shortSetting}である${stupiderAvater.name}のロールプレイをしながら、Userと会話してください。

### 状況
以下に書かれている他3人と会話している。
- User
- ${smarterAvater?.shortSetting}である${smarterAvater?.name}
- ${equalAvater.shortSetting}である${equalAvater.name}
`
      }
      break;
    default:
      conservationFeatures = equalAvater.avaterPrompt.conservationSetting.features.join('\n');
      conservationExample = equalAvater.avaterPrompt.conservationSetting.example.join('\n');
      basePrompt = `あなたはUserと同じくらいの頭の良さを持つ${equalAvater.shortSetting}である${equalAvater.name}のロールプレイをしながら、Userと会話してください。

### 状況
以下に書かれている他3人と会話している。
- User
- ${smarterAvater?.shortSetting}である${smarterAvater?.name}
- ${stupiderAvater?.shortSetting}である${stupiderAvater?.name}
`
  }

  return basePrompt +`
以下のような特徴を守って、会話をしてください。
#### 特徴
${conservationFeatures}

回答の例は以下のようになります。
#### 例
${conservationExample}`
}

const makeMultiPrompt = (
  modelName: string,
  chatData: Array<frontendChat>
): string => {
  let prompt = ""
  let target = 0
  switch(true){
    case !!modelName.toLowerCase().includes("gemma-2-9b-it"):
      if (chatData[target]["direction"] === "incoming") {
        prompt = "<start_of_turn>system\n" + chatData[0]["message"] + "<end_if_turn>\n"
        target += 1
      }
      for (let i = target; i < chatData.length; i++) {
        switch (chatData[i]["direction"]) {
          case "outgoing":
            prompt = prompt + "<start_of_turn>user\n" + chatData[i]["message"] + "<end_if_turn>\n"
            break
          case "incoming":
            prompt = prompt + "<start_of_turn>model\n" + chatData[i]["avaterName"] + "「" + chatData[i]["message"] + "」<end_if_turn>\n"
            break
        }
      }
      return prompt + "<start_of_turn>model\n"
  }
  return "Model is not exist."
}

const getMultiResponse = async (
  mode:string,
  chatHistory: Array<frontendChat>
) => {
  const llmUrl = process.env.REACT_APP_LOCAL_LLM_API
  // const llmUrl = "http://192.168.100.217:8080/completion"
  if (!llmUrl) return "errorが発生しましたマジで"
  return axios.post(llmUrl, {
    prompt: makeMultiPrompt("bartowski/Gemma-2-9B-It-SPPO-Iter3-GGUF",chatHistory),
    n_predict: 512
  })
  .then((response: AxiosResponse<backendResponse>) => {
    return response.data.content
  })
}

export const sendMultiMessage = (
  setTyping: React.Dispatch<React.SetStateAction<string | undefined>>,
  setChat: React.Dispatch<React.SetStateAction<frontendChat[]>>,
  allChats: Array<frontendChat>,
  nowChatRoom: ChatRoomType
) => {
const speakerIndex = Math.floor(Math.random() * 3)
const smartAvater = nowChatRoom.smarterRoomMember
const stupidAvater = nowChatRoom.stupiderRoomMember
const equalAvater = nowChatRoom.chatRoomMember
const modes = ["equal","smart","stupid"]
let speakerName = ""
switch(speakerIndex){
  case 1: // smart
    if(smartAvater) {
      speakerName = smartAvater.name
    }
    break
  case 2: // stupid
    if(stupidAvater) {
      speakerName = stupidAvater.name
    }
    break
  default: // equal
    speakerName = equalAvater.name
    break
}
setTyping(speakerName + " is typing...")
getMultiResponse(modes[speakerIndex],allChats)
  .then(
    (reply) => {
      setChat(allChats.concat(back2front({role: "assistant", content: reply})))
      setTyping(undefined)
    }
  )
}