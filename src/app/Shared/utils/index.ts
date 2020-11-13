export const getBookTotalPages = (books, bookId) => {
  return books.map(({ id, total_pages }) => id === bookId && total_pages)
}
