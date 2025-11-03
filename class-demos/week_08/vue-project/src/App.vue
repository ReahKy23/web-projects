<script setup>
import { ref, onMounted } from "vue"

const myVariable = ref('hello')

const greetings = () =>{
  console.log('hi')
}

onMounted( ()=>{
  console.log(document.getElementById('blue-paragraph'))
})
</script>

<!-- this is any html -->
<template>
  <button @click="greetings">{{ myVariable }}</button>
  <p id="blue-paragraphs">
    now i have some text in here
  </p>
</template>

<!-- this is any styles -->
<style scoped></style>
