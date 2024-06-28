import { CommonModule, JsonPipe } from '@angular/common';
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
    JsonPipe,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  public list: any[] = [];
  public isLoading = false;
  public searchForm = new FormGroup({
    from: new FormControl(),
    to: new FormControl(),
  });

  constructor(private paymentService: PaymentService) {
    this.loadData();
  }

  ngOnInit(): void {
    this.searchForm.valueChanges.subscribe((values) => {
       
        this.paymentService
          .findByCreatedAt(values.from, values.to)
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
      
    });
  }

  public loadData(): void {
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
