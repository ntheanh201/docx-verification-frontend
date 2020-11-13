export interface Book {
  id?: number
  name: string
  saved_name?: string
  url?: string
  size?: number
  mimetype?: string
  uploader?: number
  total_pages?: number
  status?: Pick<'status', 'done'>
}

export interface BooksPaged {
  books: Book[]
  current_page: number
  total_pages: number
  page_size: number
}
