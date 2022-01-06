import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../../service/product-service.service";
import {Product} from "../../../model/product";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Category} from "../../../model/category";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit,OnDestroy {
 public products: Product[] = [];
 private subscription: Subscription | undefined;
  displayedColumns: string[] = ['id', 'name', 'price', 'description','quantity','avatar', 'category'];
  // @ts-ignore
  dataSource: any;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
        if (this.subscription){
          this.subscription.unsubscribe();
        }
    }

  ngOnInit(): void {
    this.loadData();

  }

  loadData(){
    this.subscription = this.productService.getAll().subscribe(data =>{
      this.products = data;
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.dataSource.paginator = this.paginator;
    },error => {
      this.productService.handleError(error);
    });

  }

  deleteById(id:number) {
    this.productService.remove(id).subscribe(data => {
      this.loadData();
    }, error => {
      this.productService.handleError(error);
    });
  }

  // @ts-ignore
  uploadFile(event) {
    console.log(event);
  }
}
