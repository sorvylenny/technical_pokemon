import { StorageService } from '@/app/core/services/storage/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HomePaths } from '../../../../core/utils/paths';
import { NgStorageMethod } from '@/app/core/enum/ngStorage/ngStorage.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  user: boolean = true;
  quantity: number = 0;
  fullName: string = " ";
  role: boolean = false;
  constructor(
    private _storageService: StorageService,
    private _router: Router
  ) { }
  async ngOnInit() {
    const existToken = await this._storageService.hasStorage(NgStorageMethod.TOKEN);
    if (!existToken) {
      this.user = false;
    }
    this.checkUser()
    this.getNotify()
    this._storageService.watchStorage(NgStorageMethod.USER).subscribe((res: any) => {
      if (res && res.fullName) {
        this.fullName = res.fullName;
        this.role = res.role === 'admin'
      } else {
        this.fullName = "";
        this.role = false;
      }
    })
  }

  async getNotify() {
    this._storageService.watchStorage(NgStorageMethod.POKEMON).subscribe((res: any) => {
      if (res) {
        this.quantity = res.length
      } else {
        this.quantity = 0
      }
    })
  }
  checkoutGoTo() {
    this._router.navigate([HomePaths.CHECKOUT])
  }

  loginToGo() {
    this._router.navigate([HomePaths.LOGIN])
  }

  logout() {
    this._storageService.clearAllStorage();
    this._router.navigate([HomePaths.HOME]);
  }
  goToDashboard() {
    this._router.navigate([`${HomePaths.ADMIN}/${HomePaths.DASHBOARD}`]);
  }

  async checkUser() {
    this._storageService.watchStorage(NgStorageMethod.TOKEN).subscribe((res: any) => {
      if (res) {
        this.user = true
      } else {
        this.user = false
      }
    })
  }
}
