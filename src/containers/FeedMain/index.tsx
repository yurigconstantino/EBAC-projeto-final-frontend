import { PostCard } from '../../components/PostCard'
import { CreatePostCard } from '../CreatePostArea'
import { useText } from '../../hooks/useText'
import { usePost } from '../../hooks/usePost'

export const FeedMain = () => {
  // ------------POST ESTATICOS REMOVER DEPOIS------------
  const { text, setText } = useText('')
  const { posts, setPosts } = usePost([
    {
      id: 1,
      name: 'Cosmic Traveler',
      handle: '@nebula_surfer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      time: '2h',
      content:
        'A interface de utilizador do futuro não será "plana". Ela terá profundidade e luz. ✨',
      stats: { comments: 1, likes: 230 },
      image: 'https://picsum.photos/600/300?grayscale',
      commentsList: [
        {
          id: 101,
          name: 'Alex JS',
          handle: '@alexjs',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
          content: 'Concordo plenamente! TS mudou o meu workflow.',
          time: '1h'
        }
      ]
    },
    {
      id: 2,
      name: 'Tech Insider',
      handle: '@silicon_v',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
      time: '5h',
      content: 'A testar a nova rede social Orion. O design está incrível!',
      stats: { comments: 0, likes: 24 },
      commentsList: []
    }
  ])

  // ------------VARIAVEL PARA CRIAR UM POST------------
  const post = () => {
    if (!text) return
    setPosts([...posts])
    setText('')
  }
  return (
    <>
      <main className="flex-1 max-w-175">
        <CreatePostCard
          post={post}
          text={text}
          onChange={(e) => setText(e.target.value)}
        />
        {posts.map((p) => (
          <PostCard key={p.id} post={p} currentUser={p} />
        ))}
      </main>
    </>
  )
}
