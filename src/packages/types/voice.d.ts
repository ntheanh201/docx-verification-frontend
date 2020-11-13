export interface Voice {
  id: string
  name: string
}

export interface VoiceBack {
  msg: string
  status: number
  version: string
  voices: Voice[]
}
