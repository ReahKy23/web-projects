<script setup>
// this is javascript code
// imports, tell the library to pull something specific to vue
// this is a function that allows us to do something when the vue loads on the webpage
import { onMounted} from "vue";
import MyButton from "./MyButton.vue";


// onMounted is similar to window.onload()
onMounted(() => {
  console.log("the component has mounted, or added to the DOM");
});

// const buttonClick = () =>{

// }

</script>

<template>
  <!-- this is html code -->
  <!-- the '@' symbol is shorthand for 'v-on', which attaches an event listener to an element -->

  <MyButton />
  <img src="./public/imgs/1x/screen.png">
</template>

<style scoped>
/* this is css  */

button {
  border: 3px solid cyan;
}
</style>
