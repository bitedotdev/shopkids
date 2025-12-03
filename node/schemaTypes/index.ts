import { defineField, defineType } from 'sanity'

const categoryType = defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre de la Categoría',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagen de portada',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})

const productType = defineType({
  name: 'product',
  title: 'Producto',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Producto',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
    }),
    defineField({
      name: 'price',
      title: 'Precio',
      type: 'number',
      validation: rule => rule.required().min(0),
    }),
    defineField({
      name: 'offer',
      title: 'Precio de Oferta (Opcional)',
      type: 'number',
    }),
    defineField({
      name: 'amount',
      title: 'Stock (Cantidad)',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      options: {
        list: [
          { title: 'Disponible', value: 'available' },
          { title: 'Agotado', value: 'out of stock' },
          { title: 'Descontinuado', value: 'discontinued' },
        ],
        layout: 'radio',
      },
      initialValue: 'available',
    }),
    defineField({
      name: 'gender',
      title: 'Género / Público',
      type: 'string',
      options: {
        list: [
          { title: 'Niño', value: 'boy' },
          { title: 'Niña', value: 'girl' },
          { title: 'Bebé', value: 'baby' },
          { title: 'Hombre (Papá)', value: 'man' },
          { title: 'Mujer (Mamá)', value: 'woman' },
          { title: 'Unisex (Ambos géneros)', value: 'unisex' },
          { title: 'No aplica (Objetos/Accesorios)', value: 'none' },
        ],
      },
      validation: rule => rule.required().warning('Selecciona a quién va dirigido para que los filtros funcionen mejor'),
    }),
    defineField({
      name: 'categories',
      title: 'Categorías',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'tags',
      title: 'Etiquetas (Tags)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'image',
      title: 'Imagen Principal',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'images',
      title: 'Galería de Imágenes adicionales',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
})

export const schemaTypes = [
  categoryType,
  productType,
]
