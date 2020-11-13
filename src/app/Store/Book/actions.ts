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
  pageId: number,
  normText: string
) => async dispatch => {
  try {
    await pageService.editNormText(pageId, normText)
    await dispatch(editNormText(normText))
  } catch (e) {
    return console.error(e.message)
  }
}

export const verifyNormTextActionCreator = (
  pageId: number
) => async dispatch => {
  try {
    await pageService.verifyNormText(pageId)
    await dispatch(verifyNormText())
  } catch (e) {
    return console.error(e.message)
  }
}

export const genAudioActionCreator = (
  pageId: number,
  voiceId: number
) => async dispatch => {
  try {
    const data = await pageService.genAudio(pageId, voiceId)
    if (data.statusCode !== 404) {
      await dispatch(genAudio(data))
    }
  } catch (e) {
    return console.error(e.message)
  }
}
