<script>
import svgTemplate from '@/components/UI/svgTemplate.vue'

export default {
  components:{
    svgTemplate
  },
  props:{
    productData:{
      type:Object,
      required:true,
    }
  },
  computed:{
    priceString(){
      return this.productData.price <= 0 ? 'Бесплатно' : `${this.productData.price.toLocaleString()} руб.`
    }
  },
  methods:{
    deleteProduct(){
      this.$emit('delete-product',this.productData.id)
    }
  }
}
</script>
<template>
  <div class="product-card">
    <div class="product-card__image">
      <div class="product-card__image--wrapper">
        <img
          class="product-card__image--img"
          :src="productData.imageLink"
        />
      </div>
    </div>
    <div class="product-card__info">
      <div class="product-card__info--title">{{productData.name}}</div>
      <div class="product-card__info--description">
        {{productData.description}}
      </div>
      <div class="product-card__info--price">{{priceString}}</div>
    </div>
    <div class="product-card__delete" @click="deleteProduct">
      <svg-template class="product-card__delete--icon" :name="'delete-bucket'"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-card {
  background: #fffefb;
  box-shadow: $box-shadow-card;
  border-radius: 4px;
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;
  display: flex;
  align-self: stretch;
  flex-direction: column;
  position: relative;
  &__image {
    padding: 33%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow: hidden;
    position: relative;
    width: 100%;
    &--wrapper {
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      max-width: 100%;
    }
    &--img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  &__info {
    padding: 16px 16px 24px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    &--title {
      color: $black;
      font-size: 20px;
      line-height: 1.25;
      font-weight: 600;
      margin-bottom: 16px;
    }
    &--description {
      color: $black;
      font-size: 16px;
      line-height: 1.25;
      margin-bottom: 32px;
    }
    &--price {
      color: $black;
      font-size: 24px;
      line-height: 1.25;
      font-weight: 600;
      margin-top: auto;
    }
  }
  &__delete{
    position: absolute;
    visibility: none;
    opacity: 0;
    pointer-events: none;
    top:-8px;
    right: -11px;
    background: $danger-red;
    box-shadow: $box-shadow;
    border-radius: 10px;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.1s ease-in;
    &--icon{
      width: 16px;
      height: 16px;
      color: white;
    }
    &:hover{
      background: $danger-red__hover;
    }
  }
  &:hover{
    box-shadow: $box-shadow-card__hover;
  }
  &:hover &{
    &__delete{
      visibility: visible;
      opacity: 1;
      pointer-events: auto;
    }
  }
}
</style>