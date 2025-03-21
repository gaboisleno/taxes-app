import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { PaymentService } from '../../services/payment.service';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { CustomTableComponent } from '../../shared/custom-table/custom-table.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    CustomTableComponent,
    ReactiveFormsModule,
    CurrencyPipe,
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

  public tableInfo = [
    { field: 'createdAt', label: 'Fecha' },
    { field: 'supplyName', label: 'Servicio' },
    { field: 'description', label: 'Detalle' },
    { field: 'total', label: 'monto' },
  ];

  constructor(private paymentService: PaymentService, private modal: NgbModal) {
    this.initializateSearchForm();
  }

  public ngOnInit(): void {
    this.searchForm.valueChanges.subscribe(() => {
      this.loadData();
    });
  }

  public initializateSearchForm(): void {
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

  public loadData(): void {
    this.isLoading = true;
    this.paymentService
      .findBy(this.searchForm.value)
      .pipe(
        map((result: any[]) => {
          return result.map((x: any) => ({
            ...x,
            supplyName: x.supply.name || '',
          }));
        })
      )
      .subscribe({
        next: (response) => {
          this.list = response;
        },
      })
      .add(() => (this.isLoading = false));
  }

  public getTotal(): number {
    let value = 0;
    this.list.forEach((x) => (value += parseInt(x.total, 10)));
    return value;
  }

  public onEvent(event: any) {
    switch (event.key) {
      case 'delete':
        this.openDeleteDialog(event);
        break;

      case 'view':
        break;
    }
  }

  public openDeleteDialog(event: any): void {
    const modalRef = this.modal.open(ConfirmModalComponent, {
      size: 'lg',
      centered: true,
    });

    modalRef.result.then(
      () => {
        this.paymentService.delete(event.data).subscribe(() => {
          this.loadData();
        });
      },
      () => {}
    );
  }
}
