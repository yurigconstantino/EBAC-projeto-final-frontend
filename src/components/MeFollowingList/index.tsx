import { useState } from 'react'
import type { MeFollowingList } from '../../types/MeFollowingList'
import { Avatar } from '../Avatar'
import { GlassCard } from '../GlassCard'
import { FollowButton } from '../FollowButton'
import { api } from '../../services/api'

interface Props {
  mefollowinglist: MeFollowingList
}

export const MeFollowingListCard = ({ mefollowinglist }: Props) => {
  const [isFollowing, setIsFollowing] = useState(true)
  const token = localStorage.getItem('token')

  async function handleFollow() {
    try {
      const response = await api.post(
        `/accounts/follow/${mefollowinglist.id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setIsFollowing(response.data.following)
    } catch (error) {
      console.error('Erro ao seguir usuario', error)
    }
  }
  return (
    <>
      <GlassCard
        key={mefollowinglist.id}
        className="flex items-center gap-3 p-2 my-2"
      >
        <Avatar alt="" src={mefollowinglist.avatar} />
        <h3 className="text-sm lg:text-lg">{mefollowinglist.username}</h3>
        <FollowButton isFollowing={isFollowing} handleFollow={handleFollow} />
      </GlassCard>
    </>
  )
}
