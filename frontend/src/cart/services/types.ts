interface CartItem {
    id: number
    shortName: string
    imageUrl: string
    product: number
    price: number
    qty: number
  }
  
export default CartItem


export type CartModel = {
    orderitems: CartItem[]
    totalQuantity: number
    totalAmount: number
}

export interface AddToCartRequest {
	id: number;
	quantity: number;	
	set_qty?: boolean;	
}
export interface PayOrderRequest {
	name: string
  emailAddress: string
  phoneNumber: string
  address: string
  zipcode: string
  city: string
  country: string
  
}
