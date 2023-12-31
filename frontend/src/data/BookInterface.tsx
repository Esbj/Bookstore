export interface Book {
  _id: string,
  title: string,
  author: string,
  description: string,
  price: number,
  isbn: string,
  imageUrl: string
}

export interface Author {
  _id: string,
  name: string,
  books: Book[]
  imageUrl: string
}

export interface CartProduct extends Book {
  quantity: number,
}