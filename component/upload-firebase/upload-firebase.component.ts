import {Component, OnInit, Output,EventEmitter} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {TokenService} from "../../service/token.service";
import {ChangeAvatar} from "../../model/ChangeAvatar";
import {AuthService} from "../../service/auth.service";
import {ProductService} from "../../service/product-service.service";
import {AuthInterceptor} from "../../security/auth.interceptor";


@Component({
  selector: 'app-upload-firebase',
  templateUrl: './upload-firebase.component.html',
  styleUrls: ['./upload-firebase.component.css']
})
export class UploadFirebaseComponent implements OnInit {
  selectedImage: any = null;
  imageUrl: any = null;
  check: boolean = false;
  @Output()
  giveUrl = new EventEmitter();

  constructor(
    private storage: AngularFireStorage,
    private tokenService: TokenService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  //uploadfile len fire base va nhan url tra ve
  uploadFile() {
    // @ts-ignore
    if (this.selectedImage != null) {

      this.check = true;
      const filePath = `${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges()
        .pipe(finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.check = false;
            this.imageUrl = url;
            this.giveUrl.emit(url)
            // this.tokenService.setAvatar(url);
            // let changeAvatar: ChangeAvatar = new ChangeAvatar(url);
            // console.log('changeAvatar:' + JSON.stringify(changeAvatar));
            // this.authService.updateAvatar(changeAvatar).subscribe(data => {
            //   console.log('data: ' + JSON.stringify(data));
            // });
            // window.location.reload();
          })
        })).subscribe();


    }
  }

  //Show preview
  // @ts-ignore
  showPreview(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imageUrl = event.target.result;
      reader.readAsDataURL(event.target.files[0])
      this.selectedImage = event.target.files[0];
      this.uploadFile();
    }
    //  truong hop nhan choosefile nhung k chon anh va cancel
    else {
      this.selectedImage = null;

    }
  }
}

