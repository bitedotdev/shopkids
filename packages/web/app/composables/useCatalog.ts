export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: any
}

export interface Category {
  _id: string
  name: string
  image?: SanityImage
}

export interface Product {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  price: number
  offer?: number
  amount: number
  status: 'available' | 'out of stock' | 'discontinued'
  gender: 'boy' | 'girl' | 'baby' | 'man' | 'woman' | 'unisex' | 'none'
  categories?: Category[]
  tags?: string[]
  image: SanityImage
  images?: SanityImage[]
  imageAssetId?: string
  uiPrice?: string
  badge?: string
}

export interface FilterState {
  categories: string[]
  genders: string[]
  maxPrice: number | null
}

export const GENDER_OPTIONS = [
  { label: 'Niño', value: 'boy' },
  { label: 'Niña', value: 'girl' },
  { label: 'Bebé', value: 'baby' },
  { label: 'Hombre (Papá)', value: 'man' },
  { label: 'Mujer (Mamá)', value: 'woman' },
  { label: 'Unisex (Ambos géneros)', value: 'unisex' },
  { label: 'No aplica', value: 'none' },
]

export function useCatalog() {
  const sanity = useSanity()

  const filters = useState<FilterState>('catalog-filters', () => ({
    categories: [],
    genders: [],
    maxPrice: null,
  }))

  const { data: categories } = useAsyncData('catalog-categories', () =>
    sanity.fetch<{ _id: string, name: string, count: number }[]>(
      groq`*[_type == "category"] | order(name asc) {
        _id,
        name,
        "count": count(*[_type == "product" && references(^._id)])
      }`,
    ))

  const productsQuery = computed(() => {
    let query = `*[_type == "product" && status != "discontinued"`

    if (filters.value.categories.length > 0) {
      query += ` && count((categories[]->_id)[@ in $categoryIds]) > 0`
    }

    query += `] | order(_createdAt desc) [0...100] { 
      _id, name, slug, price, offer, status, gender,
      "categories": categories[]->name, 
      image, images
    }`
    return query
  })

  const { data: rawProducts, status } = useAsyncData<Product[]>(
    'catalog-products',
    () => sanity.fetch(productsQuery.value, { categoryIds: filters.value.categories }),
    { watch: [productsQuery] },
  )

  const priceStats = computed(() => {
    if (!rawProducts.value?.length)
      return { min: 0, max: 500000 }

    const prices = rawProducts.value.map(p => p.offer || p.price)
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    }
  })

  const products = computed(() => {
    if (!rawProducts.value)
      return []

    const mapped = rawProducts.value.map((p) => {
      let badge = null
      if (p.offer && p.offer < p.price) {
        const discount = Math.round(((p.price - p.offer) / p.price) * 100)
        badge = `-${discount}%`
      }
      else if (p.status === 'out of stock') {
        badge = 'Agotado'
      }

      return {
        id: p._id,
        name: p.name,
        price: p.offer || p.price,
        rawPrice: p.offer || p.price,
        gender: p.gender,
        category: p.categories?.[0] || 'General',
        imageAssetId: p.image?.asset?._ref || null,
        badge,
        slug: p.slug.current,
      }
    })

    return mapped.filter((p) => {
      if (filters.value.genders.length > 0 && !filters.value.genders.includes(p.gender)) {
        return false
      }

      if (filters.value.maxPrice !== null && p.rawPrice > filters.value.maxPrice) {
        return false
      }
      return true
    })
  })

  const clearFilters = () => {
    filters.value.categories = []
    filters.value.genders = []
    filters.value.maxPrice = null
  }

  return {
    products,
    categories,
    filters,
    status,
    priceStats,
    clearFilters,
  }
}
