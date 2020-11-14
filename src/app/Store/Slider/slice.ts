import { createSlice, PayloadAction } from 'redux-core'

interface SliderState {
  playStatus: string
  duration: number
  position: number
}

const initialState: SliderState = {
  position: 0,
  duration: 0,
  playStatus: 'STOPPED'
}

export const sliderSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    updateAudioPosition: (state, { payload }: PayloadAction<number>) => {
      state.position = payload
    },
    updateDuration: (state, { payload }: PayloadAction<number>) => {
      state.duration = payload
    },
    updatePlayStatus: (state, { payload }: PayloadAction<string>) => {
      state.playStatus = payload
    }
  }
})

const {
  updateAudioPosition,
  updateDuration,
  updatePlayStatus
} = sliderSlice.actions
export { updateAudioPosition, updateDuration, updatePlayStatus }
