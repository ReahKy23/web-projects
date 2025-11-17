<script setup>
import{ref} from 'vue'
// declare a varible in vue using "ref()"
// this is a number equal to 0
let numClicks = ref(0);

function buttonClick() {
  console.log("click detected");

  // value needs to be used in order to acces teh value of teh variable in the <script>
  numClicks.value++;
}
</script>

<template>
  <button @click="buttonClick">click me</button>
  <div>
    number of clicks {{ numClicks }}
  </div>
</template>

<style scoped>
</style>
