import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../../../model/product";
import {ProductService} from "../../../service/product-service.service";
import {ActivatedRoute, ParamMap, Params} from "@angular/router";
import {Category} from "../../../model/category";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit,OnDestroy {

  form: any = {};
  // @ts-ignore
  product: Product = {
  }
  paramId: number = 0;
  private subscriptionCate: Subscription|undefined;
  private subscriptionProduct: Subscription|undefined;
  public categories: Category[] =[]
  // @ts-ignore
  // category: Category = {};


  constructor(
    private productService: ProductService,
    private activeRouter: ActivatedRoute,
  ) {
    //lay id tu url ve
    activeRouter.params.subscribe((params: Params) =>{
      this.paramId = Number(params['id']);
     this.subscriptionProduct = this.productService.getById(this.paramId).subscribe(data => {
        // @ts-ignore
        this.product = data
      }, error => {
        this.productService.handleError(error);
      });
    });
  }

  ngOnInit(): void {
    this.loadData()
  }

  //Lay list cate tu api
  loadData() {
    this.subscriptionCate = this.productService.getAllCategories().subscribe(data => {
      this.categories = data;
    }, error => {
      this.productService.handleError(error);
    });
  }

  //xoa doi tuong subscription
  ngOnDestroy(): void {
    if (this.subscriptionCate){
      this.subscriptionCate.unsubscribe();
    }
    if (this.subscriptionProduct){
      this.subscriptionProduct.unsubscribe();
    }
  }




  update() {
    // this.product = new Product(this.form.id,this.form.name,this.form.price,this.form.description,this.form.quantity,this.form.avatar,this.form.category);
    // console.log(this.product);
    console.log(this.product);
    if (this.product)
    this.productService.update(this.product).subscribe(data => {
      console.log(data)
      alert('Product was updated!');
      this.product = data;
    },error => {
      this.productService.handleError(error);
    })
  }


  // @ts-ignore
  uploadFile(event) {
    this.product.avatar = event;
  }
}
