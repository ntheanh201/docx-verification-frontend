import { axios } from 'http-backend'
import { Book, VoiceBack } from 'type'

import BaseService from './Base'

class AudioService extends BaseService<Book> {
  constructor() {
    super()
    this.baseURL += 'audio'
  }

  getAudioVoice(): Promise<VoiceBack> {
    return axios
      .post(this.baseURL + '/voices')
      .then(res => res.data)
      .catch(err => {
        console.log(err)
        throw err
      })
  }
}

export const audioService = new AudioService()
