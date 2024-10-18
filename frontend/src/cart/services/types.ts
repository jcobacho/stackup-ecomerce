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

export interface OrderItem {
  id: number
  shortName: string
  imageUrl: string
  product: number
  price: number
  qty: number
}

export type OrderModel = {
  id: number
  orderitems: OrderItem[]
  shippingInfo: string
  client: string
  totalAmount: number
  paid: boolean
}

export type AllOrdersResponse = {
	count: number
    previous: number | null
    next: number | null
    results: OrderModel[]
};
export interface AddToCartRequest {
	id: number;
	quantity: number;	
	set_qty?: boolean;	
}
export interface PayOrderRequest {
	name: string
  emailAddress: string
  address: string
  zipcode: string
  city: string
  country: string
  
}
