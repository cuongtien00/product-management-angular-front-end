import {Category} from "./category";

export class Product {
  id:number;
  name:string;
  price:number;
  description:string;
  quantity:number;
  avatar: string;
  category: any;


  constructor(id: number, name: string, price: number, description: string, quantity: number, avatar: string, category: any) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.quantity = quantity;
    this.avatar = avatar;
    this.category = category;
  }
}
