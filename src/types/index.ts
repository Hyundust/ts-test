export interface User {

  id:string,
  email:string,
  username:string,
  token?:string,
  role?:"admin" | "customer"
}


export interface Product{

    id:string,
    title:string,
    price:number,
    category:string,
    inStock:boolean
};


export interface CartItem{
    productId:string,
    quantity:number,
    unitPrice:number

};

export interface Cart{

    id:string,
    userId:string,
    items:CartItem[],
    totalPrice:number

};

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';




export interface Order{

id:string,
userId:string,
items:CartItem[],
status:OrderStatus,
createdAt:string

}

export interface APIResponse<T>{
    status: number,
    data?: T | undefined,
    error?:string | undefined,
    headers:Headers
}
