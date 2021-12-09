<script>
import { defineComponent, onBeforeMount } from '@nuxtjs/composition-api'
import productAdditionForm from '@/components/product/productAdditionForm.vue'
import productCard from '@/components/product/productCard.vue'
import Uselect from '@/components/utils/Uselect.vue'

// composition
import useProductAdditionForm from '@/composables/useProductAdditionForm.js'
import useProductCard from '@/composables/useProductCard.js'
import useProductSortingSelect from '@/composables/useProductSortingSelect'

export default defineComponent({
  components: {
    productAdditionForm,
    productCard,
    Uselect,
  },
  setup() {
    const { productAdditionFormFields } = useProductAdditionForm()
    const { productsList, unshiftNewProduct, checkLocalStorageData, handleDeleteProductById } =
      useProductCard()
    const { sortingTypes, sortProductList } = useProductSortingSelect(productsList)
    onBeforeMount(checkLocalStorageData)
    return {
      productAdditionFormFields,
      productsList,
      unshiftNewProduct,
      handleDeleteProductById,
      sortingTypes,
      sortProductList
    }
  },
})
</script>

<template>
  <main>
    <section class="container">
      <div class="products-header">
        <h1 class="title">Добавление товара</h1>
        <uselect :select-data="sortingTypes" @sort-product-list="sortProductList"/>
      </div>
    </section>
    <section class="container products">
      <product-addition-form :fields="productAdditionFormFields" @newProduct="unshiftNewProduct" />
      <section class="products-list">
        <product-card
          v-for="product in productsList"
          :key="product.id"
          :product-data="product"
          @delete-product="handleDeleteProductById"
        />
      </section>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.products {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 16px;
  margin-top: 16px;
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 31px;
    .title {
      font-size: 28px;
      font-weight: 600;
    }
  }
  &-list {
    display: grid;
    grid-gap: 16px;
    align-self: start;
    grid-column: span 3 / span 3;
    grid-template-columns: repeat( 3, minmax(calc(33.33% - 16px), 1fr) );
  }
}
</style>
