export interface CommentData {
  id: number
  name: string
  handle: string
  avatar: string
  content: string
  time: string
}
export interface Post {
  id: number
  avatar: string
  name: string
  handle: string
  time: string
  content: string
  image?: string
  stats: { comments: number; likes: number }
  commentsList: CommentData[]
}
export interface UserProfile {
  name: string
  handle: string
  avatar: string
}
export interface PostCardProps {
  post: Post
  currentUser: UserProfile
}
