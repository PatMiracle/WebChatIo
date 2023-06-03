import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyATYzSBRTcxsEHNrTYJR3_oTZOVvoPl5JU',
  authDomain: 'webchatio-c2eff.firebaseapp.com',
  projectId: 'webchatio-c2eff',
  storageBucket: 'webchatio-c2eff.appspot.com',
  messagingSenderId: '702476012840',
  appId: '1:702476012840:web:d30032abc45bb80457941d',
  measurementId: 'G-B1RLTY7BF1',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
