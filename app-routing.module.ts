import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductListComponent} from "./component/product/product-list/product-list.component";
import {ProductCreateComponent} from "./component/product/product-create/product-create.component";
import {ProductViewComponent} from "./component/product/product-view/product-view.component";
import {LoginComponent} from "./component/user-manager/login/login.component";
import {AuthGuard} from "./service/guard/auth.guard";
import {RegisterComponent} from "./component/user-manager/register/register.component";
import {UserAccountComponent} from "./component/user-manager/user-account/user-account.component";
import {UploadFirebaseComponent} from "./component/upload-firebase/upload-firebase.component";
import {CartComponent} from "./component/user-manager/cart/cart.component";

const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'product/create',
    component: ProductCreateComponent,
    canActivate:[AuthGuard]
  },
  {path: 'products/:id',
    component: ProductViewComponent,
  canActivate:[AuthGuard]},
  {path: 'login',
    component: LoginComponent},
  {path: 'register',
    component: RegisterComponent,
  },
  {path: 'user-account',
    component: UserAccountComponent,
    canActivate: [AuthGuard]
  },
  {path: 'cart',
    component: CartComponent,
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
