import { pageSlice } from './slice'

import { pageService } from 'service'

const {
  getPageInfo,
  verifyNormText,
  editNormText,
  genAudio
} = pageSlice.actions

export const getPageInfoActionCreator = (
  bookId: number,
  pageNumber: number
) => async dispatch => {
  try {
    const data = await pageService.getPageInfo(bookId, pageNumber)
    await dispatch(getPageInfo(data))
    return data
  } catch (e) {
    return console.error(e.message)
  }
}

export const editNormTextActionCreator = (
  bookId: number,
  normText: string
) => async dispatch => {
  try {
    await pageService.editNormText(bookId, normText)
    await dispatch(editNormText(normText))
  } catch (e) {
    return console.error(e.message)
  }
}

export const verifyNormTextActionCreator = (
  bookId: number
) => async dispatch => {
  try {
    await pageService.verifyNormText(bookId)
    await dispatch(verifyNormText())
  } catch (e) {
    return console.error(e.message)
  }
}

export const genAudioActionCreator = (
  bookId: number,
  voiceId: number
) => async dispatch => {
  try {
    const data = await pageService.genAudio(bookId, voiceId)
    if (data.statusCode !== 404) {
      await dispatch(genAudio(data))
    }
  } catch (e) {
    return console.error(e.message)
  }
}
