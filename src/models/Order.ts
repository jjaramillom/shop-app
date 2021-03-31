import CartItem from './CartItem';

export default interface Order {
  id: string;
  cartItems: CartItem[];
  price: number;
  date: Date;
}
