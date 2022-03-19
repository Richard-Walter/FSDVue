<template>
  <form @submit.prevent="handleSubmit">
    <q-input
      ref="nameRef"
      v-model="name"
      dense
      bg-color="white"
      outlined
      placeholder="Name"
      lazy-rules="ondemand"
      :rules="nameRules"
    />
    
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
    <q-input
      ref="passwordConfirmRef"
      v-model="passwordConfirm"
      dense
      bg-color="white"
      outlined
      :type="isPwd ? 'password' : 'text'"
      placeholder="Confirm Password"
      lazy-rules="ondemand"
      :rules="passwordConfirmRules"
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
        <q-btn outline label="Sign UP" type="submit" color="info" />
      </div>
    </div>
  </form>
  <!-- <div v-if="invalidLoginMsg" class="text-negative q-mb-md">
    {{ invalidLoginMsg }}
  </div> -->
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useSignup from "../composables/useSignup.js";
import { useQuasar } from "quasar";

const router = useRouter();
const $q = useQuasar();

const validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const name = ref(null);
const nameRef = ref(null);
const nameRules = [
  (val) => (val && val.length > 1) || "Please enter a user name",
];

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

const passwordConfirm = ref("");
const passwordConfirmRef = ref(null);
const passwordConfirmRules = [
  (val) =>
    (val && val === password.value) ||
    "Confirm password must be equal to password.",
];

const isPwd = ref("true");
const invalidLoginMsg = ref("");

const { error, signup, isPending } = useSignup();

const handleSubmit = async () => {
  //check for valid name
  if (!nameRef.value.validate()) {
    return; //invalid name
  }
  //check for valid email
  if (!emailRef.value.validate()) {
    return; //invalid email
  }

  //check for valid password
  if (!passwordRef.value.validate()) {
    return; //invalid password
  }

  //check for valid confirm password
  if (!passwordConfirmRef.value.validate()) {
    return;
  }

  await signup(email.value, password.value);

  if (!error.value) {
    //success - route to site_details
    $q.notify({
      color: "positive",
      message: `Registration Successful`,
    });
    router.push("/");
  } else {
    $q.notify({
      color: "negative",
      message: `${error.value}`,
    });
    // invalidLoginMsg.value = error.value + ".  Please try again.";
  }
};
</script>

<style>
.flex-left {
  display: flex;
  justify-content: left;
  align-items: center;
}
</style>
