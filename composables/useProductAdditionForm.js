import { ssrRef } from '@nuxtjs/composition-api'
import productAdditionFormFieldsTypes from '@/assets/js/config/productAdditionFormFieldsTypes'

export default function useProductAdditionForm() {
    const productAdditionFormFields = ssrRef(productAdditionFormFieldsTypes)
    return { productAdditionFormFields }
}
