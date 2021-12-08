import { ref } from '@nuxtjs/composition-api'

export default function useProductAdditionForm() {
    const productAdditionFormFields = ref([
        {
            id: 'name',
            type: 'input',
            label: 'Наименование товара',
            placeholder: 'Введите наименование товара',
            errorMessage: 'Поле обязательно',
            errorState:'hidden',
            valueType:'string',
            isRequired: true,
        },
        {
            id: 'description',
            type: 'textarea',
            label: 'Описание товара',
            placeholder: 'Введите описание товара',
            errorMessage: 'Поле обязательно',
            errorState:'hidden',
            valueType:'string',
            isRequired: false,
        },
        {
            id: 'imageLink',
            type: 'input',
            label: 'Ссылка на изображение',
            placeholder: 'Введите ссылку',
            errorMessage: 'Поле обязательно',
            errorState:'hidden',
            valueType:'url-link',
            isRequired: true,
        },
        {
            id: 'price',
            type: 'input',
            label: 'Цена товара',
            placeholder: 'Введите цену',
            errorMessage: 'Поле обязательно',
            errorState:'hidden',
            valueType:'number',
            isRequired: true,
            mask:{
                mask:Number,
                min:0,
                max:9999999999,
                thousandsSeparator: ' '
            }
        },
    ])
    return { productAdditionFormFields }
}
