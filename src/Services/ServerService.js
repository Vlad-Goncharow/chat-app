import { db,storage} from '../firebaseConfig'
import {
  query,
  where,
  collection,
  onSnapshot,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  arrayRemove,
  addDoc
} from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import {
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytes
} from "firebase/storage";
import {UserService} from '../Services/UserService'

export class ServerServ{
  constructor(id,chat){
    this.id = id
    this.chat = chat
  }
  getSeverInfo(id){
    return new Promise((resolve,reject)=> {
      let ref = collection(db,'servers')
      let quer = query(ref, where("serverSearchId", "==", id))
      onSnapshot(quer,(res) => {
        if (!res.empty) {
          let item = res.docs[0]

          resolve({
            ...item.data(),
            serverId: item.id
          })
        }
      })
    })
  }
  async addFriend(user,id){
    let us = new UserService(user)
    const userCollection = collection(db, 'users')
    const quer = query(userCollection, where('userSearchId', '==', id))
    const data = await getDocs(quer)

    if (!data.empty) {
      addDoc(collection(db, `users/${data.docs[0].id}/friendsInvites`), us.getUser())
    }
  }
  async deleteServer(serverChatsList,searchId, userId, serverImageName) {
    let q = await getDocs(collection(db, `servers/${this.id}/serverUsers`))
    serverChatsList.forEach(async el => {
      let q1 = collection(db, `servers/${this.id}/${el}`)
      let da = await getDocs(q1)
      da.forEach(async el2 => {
        await deleteDoc(doc(db, `servers/${this.id}/${el}`, el2.id));
      })
    })
    q.forEach(async (el) => {
      await deleteDoc(doc(db, `servers/${this.id}/serverUsers`, el.id));
    });
    await deleteDoc(doc(db, "servers", this.id))
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
      serversList: arrayRemove(searchId),
    })
    await deleteObject(ref(storage, serverImageName))
  }
  async laodImage(serverSearchId,image) {
    if(image !== null) {
      const storageRef = ref(storage, `server-${serverSearchId}/${image.name}`);
      let q = await uploadBytes(storageRef, image)
      let url = await getDownloadURL(ref(storage, q.ref.fullPath))

      return {
        url:url,
        name:image.name
      }
    } else {
      return {
        url: '',
        name: ''
      }
    }
    
  }
  async addNewMessage(user,currentServer,serverName,message,image){
    const {url,name} = await this.laodImage(currentServer.serverSearchId,image)

    let serverRef = collection(db, `servers/${currentServer.serverId}/${serverName}/`)
    addDoc(serverRef, {
      messageId: uuidv4(),
      messageText: message,
      messageUserEmail: user.userEmail,
      messageUserDisplayName: user.userDisplayName,
      messageUserPhoto: user.userPhoto,
      messageUserGoogleId: user.userGoogleId,
      messagesImgUrl: url,
      messagesImgName: name,
      messageTimeStamp: Math.floor(Date.now() / 1000)
    })
  }
}