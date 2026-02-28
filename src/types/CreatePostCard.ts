export type CreatePostCardProps = {
  post: () => void
  text: string
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}
