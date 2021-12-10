import { ssrRef } from '@nuxtjs/composition-api'
import productSortingSelectConfig from '@/assets/js/config/sortingTypes'

export default function useProductSortingSelect() {
    const sortingTypes = ssrRef(productSortingSelectConfig)
    return { sortingTypes }
}
