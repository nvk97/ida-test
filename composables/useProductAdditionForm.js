import { ref } from '@nuxtjs/composition-api'

export default function useProductAdditionForm() {
    const productAdditionFormFields = ref([
        {
            id: 'name',
            type: 'input',
            label: 'Наименование товара',
            placeholder: 'Введите наименование товара',
            valueType:'string',
            isRequired: true,
        },
        {
            id: 'description',
            type: 'textarea',
            label: 'Описание товара',
            placeholder: 'Введите описание товара',
            valueType:'string',
            isRequired: false,
        },
        {
            id: 'imageLink',
            type: 'input',
            label: 'Ссылка на изображение',
            placeholder: 'Введите ссылку',
            valueType:'url-link',
            isRequired: true,
        },
        {
            id: 'price',
            type: 'input',
            label: 'Цена товара',
            placeholder: 'Введите цену',
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
