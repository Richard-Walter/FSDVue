<template>
  <q-page class="">
    <p class="">{{ greeting }}</p>
    <p class="">{{ flaskGreeting }}</p>
  </q-page>
</template>

<script>
export default {

  data: function () {
    return {
      greeting: "Hello, from Vue!",
      flaskGreeting: "",
    };
  },
  created: async function () {
    const gResponse = await fetch("http://localhost:5000/greeting");
    const gObject = await gResponse.json();
    this.flaskGreeting = gObject.greeting;
  },
};
</script>

