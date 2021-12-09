import { ref } from '@nuxtjs/composition-api'
import { cloneDeep } from 'lodash'
import { nanoid } from 'nanoid'

export default function useProductCard() {
    const productsList = ref([])

    const unshiftNewProduct = (val) => {
        const newProduct = cloneDeep(val)
        newProduct.id = nanoid(10)
        newProduct.createdAt = Date.now()
        const localStorageProductsList = JSON.parse(localStorage.getItem('productList')) || []
        localStorageProductsList.unshift(newProduct)
        localStorage.setItem('productList', JSON.stringify(localStorageProductsList))
        productsList.value.unshift(newProduct)
    }

    const checkLocalStorageData = () => {
        productsList.value = JSON.parse(localStorage.getItem('productList')) || []
    }

    const handleDeleteProductById = (id) => {
        productsList.value = productsList.value.filter((product) => product.id !== id)
        const localStorageProductsList = JSON.parse(localStorage.getItem('productList')).filter(
            (product) => product.id !== id
        )
        localStorage.setItem('productList', JSON.stringify(localStorageProductsList))
    }

    return {
        productsList,
        unshiftNewProduct,
        checkLocalStorageData,
        handleDeleteProductById,
    }
}
