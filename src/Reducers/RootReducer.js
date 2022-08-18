import { combineReducers } from "@reduxjs/toolkit";
import ServerListReducer from "./ServerListReducer";
import UserReducer from "./UserReducer";
import Messages from "./Messages";
import FriendChatReducer from "./FriendChatReducer";
import FriendsReducer from "./FriendsReducer";
import FriendsMessages from "./FriendsMessages";
import FriendsRequestsReducer from "./FriendsRequestsReducer";
import ServerUsersReducer from "./ServerUsersReducer";
import ServerMessagesReducer from "./ServerMessagesReducer";
import ServerInfoReducer from "./ServerInfoReducer";
import ProfileUserReducer from "./ProfileUserReducer";
import ModalReducer from "./ModalReducer";

export const RootReducer = combineReducers({
  user: UserReducer,
  serverList: ServerListReducer,
  messages: Messages,
  friendChat: FriendChatReducer,
  friends: FriendsReducer,
  friendsMessages: FriendsMessages,
  friendsRequests: FriendsRequestsReducer,
  serverUsers: ServerUsersReducer,
  serverMessages: ServerMessagesReducer,
  serverInfo: ServerInfoReducer,
  profile: ProfileUserReducer,
  modal: ModalReducer
})