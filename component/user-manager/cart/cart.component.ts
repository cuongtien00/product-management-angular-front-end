import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../service/product-service.service";
import {Product} from "../../../model/product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  sumOfPrice = 0;
  products:Product[] =[];
  constructor(
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
     this.productService.getAllByUserId().subscribe(data =>{
       console.log(data);
       this.products = data;
       this.sumOfPrice = this.getSumOfPrice();
    })
  }
  getSumOfPrice(){
    let sum  = 0;
    this.products.forEach(product =>{
      sum += product.price;
      }
    )
    return sum;
  }
}
