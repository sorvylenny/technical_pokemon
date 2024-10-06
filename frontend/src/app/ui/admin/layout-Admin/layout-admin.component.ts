import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '@/app/core/services/storage/storage.service';
import { HomePaths } from '../../../core/utils/paths';

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrl: './layout-admin.component.scss'
})
export class LayoutAdminComponent {
  constructor(private router: Router, private _storageService: StorageService) { }
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);


  logOut() {
    this._storageService.clearAllStorage();
    this.router.navigate([HomePaths.HOME])
  }


}
