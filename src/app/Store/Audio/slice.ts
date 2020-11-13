import { createSlice, PayloadAction } from 'redux-core'
import { VoiceBack } from 'type'

interface AudioState extends VoiceBack {
  audioUrl: string
  playStatus: string
  audioPosition: number
  resumePosition: number
  duration: number
  position: number
}

const initialState: AudioState = {
  msg: null,
  status: null,
  version: null,
  voices: null,
  audioUrl: null,
  playStatus: 'STOPPED',
  position: 0,
  audioPosition: 0,
  resumePosition: 0,
  duration: 100
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
    },
    updatePlayStatus: (state, { payload }: PayloadAction<string>) => {
      state.playStatus = payload
    },
    updateAudioPosition: (state, { payload }: PayloadAction<number>) => {
      // state.position = payload
    },
    updateDuration: (state, { payload }: PayloadAction<number>) => {
      state.duration = payload
    }
  }
})

const {
  updatePlayStatus,
  updateAudioPosition,
  updateDuration
} = audioSlice.actions
export { updatePlayStatus, updateAudioPosition, updateDuration }
