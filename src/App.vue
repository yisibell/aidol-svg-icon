<template>
  <div id="app">
    <h3>@aidol/svg-icon</h3>
    <svg-icon icon-class="app" />
    <svg-icon icon-class="text-underline" />
    <svg-icon icon-class="text-de-line-through" />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app svg {
  fill: red;
}
</style>
