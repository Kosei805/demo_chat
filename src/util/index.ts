import React from "react";
import { backendChat, frontendChat, backendResponse } from "../@types";
import axios,{ AxiosResponse } from "axios";

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
      ? "https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
      : undefined
    )
  }
}

const makePrompt = (modelName: string, chatData: Array<backendChat>): string => {
  let prompt = ""
  let target = 0
  switch(true){
    case !!modelName.toLowerCase().includes("gemma-2-9b-it"):
      if (chatData[target]["role"] === "system") {
        prompt = "<start_of_turn>system\n" + chatData[0]["content"] + "<end_if_turn>\n"
        target += 1
      }
      for (let i = target; i < chatData.length; i++) {
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

const getResponse = async (chatHistory: Array<backendChat>) => {
  // const llmUrl = process.env.REACT_APP_LLM_API
  const llmUrl = "http://192.168.100.217:8080/completion"
  if (!llmUrl) return "errorが発生しました"
  console.log(chatHistory)
  console.log(makePrompt("bartowski/Gemma-2-9B-It-SPPO-Iter3-GGUF",chatHistory))
  return axios.post(llmUrl, {
    prompt: makePrompt("bartowski/Gemma-2-9B-It-SPPO-Iter3-GGUF",chatHistory),
    n_predict: 512
  })
  .then((response: AxiosResponse<backendResponse>) => {
    return response.data.content
  })
}

export const sendMessage = (
    setTyping: React.Dispatch<React.SetStateAction<boolean>>,
    setChat: React.Dispatch<React.SetStateAction<frontendChat[]>>,
    allChats: Array<frontendChat>
  ) => {
  const chatData = allChats.map((chat) => front2back(chat))
  setTyping(true)
  getResponse(chatData)
    .then(
      (reply) => {
        setChat(allChats.concat(back2front({role: "assistant", content: reply})))
        setTyping(false)
      }
    )
}