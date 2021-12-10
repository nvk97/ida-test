import { ref, watch } from '@nuxtjs/composition-api'
import { cloneDeep } from 'lodash'
import { nanoid } from 'nanoid'

export default function useProductCard() {
    const productsList = ref([])
    const newProductId = ref('')
    watch(productsList, (newList) => {
        localStorage.setItem('productsList', JSON.stringify(newList))
    })
    watch(newProductId, (newVal) => {
        if (newVal !== null)
            setTimeout(() => {
                newProductId.value = null
            }, 3000)
    })
    const checkLocalStorageData = () => {
        productsList.value = JSON.parse(localStorage.getItem('productsList')) || []
    }

    const handleDeleteProductById = (id) => {
        productsList.value = productsList.value.filter((product) => product.id !== id)
    }

    const sortProductsList = (sortData) => {
        productsList.value.sort((productA, productB) => {
            if (sortData.sortValueType === 'number') {
                switch (sortData.sortType) {
                    case 'inc':
                        return (
                            productA[sortData.sortingByValueId] -
                            productB[sortData.sortingByValueId]
                        )
                    case 'dec':
                        return (
                            productB[sortData.sortingByValueId] -
                            productA[sortData.sortingByValueId]
                        )
                    default:
                        return 0
                }
            } else if (sortData.sortValueType === 'string') {
                switch (sortData.sortType) {
                    case 'inc':
                        return productA[sortData.sortingByValueId] >
                            productB[sortData.sortingByValueId]
                            ? -1
                            : 1
                    case 'dec':
                        return productB[sortData.sortingByValueId] >
                            productA[sortData.sortingByValueId]
                            ? -1
                            : 1
                    default:
                        return 0
                }
            } else {
                return 0
            }
        })
        localStorage.setItem('sortProductsList', JSON.stringify(sortData))
    }
    const unshiftNewProduct = (val) => {
        const newProduct = cloneDeep(val)
        const id = nanoid(10)
        newProduct.id = id
        newProductId.value = id
        newProduct.createdAt = Date.now()
        productsList.value.unshift(newProduct)
        const sortData = JSON.parse(`${localStorage.getItem('sortProductsList')}`) || null
        if (sortData !== null) sortProductsList(sortData)
    }
    return {
        productsList,
        unshiftNewProduct,
        checkLocalStorageData,
        handleDeleteProductById,
        sortProductsList,
        newProductId,
    }
}
