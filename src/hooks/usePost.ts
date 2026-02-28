import { useState } from 'react'
import type { Post } from '../types/PostProps'

export const usePost = (feedPosts: Post[]) => {
  const [posts, setPosts] = useState(feedPosts)

  return { posts, setPosts }
}
