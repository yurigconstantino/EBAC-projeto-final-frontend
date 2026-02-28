export interface RegisterData {
  username: string
  email: string
  password: string
}

export interface TokenResponse {
  access: string
  refresh: string
}
