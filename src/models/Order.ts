import CartItem from './CartItem';

type ConstructorData = {
  id: string;
  cartItems: CartItem[];
  price: number;
  date: Date;
};

class Order {
  public id: string;
  public cartItems: CartItem[];
  public price: number;
  public date: Date;

  constructor({ id, cartItems, price, date }: ConstructorData) {
    this.id = id;
    this.cartItems = cartItems;
    this.price = price;
    this.date = date;
  }
}

export default Order;
