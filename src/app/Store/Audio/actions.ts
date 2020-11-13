import { audioSlice } from './slice'

import { audioService } from 'service'

const { getVoices } = audioSlice.actions

export const getVoicesActionCreator = () => async dispatch => {
  try {
    const data = await audioService.getAudioVoice()
    await dispatch(getVoices(data))
    return data
  } catch (e) {
    return console.error(e.message)
  }
}
