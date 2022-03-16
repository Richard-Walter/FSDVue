import { ref } from "vue";

const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {
  error.value = null;
  isPending.value = true;

  const data = {email: email, password: password}

  try {
    const res = await fetch(`http://localhost:5000/login`, {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    if (!res) {
      throw new Error("No response from server.  Try again later");
    }

    if (res.ok){
      error.value = null;
      isPending.value = false;
    } else {
      error.value = 'Login Unsuccessful. Please check email and password';
      isPending.value = false;

    }

  } catch (err) {
    error.value = `System error has occured: ${error.value}.  Contact support if problem persists`;
    isPending.value = false;
  }
};

const uselogin = () => {
  return { error, login, isPending};
};

export default uselogin;
