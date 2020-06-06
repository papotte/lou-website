export class OrderForm {
  name: string
  telephone: string
  address: string
  quantity: number
  total: number
  message: string
  acceptCondition: boolean
  productId: string

  constructor(
    name: string = '',
    telephone: string = '',
    address: string = '',
    quantity: number = 1,
    total: number = 0,
    message: string = '',
    acceptCondition: boolean = false,
    productId: string = ''
  ) {
    this.name = name
    this.telephone = telephone
    this.address = address
    this.quantity = quantity
    this.total = total
    this.message = message
    this.acceptCondition = acceptCondition
    this.productId = productId
  }
}
