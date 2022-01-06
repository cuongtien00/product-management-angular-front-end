import {Injectable} from '@angular/core';
import {Product} from "../model/product";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../model/category";
import {FormControl} from "@angular/forms";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  public API = 'http://localhost:8080/products';
  public cateAPI= 'http://localhost:8080/categories';

  constructor(
    public http: HttpClient,
    private tokenService:TokenService
  ) {
  }
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.cateAPI);
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API)
  }
  // @ts-ignore
  getAllByUserId():Observable<any>{
    let id = this.tokenService.getUserId();
    if (id){
      return this.http.get(this.API+'/user/'+id);
    }

  }
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API}/${id}`);
  }

  handleError(err: any){
    if (err.error instanceof Error) {
      console.log(`Client-side error: ${err.error.message}`);
    } else {
      console.log(`Server-side error: ${err.status} - ${err.error.value}`);
    }
  }

  save(product: { price: number; name: string; description: string; category: { id: number } }): Observable<Product> {
    return this.http.post<Product>(this.API, product)
  }
  update(product: Product): Observable<Product> {
    return this.http.put<Product>(this.API,product);
  }
  remove(id: number): Observable<any>{
    console.log(`${this.API}/${id}`);
    return this.http.delete(`${this.API}/${id}`);
  }
}
