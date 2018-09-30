<template>
  <div class="error_messages__wrapper">
    <div class="error_messages__container">
      <div class="error_messages">
        <template v-for="(item, key) in errors" >
          <div 
            :key="getErrorKey(key)"
            class="error_message">{{ item }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessages',
  props: {
    errors: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      default: ''
    }
  },
  methods: {
    getErrorKey(key) {
      if (this.name) {
        return `${this.name}_error_${key}`
      }
      return `${Math.floor(Math.random() * 1000)}_error_${key}`
    }
  }
}
</script>

<style scoped lang="scss">
.error_messages {
  text-align: center;
  color: $error-border;
}
</style>
