<template>
  <form @submit.prevent="handleSubmit">
    <q-input
      ref="emailRef"
      v-model="email"
      dense
      bg-color="white"
      outlined
      placeholder="Email"
      lazy-rules="ondemand"
      :rules="emailRules"
    />
    <q-input
      ref="passwordRef"
      v-model="password"
      dense
      bg-color="white"
      outlined
      :type="isPwd ? 'password' : 'text'"
      placeholder="Password"
      lazy-rules="ondemand"
      :rules="passwordRules"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
      
    </q-input>

    <div class="flex-left">
      <div>
        <q-btn outline label="Log in" type="submit" color="info" />
      </div>
      <div class="text-caption q-ml-md" @click="showLogin = false">
        <a  class="text-black q-ml-sm" style="text-decoration: none;" href="/reset_password">Forgot password?</a>
      </div>
    </div>
  </form>

</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useAuthStore } from '../store/auth.js'

const authStore = useAuthStore()

const router = useRouter();
const $q = useQuasar();

const validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const email = ref(null);
const emailRef = ref(null);
const emailRules = [
  (val) =>
    (val && val.match(validRegex)) || "Please enter a valid email address",
];

const password = ref("");
const passwordRef = ref(null);
const passwordRules = [
  (val) => (val && val.length > 5) || "Password must be at least 6 characters",
];

const isPwd = ref("true");

const handleSubmit = async () => {
  //check for valid email
  if (!emailRef.value.validate()) {
    return; //invalid email
  }

  //check for valid email
  if (!passwordRef.value.validate()) {
    return; //invalid password
  }

  await authStore.login(email.value, password.value)

  if (!authStore.error) {
    //success - route to site_details
    $q.notify({
      color: "positive",
      message: `Login Successful`,
    });
    router.push("/");
  } else {
    $q.notify({
      color: "negative",
      message: `${authStore.error}`,
    });
  }
};
</script>

<style>

.remember_me{

    margin-left: -0.5em;
    margin-bottom: 1em;
}
.flex-left {
  display: flex;
  justify-content: left;
  align-items: center;
}

</style>
