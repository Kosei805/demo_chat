import { ChatRoomType } from "../../@types/chatRoomType";
import { frontendChat } from "../../@types";
import { sendSingleMessage } from "./singleAgent";
import { sendMultiMessage } from "./MultiAgents";

const resetChat = () => {
  console.log('reset chat');
}

export const sendMessage = (
  setTyping: React.Dispatch<React.SetStateAction<string | undefined>>,
  setChat: React.Dispatch<React.SetStateAction<frontendChat[]>>,
  allChats: Array<frontendChat>,
  nowChatRoom: ChatRoomType
) => {
  if (nowChatRoom.chatRoomType === "single") {
    sendSingleMessage(setTyping, setChat, allChats, nowChatRoom)
  } else {
    sendMultiMessage(setTyping, setChat, allChats, nowChatRoom)
  }
}