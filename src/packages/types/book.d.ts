export interface Book {
  id?: number
  name: string
  saved_name?: string
  url?: string
  size?: number
  mimetype?: string
  uploader?: number
  total_pages?: number
  audio_url: string
  status?: Pick<'status', 'done'>
  acceptAudioDownload?: boolean
}

export interface BooksPaged {
  books: Book[]
  current_page: number
  total_pages: number
  page_size: number
}

export interface Page {
  voice_id: string
  reviewer: any
  status: string
  audio_url: string
  uploader: number
  task_id: number
  text_norm: string
  text_raw: string
  page_num: number
  book_id: number
  id?: number
}
