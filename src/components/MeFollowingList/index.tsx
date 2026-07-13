import type { MeFollowingList } from '../../types/MeFollowingList'
import { Avatar } from '../Avatar'
import { GlassCard } from '../GlassCard'

interface Props {
  mefollowinglist: MeFollowingList
}

export const MeFollowingListCard = ({ mefollowinglist }: Props) => {
  return (
    <>
      <GlassCard
        key={mefollowinglist.id}
        className="flex items-center gap-3 p-2 my-2"
      >
        <Avatar alt="" src={mefollowinglist.avatar} />
        <h3 className="text-sm lg:text-lg">{mefollowinglist.username}</h3>
      </GlassCard>
    </>
  )
}
