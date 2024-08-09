import fs from 'fs/promises'
import { ChatRoomType } from "../../../@types/chatRoomType"

// create

export const createChatRoom = async (chatRoom: ChatRoomType): Promise<void> => {
  const filePath = "./src/data/chatRoom.json"
  try {
    const jsonChatRoom = JSON.stringify(chatRoom, null, 2)
    await fs.writeFile(filePath, jsonChatRoom)
  }
  catch(error) {
    console.error('Error creating chatRoom JSON file: ',error)
    throw error
  }
}

export const createChatRooms = async (chatRooms: ChatRoomType[]): Promise<void> => {
  const filePath = "./src/data/chatRoom.json"
  try {
    const jsonChatRoom = JSON.stringify(chatRooms, null, 2)
    await fs.writeFile(filePath, jsonChatRoom)
  }
  catch(error) {
    console.error('Error creating chatRoom JSON file: ',error)
    throw error
  }
}

// update

export const updateChatRoom = async (chatRooms: ChatRoomType[]): Promise<void> => {
  try {
    const data = await readChatRoom()
    await createChatRooms([...data, ...chatRooms])
  }
  catch(error) {
    console.error('Error updating chatRoom JSON file: ',error)
    throw error
  }
}

// read

export const readChatRoom = async (): Promise<ChatRoomType[]> => {
  const filePath = "./src/data/chatRoom.json"
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch(error) {
    console.error('Error reading chatRoom JSON file: ',error)
    throw error
  }
}

// delete

export const deleteChatRoom = async (): Promise<void> => {
  const filePath = "./src/data/chatRoom.json"
  try {
    await fs.unlink(filePath)
  } catch(error) {
    console.error('Error deleting chatRoom JSON file: ',error)
    throw error
  }
}