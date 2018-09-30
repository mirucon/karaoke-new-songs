<template>
  <div class="app_label__wrapper">
    <div class="app_label__container">
      <label
        :for="name"
        class="app_label"
      > {{ label }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLabel',
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.app_label {
  display: inline-block;
  width: 100%;
  text-align: left;
}
</style>
