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

  editNormText(bookId, textNorm): Promise<string> {
    return axios
      .put(this.baseURL + '/norm_text', {
        page_id: bookId,
        text_norm: textNorm
      })
      .then(res => res.data)
      .catch(err => {
        console.log(err)
        throw err
      })
  }

  verifyNormText(bookId): Promise<string> {
    return axios
      .put(this.baseURL + '/verified', {
        page_id: bookId
      })
      .then(res => res.data)
      .catch(err => {
        console.log(err)
        throw err
      })
  }

  genAudio(bookId, voiceId): Promise<any> {
    return axios
      .post(this.baseURL + '/gen_audio', {
        page_id: bookId,
        voice_id: voiceId
      })
      .then(res => res.data)
      .catch(err => {
        console.log(err)
        throw err
      })
  }
}

export const pageService = new PageService()
