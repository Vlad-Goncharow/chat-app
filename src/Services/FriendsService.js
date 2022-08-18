import {
  db,
  storage
} from '../firebaseConfig'

import {
  collection,
  onSnapshot,
  query,
  getDocs,
  setDoc,
  deleteDoc,
  where,
  doc,
  addDoc,
  updateDoc,
  arrayRemove,
  arrayUnion
} from 'firebase/firestore'
import {
  v4 as uuidv4
} from 'uuid';
import { UserService } from './UserService';

import {
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytes
} from "firebase/storage";


export class FriendService{
  constructor(userId){
    this.userId = userId
  }

  getFriendsList(){
    return new Promise((resolve,reject) => {
      let ref = collection(db, `users/${this.userId}/usersFriends`)
      onSnapshot(ref, async doc => {
        if (!doc.empty) {
          let arr = doc.docs.map(el => {
            return el.data()
          })
          resolve(arr)
        }
      }, () => {
        reject('При загрузки списка друзей произошла ошибка!')
      })
    })
  }
  getFriendsRequests(){
    return new Promise((resolve,reject) => {
      const ref = collection(db, `users/${this.userId}/friendsInvites`)
      onSnapshot(ref, data => {
        if (!data.empty) {
          let arr = data.docs.map(el2 => {
            return {
              ...el2.data(),
              inviteId: el2.id
            }
          })
          resolve(arr)
        }else {
          resolve([])
        }
      }, () => {
        reject('При загрузки запросов в друзья произошла ошибка!')
      })
    })
  }
  getFriendMessages(userId,friendId){
    return new Promise((resolve,reject) => {
      const id = new UserService().getFriendChatId(userId, friendId)
      let ref = collection(db, `chats/${id}/messages`)
      let res = onSnapshot(ref, (item) => {
        console.log(item)
        let arr = item.docs.map(el => {
          return el.data()
        }).sort((a, b) => {
          return a.messageTimeStamp - b.messageTimeStamp
        })

        resolve(arr)
      }, (e) => {
        reject('При загрузки сообщений произошла ошибка!')
      })
    })
  }
  async acceptFriend(person,user){
    const fr = new UserService(person)
    const us = new UserService(user)

    let r = collection(db, 'users')
    let q = query(r, where('userSearchId', '==', person.userSearchId))
    let d = await getDocs(q)
    if (!d.empty) {
      d.forEach(async friend => {
        const id = new UserService().getFriendChatId(user.userSearchId, person.userSearchId)
        let ref1 = doc(db, `users/${user.userId}/usersFriends`, id)
        let ref2 = doc(db, `users/${friend.id}/usersFriends`, id)
        await setDoc(ref1, fr.getUser())
        await setDoc(ref2, us.getUser())
        await deleteDoc(doc(db, `users/${user.userId}/friendsInvites`, person.inviteId))
      })
    }
  }
  async declineFriend(person,user){
    await deleteDoc(doc(db, `users/${user.userId}/friendsInvites`, person.inviteId))
  }
  async loadImage(chatId, image) {
    if (image !== null){
      const storageRef = ref(storage, `chats-${chatId}/${image.name}`);
      let q = await uploadBytes(storageRef, image)
      const url = await getDownloadURL(ref(storage, q.ref.fullPath))
      return {
        url: url,
        name: image.name
      }
    } else {
      return {
        url: '',
        name: ''
      }
    }
  }
  async sendMessage(user, friendId, message, image) {
    const chatId = new UserService().getFriendChatId(user.userSearchId, friendId)
    let chatRef = collection(db, `chats/${chatId}/messages`)

    let {url,name} = await this.loadImage(chatId, image)

    addDoc(chatRef, {
      messageId: uuidv4(),
      messageText: message,
      messageUserEmail: user.userEmail,
      messageUserDisplayName: user.userDisplayName,
      messageUserPhoto: user.userPhoto,
      messageUserGoogleId: user.userGoogleId,
      messageTimeStamp: Math.floor(Date.now() / 1000),
      messageImgUrl: url,
      messageImgName: name
    })
  }
  async delteFriend(user,friend){
    const friendChatId = {
      "id": friend.userSearchId,
      "name": friend.userDisplayName,
      photo: friend.userPhoto
    }
    const deleteUserChatId = {
      "id": user.userSearchId,
      "name": user.userDisplayName,
      photo: user.userPhoto
    }

    const id = new UserService().getFriendChatId(user.userSearchId, friend.userSearchId)
    let fMess = await getDocs(collection(db, `chats/${id}/messages`))
    if (!fMess.empty) {
      fMess.forEach(el => {
        deleteDoc(doc(db, `chats/${id}/messages`, el.id));
      })
    }
    await deleteDoc(doc(db, `chats`, id));

    await deleteDoc(doc(db, `users/${user.userId}/usersFriends`, id));
    await deleteDoc(doc(db, `users/${friend.userId}/usersFriends`, id));

    const currentUser = doc(db, 'users', user.userId)
    const deleteUser = doc(db, 'users', friend.userId)
    await updateDoc(currentUser, {
      friendChats: arrayRemove(JSON.stringify(friendChatId))
    });
    await updateDoc(deleteUser, {
      friendChats: arrayRemove(JSON.stringify(deleteUserChatId))
    });
  }
  async createChat(user, friend) {
    const friendChatId = {
      "id": friend.userSearchId,
      "name": friend.userDisplayName,
      photo: friend.userPhoto
    }
    let q = JSON.stringify(friendChatId)
    if(!user.friendChats.find(el => el === q)){
      let ref = doc(db, 'users', user.userId)
      await updateDoc(ref, {
        friendChats: arrayUnion(q),
      });
    }
  }
  async deleteChat(user,chat){
    const obj = JSON.stringify(chat)
    const washingtonRef = doc(db, 'users', user.userId)
    await updateDoc(washingtonRef, {
      friendChats: arrayRemove(obj)
    });
  }
}