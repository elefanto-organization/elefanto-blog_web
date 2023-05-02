export interface ILoginInput {
  username: string,
  password: string
}

export interface ILoginResponse {
  token: string
}

export interface Author {
  id: number,
  username: string,
  first_name: string,
  last_name: string,
}

export interface Category {
  id: number,
  name: string
}

export interface IBlogParams {
  category?: number | null
  author?: string
  search?: string
}
export interface IBlogResponse {
  id: number,
  category: Category,
  title: string,
  text: string,
}

export interface IBlogResponse {
  id: number,
  author: Author,
  category: Category,
  title: string,
  text: string,
  created_at: string,
  updated_at: string,
}

export interface IBlogInput {
  category: Category['id'],
  title: string,
  text: string,
}

export interface ICategory {
  id: number,
  name: string
}