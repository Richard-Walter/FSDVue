<template>
  <q-img class="" src="images\banner\login_bg.jpg" height="20em" alt="" />
  <q-page class="row justify-center">
    <div class="login_container">
      <q-card class="shadow-1">
        <q-card-section class="login_qcard">
          <div>
            <h2 style="text-align: center" >Login</h2>
            <LoginForm />
          </div>
          <hr style="color: rgb(218, 218, 218);">
          <p class="text-grey-7 q-mr-sm text-caption">Need An Account?<a href="/register" style="text-decoration: none;" class="text-black q-ml-sm">Sign up now</a></p>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import LoginForm from "../components/LoginForm";
</script>

<style lang="scss">
.login_container {
  padding: 20px 0;
  margin-top: 10em;
}

.login_qcard {
  background-color: $form_grey;
}
/* form styles */
.login_container form {
  width: 40em;
  margin-bottom: 2em;
}
.login_container label {
  display: block;
  // margin: 20px 0 10px;
}

.login_container span {
  cursor: pointer;
}

</style>
