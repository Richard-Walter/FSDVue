// import { ref } from "vue";

// const error = ref(null);
// const isPending = ref(false);

// const login = async (email, password) => {
//   error.value = null;
//   isPending.value = true;

//   const data = {email: email, password: password}

//   try {
//     const res = await fetch(`http://localhost:5000/login`, {
//       method: "post",
//       headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data)
//     });
//     if (!res) {
//       throw new Error("No response from server.  Try again later");
//     }

//     if (res.ok){
//       error.value = null;
//       isPending.value = false;
//     } else {
//       error.value = 'Login Unsuccessful. Please check email and password';
//       isPending.value = false;

//     }

//   } catch (err) {
//     error.value = `System error has occured: ${error.value}.  Contact support if problem persists`;
//     isPending.value = false;
//   }
// };

// const uselogin = () => {
//   return { error, login, isPending};
// };

// export default uselogin;

import { ref } from 'vue'

// firebase imports
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword  } from 'firebase/auth'

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {
  error.value = null
  isPending.value = true

  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    if (!res) {
      throw new Error('No response from firebase loggin in.')
    }
    
    error.value = null
    isPending.value = false
  }
  catch(err) {

    switch (err.code) {
        case 'auth/invalid-email':
            error.value= 'Invalid email'
            break
        case 'auth/user-not-found':
            error.value = 'No account with that email was found'
            break
        case 'auth/wrong-password':
            error.value = 'Incorrect password'
            break
        default:
            error.value = 'Email or password was incorrect'
            break
    }

    console.log(err.message)
    isPending.value = false
  }
}

const uselogin = () => {
  return { error, login, isPending }
}

export default uselogin