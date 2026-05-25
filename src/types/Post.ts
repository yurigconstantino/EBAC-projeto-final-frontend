export interface Post {
  id: number
  author: number
  author_username: string
  author_avatar: string | null
  is_following_author: boolean
  content: string
  image: string | null
  image_url: string | null
  likes_count: number
  liked_by_user: boolean
  comments_count: number
  created_at: string
}
