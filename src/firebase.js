import firebase from 'firebase';


const config = {
    apiKey: "AIzaSyCor4vAkog6uforo0X1fYRQmpSc1eXSH0I",
    authDomain: "swiperrrrrr.firebaseapp.com",
    databaseURL: "https://swiperrrrrr.firebaseio.com",
    projectId: "swiperrrrrr",
    storageBucket: "swiperrrrrr.appspot.com",
    messagingSenderId: "697158645393"
};

firebase.initializeApp(config);

//const app = firebase.initializeApp(config)
//const facebookProvider = new firebase.auth.FacebookAuthProvider()

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;