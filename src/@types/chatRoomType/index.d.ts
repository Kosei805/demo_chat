import { frontendChat } from ".."
import { AvaterType } from "../avaterType"

export interface ChatRoomType {
  chatRoomId: number
  chatRoomType: "single" | "multi"
  smarterRoomMember?: AvaterType
  stupiderRoomMember?: AvaterType
  chatRoomMember: AvaterType
  chatRoomMessages: Array<frontendChat>
  makeTIme: string
}