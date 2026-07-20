import type { Post } from '../types/Post'

type PostLike = Pick<Post, 'id' | 'comments_count'>

export function updatePostCommentsCount<T extends PostLike>(
  post: T[],
  postId: number,
  newCount: number
): T[] {
  return post.map((post) =>
    post.id === postId ? { ...post, comments_count: newCount } : post
  )
}
