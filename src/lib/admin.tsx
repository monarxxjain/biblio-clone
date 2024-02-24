import * as admin from 'firebase-admin';
import * as serviceAccount from './../../firebase_admin_creds.json';


try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  });
  
  console.log('Initialized.')
} catch (error) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
    console.error('Firebase admin initialization error', error)
  
}

export default admin;