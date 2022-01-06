import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../service/product-service.service";
import {Subscription} from "rxjs";
import {Route, Router} from "@angular/router";
import {Category} from "../../../model/category";
import {Product} from "../../../model/product";
import {log} from "util";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  cateId: number = 0;

  // rfCreateForm = new FormGroup({
  //   name: new FormControl(null, [Validators.required, Validators.minLength(7)]),
  //   price: new FormControl(null, [Validators.required]),
  //   description: new FormControl(null, [Validators.required]),
  //   categoryId : new FormControl(null),
  // });

  form: any = {}

  // @ts-ignore
  product: Product = {}

  // @ts-ignore
  // #product: Product = {}
  private subscriptionCate: Subscription | undefined;
  public categories: Category[] = [];
  // @ts-ignore
  cateId: number = 0;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.subscriptionCate = this.productService.getAllCategories().subscribe(data => {
      this.categories = data;
    }, error => {
      this.productService.handleError(error);
    });
  }

  onSubmit() {
    console.log('Form: ' +JSON.stringify(this.form));

this.cateId = this.form.category.id;
    // @ts-ignore
    this.product = {
     name : this.form.name,
     price : this.form.price,
      description: this.form.description,
      quantity: this.form.quantity,
      avatar: this.form.avatar,
      category: {
       id: this.form.category
      }

    }
    console.log('Product: ' + JSON.stringify(this.product));
    this.subscription = this.productService.save(this.product).subscribe(data => {
      console.log(data);
    }, error => {
      this.productService.handleError(error);
    });
    alert("Add new product is success!");
window.location.reload();    // this.router.navigate(['/products']);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  // @ts-ignore
  uploadFile(event) {
    this.form.avatar = event;
  }
}
