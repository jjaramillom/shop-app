type ConstructorData = {
  quantity: number;
  title: string;
  price: number;
};

class CartItem {
  public quantity: number;
  public title: string;
  public price: number;

  constructor({ quantity, title, price }: ConstructorData) {
    this.quantity = quantity;
    this.title = title;
    this.price = price;
  }
}

export default CartItem;
