import { createSlice, PayloadAction } from 'redux-core'
import { VoiceBack } from 'type'

interface AudioState extends VoiceBack {
  audioUrl: string
  playStatus: string
  playing: boolean
  playAll: boolean
  finished1Page: boolean
}

const initialState: AudioState = {
  msg: null,
  status: null,
  version: null,
  voices: null,
  audioUrl: null,
  playStatus: 'STOPPED',
  playing: false,
  playAll: false,
  finished1Page: false
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
    updatePlaying: (state, { payload }: PayloadAction<boolean>) => {
      state.playing = payload
    },
    updatePlayAll: (state, { payload }: PayloadAction<boolean>) => {
      state.playAll = payload
    },
    updateFinished: (state, { payload }: PayloadAction<boolean>) => {
      state.finished1Page = payload
    }
  }
})

const {
  updatePlayStatus,
  updatePlaying,
  updatePlayAll,
  updateFinished
} = audioSlice.actions
export { updatePlayStatus, updatePlaying, updatePlayAll, updateFinished }
