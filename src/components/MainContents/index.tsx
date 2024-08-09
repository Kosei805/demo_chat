import { Layout, theme } from 'antd'
import React, {useState} from 'react'
import HeaderComponents from './HeaderComponents'
import BodyComponents from './BodyConponents'
import FooterComponents from './FooterComponents'
import { ChatRoomType } from '../../@types/chatRoomType'
import { AvaterType } from '../../@types/avaterType'

type MainContentsProps = {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}



const MainContents: React.FC<MainContentsProps> = ({collapsed, setCollapsed}) => {
  const akira: AvaterType = {
    name: "アキラ",
    src: "https://raw.githubusercontent.com/Kosei805/demo_chat/main/images/avaterLogo/akira_icon.svg",
    shortSetting: "明るく社交的で探求心旺盛な中学生",
    avaterPrompt: {
      age: 14,
      conservationSetting: {
        features: [
          "明るくハキハキとした口調で話す",
          "難しい科学用語を分かりやすく説明しようとする",
          "新しい発見やアイデアを思いつくと、興奮して早口になる",
          "友達思いで、相手を励ましたり、助けようとする言葉が多い",
          "少し天然な発言で、場を和ませることもある"
        ],
        example: [
          "ねえねえ、この間図書館で見つけた古い本なんだけどさ、すごい技術が書いてあったんだ！聞いて聞いて！",
          "大丈夫！僕がきっと直してあげるよ！どんな道具が必要かな？",
          "あれ？おかしいな…なんでこうなるんだ？？"
        ]
      }
    }
  }
  const [chatRoom, setChatRoom] = useState<ChatRoomType>({
    chatRoomId: 1,
    chatRoomType: "single",
    chatRoomMember: akira,
    chatRoomMessages: [],
    makeTIme: new Date().toLocaleString()
  })
  const [makingChatRoom, setMakingChatRoom] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  return (
    <Layout>
      <div
        style={{height: '100%'}}  
      >
        <HeaderComponents
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          backgroundColorData={colorBgContainer}
          setChatRoomFunc={setChatRoom}
          setMakingChatRoom={setMakingChatRoom}
        />
        <BodyComponents
          backgroundColorData={colorBgContainer}
          radiusData={borderRadiusLG}
          chatRoom={chatRoom}
          makingChatRoom={makingChatRoom}
        />
        <FooterComponents />
      </div>
    </Layout>
  )
}

export default MainContents