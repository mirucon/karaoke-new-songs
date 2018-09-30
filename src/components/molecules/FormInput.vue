<template>
  <div class="form_input__wrapper">
    <div class="form_input__container">
      <app-label
        v-if="label"
        :label="label"
        :name="name"
        class="form_input__label"
      />
      <app-input
        :value="value"
        :type="inputType"
        :name="name"
        :placeholder="placeholder"
        :pattern="pattern"
        :disabled="disabled"
        :required="required"
        :is-error="errorContains"
        class="form_input__input"
        @updateInput="updateInput"
      />
      <error-messages
        v-show="errorContains"
        :errors="errors"
        class="form_input__error_messages"
      />
    </div>
  </div>
</template>

<script>
import AppInput from '~/components/atoms/AppInput'
import AppLabel from '~/components/atoms/AppLabel'
import ErrorMessages from '~/components/atoms/ErrorMessages'

export default {
  name: 'FormInput',
  components: {
    AppLabel,
    AppInput,
    ErrorMessages
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
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
    errors: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    errorContains() {
      return !!this.errors.length
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
.form_input__container {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

.form_input__input {
  width: 100%;
}

.form_input__label {
  width: 100%;
  padding-bottom: 0.4rem;
}

.form_input__error_messages {
  width: 100%;
  padding-top: 0.4rem;
}
</style>
