interface CartItem {
    id: number
    shortName: string
    imageUrl: string
    price: number
    qty: number
  }
  
export default CartItem


export type CartModal = {
    orderitems: CartItem[]
    totalQuantity: number
    totalAmount: number
}