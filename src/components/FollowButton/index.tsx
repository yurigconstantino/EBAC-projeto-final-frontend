import { Button } from '../Button'

type FollowButtonProps = {
  isFollowing: boolean
  handleFollow: () => void
}

export const FollowButton = ({
  isFollowing,
  handleFollow
}: FollowButtonProps) => {
  return (
    <Button
      children={isFollowing ? 'Following' : 'Follow'}
      variant={isFollowing ? 'following' : 'follow'}
      onClick={handleFollow}
      className="p-1"
    />
  )
}
