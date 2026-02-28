import { useState } from 'react'
import type { CommentData } from '../types/PostProps'

export const useLikes = (like: number) => {
  const [likes, setLikes] = useState(like)

  return { likes, setLikes }
}

export const useLiked = (liked: boolean) => {
  const [like, setLike] = useState(liked)

  return { like, setLike }
}

export const useShowComments = (showComment: boolean) => {
  const [showComments, setShowComments] = useState(showComment)

  return { showComments, setShowComments }
}

export const useCommentsText = (commnet: string) => {
  const [commentText, setCommentText] = useState(commnet)

  return { commentText, setCommentText }
}

export const useComments = (commentsList: CommentData[]) => {
  const [comments, setComments] = useState(commentsList)

  return { comments, setComments }
}
