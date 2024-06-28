import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { PaymentService } from '../../services/payment.service';
import { CustomTableComponent } from '../../shared/custom-table/custom-table.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    CustomTableComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  private date = new Date();
  public list: any[] = [];
  public isLoading = false;
  public searchForm = new FormGroup({
    from: new FormControl(),
    to: new FormControl(),
  });

  constructor(private paymentService: PaymentService) {
    this.initializateSearchForm();
  }

  private initializateSearchForm(): void {
    const firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1)
      .toISOString()
      .split('T')[0];

    const lastDay = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0
    )
      .toISOString()
      .split('T')[0];

    this.searchForm.patchValue({
      from: firstDay,
      to: lastDay,
    });

    this.loadData();
  }

  public ngOnInit(): void {
    this.searchForm.valueChanges.subscribe((values) => {
      this.loadData();
    });
  }

  public loadData(): void {
    this.paymentService
      .findByCreatedAt(this.searchForm.value)
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
