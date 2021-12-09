import { ssrRef } from '@nuxtjs/composition-api'
import productSortingSelectConfig from '@/assets/js/config/sortingTypes'

export default function useProductSortingSelect(productList) {
    const sortingTypes = ssrRef(productSortingSelectConfig)
    const sortProductList = (sortData) => {
        productList.value.sort((productA, productB) => {
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

        localStorage.setItem('productList', JSON.stringify(productList.value))
        localStorage.setItem('sortProductList', JSON.stringify(sortData))
    }
    return { sortingTypes, sortProductList }
}
