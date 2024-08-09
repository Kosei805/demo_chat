export interface AvaterType {
  name: string
  src: string
  shortSetting: string
  avaterPrompt: AvaterPromptType
}

interface AvaterPromptType {
  age: number
  conservationSetting: ConservationSettingType
  
}

interface ConservationSettingType {
  features: string[]
  example: string[]
}