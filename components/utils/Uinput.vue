<script>
import { errorFieldInFormMessages } from '@/assets/js/utils/constants'

export default {
  props: {
    field: {
      type: Object,
      required: true,
    },
    tabindex: {
      type: Number,
      default: 1,
    },
    value: {
      type: [String, Number, null],
      default: null,
    },
    errorState: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      displayValue: null,
      intermediateValue: '',
    }
  },
  computed: {
    mask() {
      return 'mask' in this.field ? this.field.mask : null
    },
    errorMessage() {
      return this.errorState === 'hidden' ? '' : errorFieldInFormMessages[this.errorState]
    },
  },
  watch: {
    value(newVal) {
        if (newVal === null) this.displayValue = null
    },
  },
  methods: {
    onKeyup() {
      this.$nextTick(() => {
        if (this.errorState !== 'hidden') this.$emit('clear-error-state-by-id', this.field.id)
        if (this.field.valueType === 'number') {
          const newValue = ((this.displayValue || '').match(/\d/g) || []).join('')
           console.log(newValue);
          this.$emit('input', parseInt(newValue, 10) === 0 ? parseInt(newValue, 10): parseInt(newValue, 10) || null)
        } else {
          this.$emit('input', this.displayValue === '' ? null : this.displayValue)
        }
      })
    },
  },
}
</script>

<template>
  <div class="u-input">
    <label :for="`u-input__${field.id}`" class="u-input__label">
      {{ field.label }}
      <div v-if="field.isRequired" class="u-input__label--required-mark">.</div>
    </label>
    <input
      v-if="field.type === 'input'"
      :id="`u-input__${field.id}`"
      v-model="displayValue"
      v-imask="mask"
      class="u-input__input"
      :class="{ 'u-input__input--error': errorState !== 'hidden' }"
      type="text"
      :maxlength="field.maxLength || null"
      :tabindex="tabindex"
      :placeholder="field.placeholder"
      @keyup="onKeyup"
    />
    <textarea
      v-else-if="field.type === 'textarea'"
      :id="`u-input__${field.id}`"
      v-model="displayValue"
      v-imask="mask"
      class="u-input__input"
      :tabindex="tabindex"
      :maxlength="field.maxLength || null"
      rows="6"
      :placeholder="field.placeholder"
      @keyup="onKeyup"
    />
    <div
      class="u-input__error-message"
      :class="{ 'u-input__error-message--showed': errorState !== 'hidden' }"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.u-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 2px;
  &__label {
    display: block;
    align-self: flex-start;
    margin-bottom: 4px;
    cursor: pointer;
    position: relative;
    &--required-mark {
      position: absolute;
      right: -5px;
      top: -6px;
      width: 4px;
      height: 4px;
      color: $danger-red;
      font-size: 30px;
      line-height: 0;
    }
  }
  &__input {
    margin-bottom: 4px;
    background: #fffefb;
    border: 1px solid #fffefb;
    box-sizing: border-box;
    box-shadow: $box-shadow;
    border-radius: 4px;
    font-size: 12px;
    padding: 10px 16px;
    transition: box-shadow 0.2s ease-in-out, border 0.2s ease-in-out;
    resize: none;
    border: 1px solid #fffefb;
    &::placeholder {
      color: $gray;
    }
    &:hover,
    &:focus {
      box-shadow: $box-shadow__hover;
    }
    &--description {
      height: 10rem;
      text-align: start;
    }
    &--error {
      border: 1px solid $danger-red;
    }
  }
  &__error-message {
    visibility: hidden;
    color: $danger-red;
    opacity: 0;
    font-size: 8px;
    height: 8px;
    transition: opacity 0.2s ease-in-out;
    &--showed {
      visibility: visible;
      opacity: 1;
    }
  }
}
</style>