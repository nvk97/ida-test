<script>
import Uinput from '@/components/utils/Uinput.vue'
import validateUrl from '~/assets/js/utils/validateURL.js'

export default {
  components: {
    Uinput,
  },
  props: {
    fields: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      fieldsValues: {},
      fieldsErrors: {},
      isMobileVisible: false,
    }
  },
  computed: {
    isRequiredFieldIsFilled() {
      return this.fields.every((field) => !field.isRequired || this.fieldsValues[field.id] !== null)
    },
  },
  created() {
    this.fieldsValues = Object.fromEntries(new Map(this.fields.map((field) => [field.id, null])))
    this.fieldsErrors = Object.fromEntries(
      new Map(this.fields.map((field) => [field.id, 'hidden']))
    )
  },
  methods: {
    validateFields() {
      const notValidatedFieldsId = this.fields
        .map((field) => {
          const fieldErrorID = { id: field.id, errorState: null }
          if (
            this.fieldsValues[field.id] === null &&
            this.fields.find((_field) => _field.id === field.id).isRequired
          ) {
            fieldErrorID.errorState = 'notField'
          } else {
            switch (field.valueType) {
              case 'url-link':
                if (!validateUrl(this.fieldsValues[field.id]))
                  fieldErrorID.errorState = 'notValidUrl'
                break
              default:
                break
            }
          }
          return fieldErrorID
        })
        .filter((val) => val.errorState !== null)
      return notValidatedFieldsId
    },
    showErrorByNotValidatedFields(notValidatedFieldsId) {
      notValidatedFieldsId.forEach((field) => {
        this.fieldsErrors[field.id] = field.errorState
      })
    },
    addProductButtonClick() {
      const notValidatedFieldsId = this.validateFields()
      if (notValidatedFieldsId.length === 0) {
        this.createNewProduct()
      } else {
        this.showErrorByNotValidatedFields(notValidatedFieldsId)
      }
    },
    createNewProduct() {
      this.$emit('newProduct', this.fieldsValues)
      this.clearFieldsValues()
    },
    clearErrorStateById(id) {
      this.fieldsErrors[id] = 'hidden'
    },
    clearFieldsValues() {
      this.fieldsValues = Object.fromEntries(new Map(this.fields.map((field) => [field.id, null])))
    },
  },
}
</script>
<template>
  <aside class="product-form__wrapper">
    <div class="product-form" :class="{'visible':isMobileVisible}">
      <uinput
        v-for="(field, index) in fields"
        :key="field.id"
        v-model="fieldsValues[field.id]"
        :error-state="fieldsErrors[field.id]"
        :field="field"
        :tabindex="index + 1"
        @clear-error-state-by-id="clearErrorStateById"
      />
      <button
        class="product-form__button"
        :class="{ 'product-form__button--success': isRequiredFieldIsFilled }"
        :tabindex="fields.length + 1"
        @click="addProductButtonClick"
      >
        Добавить товар
      </button>
    </div>
    <button class="product-form__show" @click="isMobileVisible = !isMobileVisible">
      {{!isMobileVisible?'Открыть':'Скрыть'}} форму добавления товара
    </button>
  </aside>
</template>

<style lang="scss">
.product-form {
  padding: 24px;
  background: #fffefb;
  box-shadow: $box-shadow-card;
  border-radius: 4px;
  display: none;
  @include media('min', 'xl') {
    display: block;
  }
  &.visible{
    display: block;
  }
  &__wrapper {
    align-self: start;
    position: static;
    grid-column: span 2 / 2;
    @include media('min', 'md') {
      grid-column: span 2 / 2;
    }
    @include media('min', 'lg') {
      grid-column: span 3 / 3;
    }
    @include media('min', 'xl') {
      grid-column: auto;
      position: sticky;
    }
  }
  &__button,
  &__show {
    display: block;
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    border-radius: 10px;
    background: #eeeeee;
    color: $gray;
    transition: color 0.2s ease-in, background 0.2s ease-in;
    &:focus {
      background: #cfcfcf;
      color: #eeeeee;
    }
    &--success {
      cursor: pointer;
      background: $success-green;
      color: #ffffff;
      &:focus,
      &:hover {
        background: $success-green__hover;
      }
    }
  }
  &__show {
    cursor: pointer;
    background: $success-green;
    color: #ffffff;
    margin-top: 16px;
    &:focus,
    &:hover {
      background: $success-green__hover;
    }
    @include media('min', 'xl') {
      display: none;
    }
  }
}
</style>
