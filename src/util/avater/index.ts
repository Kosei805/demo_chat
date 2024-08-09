import { AvaterType } from "../../@types/avaterType"
import { avaterData } from "../../data/avaterData"

export const getRandomAvater = async (alreadyAvater: AvaterType[] = []) => {
  const avaters = avaterData
  const existAvater = avaters.filter(avater => alreadyAvater.includes(avater))
  const  randomIndex = Math.floor(Math.random() * existAvater.length)
  return existAvater[randomIndex]
}