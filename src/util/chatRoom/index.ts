import { ChatRoomType } from "../../@types/chatRoomType"
import { getRandomAvater } from "../avater"

export const makeNewChatRoom = async (mode: "single" | "multi" = "single"): Promise<ChatRoomType> => {
  console.log('makeNewRoom')
  const chatRoomAvater = await getRandomAvater()
  if (mode === "multi") {
    const smarterRoomMember = await getRandomAvater([chatRoomAvater])
    const stupiderRoomMember = await getRandomAvater([chatRoomAvater, smarterRoomMember])
    if(chatRoomAvater && smarterRoomMember && stupiderRoomMember){
      return {
        chatRoomId: 1,
        chatRoomType: "multi",
        smarterRoomMember: smarterRoomMember,
        stupiderRoomMember: stupiderRoomMember,
        chatRoomMember: chatRoomAvater,
        chatRoomMessages: [],
        makeTIme: "2020-00-00"
      }
    }
  }
  return {
    chatRoomId: 1,
    chatRoomType: mode,
    chatRoomMember: chatRoomAvater,
    chatRoomMessages: [],
    makeTIme: "2020-00-00"
  }
}