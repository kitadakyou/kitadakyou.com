import { initializeApp, getApps } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyCbvR8uF3-mTe3lG-d737n43oUE2cvu1U4',
  authDomain: 'local-circuit-159306.firebaseapp.com',
  projectId: 'local-circuit-159306',
  storageBucket: 'local-circuit-159306.appspot.com',
  messagingSenderId: '786183053663',
  appId: '1:786183053663:web:1d36d23948510c80a996ea',
  measurementId: 'G-973LF1LC2Q'
}

if (!getApps.length) {
  const app = initializeApp(firebaseConfig)
  if (typeof window !== 'undefined') {
    getAnalytics(app)
  }
}
