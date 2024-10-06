import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '@/app/core/services/storage/storage.service';
import { NgStorageMethod } from '@/app/core/enum/ngStorage/ngStorage.enum';
import { Router } from '@angular/router';
import { Payment } from '@/app/core/interfaces/payment/payment';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {

  @Input() totalPrice!: number;
  @Output() paymentSuccess = new EventEmitter<boolean>();
  progressPercentage: number = 0;
  isProcessing: boolean = false;
  cardHolderName: string = "";
  cardNumber: string = "";
  expiryDate: string = "";
  cvv: string = "";
  transactionSuccess: boolean = false;
  constructor(
    private fb: FormBuilder,
    private _storageService: StorageService,
    private _router: Router
  ) { }


  paymentForm = this.fb.group({
    fullName: ['', Validators.required],
    cardNumber: ['', Validators.required],
    expiryDate: ['', Validators.required],
    cvv: ['', Validators.required],
  });

  ngOnInit() {
    this.paymentForm.valueChanges.subscribe((values) => {
      this.updateCard(values);
    });
  }


  updateCard(values: Partial<Payment>): void {
    this.cardHolderName = values.fullName ?? 'PAVLO MATVIIENKO';
    this.cardNumber = values.cardNumber ?? 'XXXX XXXX XXXX XXXX';
    this.expiryDate = values.expiryDate ?? 'XX/XX';
    this.cvv = values.cvv ?? 'XXX';
  }



  async closeDialog() {
    this._router.navigate(['/']);
  }

  makeAPayment() {
    this.transactionSuccess = false;
    this.isProcessing = true;
    this.progressPercentage = 0;


    const interval = setInterval(() => {

      if (this.progressPercentage < 100) {
        this.progressPercentage += 20;
      } else {

        clearInterval(interval);
        this.isProcessing = false;
        this.transactionSuccess = true;
        this.paymentSuccess.emit(true);
        this.paymentForm.reset();
        this._storageService.deleteStorage(NgStorageMethod.POKEMON);
      }
    }, 500);
  }

  formatCardNumber(event: any): void {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length >= 16) {
      input = input.substring(0, 16);
    }
    const formatted = input.match(/.{1,4}/g)?.join(' ') || '';
    this.paymentForm.get('cardNumber')?.setValue(formatted, { emitEvent: false });
  }

  formatExpiryDate(event: any): void {
    let input = event.target.value.replace(/\D/g, '');

    if (input.length > 4) {
      input = input.substring(0, 4);
    }


    let formatted = input.replace(/(\d{2})(\d{0,2})/, '$1/$2');


    if (input.length === 4) {
      const month = parseInt(formatted.substring(0, 2), 10);
      const year = parseInt(formatted.substring(3), 10);

      if (month > 12) {
        formatted = '12/' + formatted.substring(3);
      }

      const currentYear = new Date().getFullYear() % 100;
      if (year < currentYear + 1) {
        formatted = formatted.substring(0, 3) + (currentYear + 1);
      }
    }


    this.paymentForm.get('expiryDate')?.setValue(formatted, { emitEvent: false });
  }

}

