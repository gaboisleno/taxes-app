import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { SupplyService } from '../../services/supply.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CurrencyPipe, SpinnerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  public supplyList: any[] = [];
  public data: any[] = [];
  public isLoading = false;

  public selectedSupply = new FormControl('');

  constructor(
    private paymentService: PaymentService,
    private supplyService: SupplyService
  ) {}

  public ngOnInit(): void {
    this.getSupplies();
  }

  private getSupplies() {
    this.selectedSupply.disable();
    this.supplyService
      .findAll()
      .subscribe((res) => {
        this.supplyList = res || [];
      })
      .add(() => this.selectedSupply.enable());
  }

  public search(): void {
    if (this.selectedSupply && this.selectedSupply.value) {
      this.isLoading = true;
      this.paymentService
        .findBySupply(this.selectedSupply.value)
        .subscribe((res) => {
          this.data = res;
        })
        .add(() => (this.isLoading = false));
    }
  }
}
