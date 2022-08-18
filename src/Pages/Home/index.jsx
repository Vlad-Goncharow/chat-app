import React from 'react';

import FriendsHeader from '../../Components/FriendsHeader';
import AddFriend from '../AddFriend';
import FriendsList from '../FriendsList';
import FriendsRequests from '../FriendsRequests';
import s from './Home.module.scss';

function Home() {
  // ======== category
  const [category, setCategory] = React.useState('friends')
  // ======== category

  // ======== check category page
  function checkUrl() {
    switch (category) {
      case 'friends':
        return (
          <FriendsList />
        )
      case 'requests':
        return (
          <FriendsRequests />
        )
      case 'add-friend':
        return (
          <AddFriend />
        )
      default:
        return
    }
  }
  // ======== check category page

  return (
    <div className={s.home}>
      <div className={s.right}>
        <FriendsHeader category={category} setCategory={setCategory} />
        {checkUrl()}
      </div>
    </div>
  )
}

export default Home