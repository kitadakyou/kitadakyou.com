import { initializeApp, getApps } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const measurementId = 'G-WK4056L7VX'
const firebaseConfig = {
  apiKey: 'AIzaSyC3MzmgOkplDGt1S5Cl13Wcm760snSEltc',
  authDomain: 'kitadakyou-blog.firebaseapp.com',
  projectId: 'kitadakyou-blog',
  storageBucket: 'kitadakyou-blog.appspot.com',
  messagingSenderId: '829542751317',
  appId: '1:829542751317:web:cf73c257b7cfb549a508dc',
  measurementId
}

if (getApps().length < 1) {
  initializeApp(firebaseConfig)
}
const analytics = getAnalytics()

export { analytics, measurementId }
