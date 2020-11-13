import { createSlice, PayloadAction } from 'redux-core'
import { VoiceBack } from 'type'

interface AudioState extends VoiceBack {}

const initialState: AudioState = {
  msg: null,
  status: null,
  version: null,
  voices: null
}

export const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    getVoices: (state, { payload }: PayloadAction<VoiceBack>) => {
      state.msg = payload.msg
      state.status = payload.status
      state.version = payload.version
      state.voices = payload.voices
      // state = payload
    }
  }
})
