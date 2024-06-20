import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { PaymentService } from '../../services/payment.service';
import { CustomTableComponent } from '../../shared/custom-table/custom-table.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterModule, CommonModule, CustomTableComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  public list: any[] = [];
  public isLoading = false;

  constructor(private paymentService: PaymentService) {}

  public ngOnInit(): void {
    this.isLoading = true;
    this.paymentService
      .findAll()
      .pipe(
        map((result: any[]) => {
          return result.map((x: any) => ({
            ...x,
            supplyName: x.supply.name || '',
          }));
        })
      )
      .subscribe((response) => {
        this.list = response;
        this.isLoading = false;
      });
  }
}
