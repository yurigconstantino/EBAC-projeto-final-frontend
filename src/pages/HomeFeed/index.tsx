import { FeedAside } from '../../containers/FeedAside'
import { FeedMain } from '../../containers/FeedMain'

// ------------DEFINIR INTERFACE/TYPES------------
export function Feed() {

  return (
    <div className="min-h-screen bg-[#0B0B15]">
      <div className="max-w-300 mx-auto flex gap-8 p-4 lg:p-8">
        <FeedAside />
        <FeedMain />
      </div>
    </div>
  )
}
