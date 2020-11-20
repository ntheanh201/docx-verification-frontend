import { axios } from 'http-backend'
import { Book, Page } from 'type'

import BaseService from './Base'

class PageService extends BaseService<Book> {
  constructor() {
    super()
    this.baseURL += 'pages'
  }

  // getBookPages(bookId): Promise<{ pages: number }> {
  //   return axios
  //     .get(this.baseURL + `count/${bookId}`)
  //     .then(res => res.data)
  //     .catch(err => {
  //       console.log(err)
  //       throw err
  //     })
  // }

  getPageInfo(bookId, pageNumber): Promise<Page> {
    return axios
      .get(this.baseURL + `/${bookId}/${pageNumber}/info`)
      .then(res => res.data)
      .catch(err => {
        console.log(err)
        throw err
      })
  }

  editNormText(pageId, textNorm): Promise<string> {
    return axios
      .put(this.baseURL + '/norm_text', {
        page_id: pageId,
        text_norm: textNorm
      })
      .then(res => res.data)
      .catch(err => {
        console.log(err)
        throw err
      })
  }

  verifyNormText(pageId): Promise<Page> {
    return axios
      .put(this.baseURL + '/toggle_verify', {
        page_id: pageId
      })
      .then(res => res.data)
      .catch(err => {
        console.log(err)
        throw err
      })
  }

  genAudio(pageId, voiceId): Promise<any> {
    return axios
      .post(this.baseURL + '/gen_audio', {
        page_id: pageId,
        voice_id: voiceId
      })
      .then(res => res.data)
      .catch(err => {
        console.log(err)
        throw err
      })
  }

  async checkGenerated(task_id: string): Promise<{ completed: boolean }> {
    return axios
      .get(this.baseURL + '/gen_audio/status/' + task_id)
      .then(res => res.data)
      .catch(err => {
        console.log(err.toString())
        return false
      })
  }

  async getProgress(
    book_id: number
  ): Promise<{ totals: number; verified: number }> {
    return axios
      .get(this.baseURL + '/progress/' + book_id)
      .then(res => res.data)
      .catch(err => {
        console.log(err.toString())
        return { totals: 1, verified: 0 }
      })
  }

  async getGenAudioProgress(
    book_id: number
  ): Promise<{ totals: number; generated: number }> {
    return axios
      .get(this.baseURL + '/gen_audio/progress/' + book_id)
      .then(res => res.data)
      .catch(err => {
        console.log(err.toString())
        return { totals: 1, generated: 0 }
      })
  }

  async genAllAudio(bookId): Promise<any> {
    return axios
      .post(this.baseURL + '/gen_audio/all', {
        book_id: bookId
        // voice_id: voiceId
      })
      .then(res => res.data)
      .catch(err => {
        console.log(err)
        throw err
      })
  }
}

export const pageService = new PageService()
