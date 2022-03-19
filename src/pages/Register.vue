<template>
  <q-img class="" src="images\banner\register_bg.jpg" height="20em" alt="" />
  <q-page class="row justify-center">
    <div class="register_container">
      <q-card class="shadow-1">
        <q-card-section class="register_qcard">
          <div>
            <h2 style="text-align: center" >Join Today</h2>
            <registerForm />
          </div>
          <hr style="color: rgb(218, 218, 218);">
          <p class="text-grey-7 q-mr-sm text-caption">Already Have An Account?<a href="/login" style="text-decoration: none;" class="text-black q-ml-sm">Sign up now</a></p>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import registerForm from "../components/registerForm";
</script>

<style lang="scss">
.register_container {
  padding: 20px 0;
  margin-top: 10em;
}

.register_qcard {
  background-color: $form_grey;
}
/* form styles */
.register_container form {
  width: 40em;
  margin-bottom: 2em;
}
.register_container label {
  display: block;
  // margin: 20px 0 10px;
}

.register_container span {
  cursor: pointer;
}

</style>
