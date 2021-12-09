export default [
    {
        id:'byPrice',
        name: 'По цене',
        sortingByValueId: 'price',
        sortValueType:'number',
        sortTypes: ['inc', 'dec'],
    },
    {
        id:'byName',
        name: 'По наименованию',
        sortingByValueId: 'name',
        sortValueType:'string',
        sortTypes: ['inc', 'dec'],
    },
    {
        id:'byTimestamp',
        name:'По умолчанию',
        sortingByValueId:'createdAt',
        sortValueType:'number',
        sortTypes:['dec'],
        isDefault:true
    }
]
