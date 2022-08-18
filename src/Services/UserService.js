export class UserService{
  getUser(user){
    return {
      userDisplayName: user.userDisplayName,
      userEmail: user.userEmail,
      userGoogleId: user.userGoogleId,
      userId: user.userId,
      userPhoto: user.userPhoto,
      userSearchId: user.userSearchId
    }
  }
  getFriendChatId(user,friend){
    return [user, friend].sort().join('-')
  }
}