<!--suppress HtmlFormInputWithoutLabel -->
<template>
  <div class="app_input__wrapper">
    <div class="app_input__container">
      <input
        :value="value"
        :type="inputType"
        :name="name"
        :placeholder="placeholder"
        :pattern="pattern"
        :disabled="disabled"
        :required="required"
        :class="{ is_error: isError }"
        class="app_input"
        @input="updateInput"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    inputType: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    pattern: {
      type: String,
      default: '.*'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    isError: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    updateInput(value) {
      this.$emit('updateInput', value)
    }
  }
}
</script>

<style scoped lang="scss">
.app_input {
  display: inline-block;
  width: 100%;
  margin: 0;
  padding: 0.4rem 0.6rem;
  border: 1px solid $border;
  font-size: 0.94rem;
  line-height: 1;
  border-radius: 2px;
  -webkit-appearance: none;
  -moz-appearance: none;
  transition: 0.2s all;

  &:hover {
    border-color: $border-focus + #343434;
  }
  &:focus {
    border-color: $border-focus;
    outline: 0;
  }

  &.is_error {
    &,
    &:hover,
    &:focus {
      border-color: $error-text;
    }
  }
}
</style>
