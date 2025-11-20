import { FriendsLevel } from '@/components/FriendsLevel'
import { InviteBox } from '@/components/InviteBox'
import { MyTeam } from '@/components/MyTeam'

const FriendsPage = () => {
  return (
    <div className='flex flex-col'>
      <FriendsLevel />
      <InviteBox />
      <MyTeam className="mt-4" />
    </div>
  )
}

export default FriendsPage;