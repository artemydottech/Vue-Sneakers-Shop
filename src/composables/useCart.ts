import { ref, watch } from 'vue'

interface ICartItem {
  id: number
  title: string
  price: number
  imageUrl: string
}

const cart = ref<ICartItem[]>([])

export const useCart = () => {
  if (cart.value.length === 0) {
    const localCart = localStorage.getItem('cart')
    if (localCart) {
      cart.value = JSON.parse(localCart) as ICartItem[]
    }
  }

  const addToCart = (item: ICartItem) => {
    if (!cart.value.find((c) => c.id === item.id)) {
      cart.value.push({ ...item })
    }
  }

  const removeFromCart = (item: ICartItem) => {
    const index = cart.value.findIndex((c) => c.id === item.id)
    if (index !== -1) {
      cart.value.splice(index, 1)
    }
  }

  watch(
    cart,
    (newCart) => {
      localStorage.setItem('cart', JSON.stringify(newCart))
    },
    { deep: true }
  )

  return {
    cart,
    addToCart,
    removeFromCart
  }
}
