<template>
  <div class="app_button__wrapper">
    <div class="app_button__container">
      <button
        :type="buttonType"
        :disabled="disabled"
        :class="buttonClasses"
        class="app_button"
        @click="handleClick"
      >
        {{ text }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    buttonType: {
      type: String,
      default: 'button',
      validator(value) {
        return ['button', 'submit', 'reset'].includes(value)
      }
    },
    disabled: {
      type: String,
      default: () => false
    },
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    buttonClasses() {
      return {}
    }
  },
  methods: {
    handleClick(event) {
      this.$emit('handleClick', event)
    }
  }
}
</script>

<style scoped lang="scss">
.app_button {
  padding: 0.4rem 0.6rem;
  background: $button;
  color: #fff;
  font: inherit;
  line-height: normal;
  overflow: visible;
  border-radius: 2px;
  transition: 0.3s all;

  &:hover {
    background-color: $button-hover;
  }
  &:focus {
    background-color: $button-focus;
    outline: none;
  }
}
</style>
