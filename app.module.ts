import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './component/product/product-list/product-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ProductService} from "./service/product-service.service";
import { ProductCreateComponent } from './component/product/product-create/product-create.component';
import { LoginComponent } from './component/user-manager/login/login.component';
import { ProductViewComponent } from './component/product/product-view/product-view.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './component/user-manager/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { UserAccountComponent } from './component/user-manager/user-account/user-account.component';
import {NavBarModule} from "./shared/navbar";
import {FooterModule} from "./shared/footer";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment.prod";
import { UploadFirebaseComponent } from './component/upload-firebase/upload-firebase.component';
import {AuthInterceptor, httpInterceptorProvider} from "./security/auth.interceptor";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {RouterModule} from "@angular/router";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import { CartComponent } from './component/user-manager/cart/cart.component';
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCreateComponent,
    LoginComponent,
    ProductViewComponent,
    RegisterComponent,
    UserAccountComponent,
    UploadFirebaseComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NavBarModule,
    FooterModule,
    //import cac module de upload file
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatListModule,
    MatSelectModule
  ],
  providers: [ProductService,
   httpInterceptorProvider,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
