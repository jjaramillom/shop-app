import {firebaseApiKey} from './keys'

const firebaseUrl = 'https://shop-app-24603-default-rtdb.europe-west1.firebasedatabase.app';
const baseAuthUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';

const signUpUrl = `${baseAuthUrl}signUp?key=${firebaseApiKey}`;
const loginUrl = `${baseAuthUrl}signInWithPassword?key=${firebaseApiKey}`;

export { firebaseUrl, signUpUrl, loginUrl };
