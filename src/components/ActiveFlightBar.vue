<template>
  <div class="activeFlight-bar">
        <div class="flex-center">
          <div class="text-small q-mb-sm">{{ displayText}}</div>
        </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const displayText = ref('Tracking active fllight - add controls here like center, hide trail, show flight plan Poi audio, save fight now')

</script>

<style lang="scss" scoped>

.flex-center{

  display: flex;
  justify-content: center;
  align-content: center;

}
.activeFlight-bar{
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: $warning;
  height: 4em;
  width: 100%;
  color: #343A28;
}

</style>
