import { FriendsLevel } from '@/components/FriendsLevel'
import { InviteBox } from '@/components/InviteBox'

const FriendsPage = () => {
  return (
    <div className='flex flex-col'>
      <FriendsLevel />
      <InviteBox />
    </div>
  )
}

export default FriendsPage;