
import { NgStorageMethod } from '@/app/core/enum/ngStorage/ngStorage.enum';
import { DailySales, MonthlySales } from '@/app/core/interfaces/checkout/dashboard';
import { StorageService } from '@/app/core/services/storage/storage.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from '../../../core/services/dashboard/checkout.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  fullName: string = '';
  salesByDay!: DailySales | null | undefined;
  salesMonth!: MonthlySales | null | undefined;
  constructor(
    private _storageService: StorageService,
    private DashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.getsalesByDay();
    this.getsalesMonth();
    this._storageService.watchStorage(NgStorageMethod.USER).subscribe((res: any) => {
      if (res && res.fullName) {
        this.fullName = res.fullName;
      } else {
        this.fullName = "";
      }
    })
  }

  async getsalesByDay() {
    this.salesByDay = await this.DashboardService.salesByDay() as DailySales;
  }
  async getsalesMonth() {
    this.salesMonth = await this.DashboardService.salesMonth() as MonthlySales;
  }

}
