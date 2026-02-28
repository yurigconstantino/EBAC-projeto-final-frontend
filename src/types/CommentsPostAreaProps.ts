import type { CommentData } from "./PostProps"

export type CommentsPostAreaProps = {
  commentText: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onClick: () => void
  commentList: CommentData[]
}
