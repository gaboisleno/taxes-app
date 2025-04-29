import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageModule } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { PaymentsService } from '../services/payments.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    TableModule,
    SkeletonModule,
    DatePickerModule,
    FormsModule,
    CurrencyPipe,
    MessageModule,
    ButtonModule,
    RouterModule,
  ],
  template: `
    <div class="d-flex flex-column flex-md-row justify-content-between mb-4">
      <h1 class="fs-2">Payments</h1>
      <p-button label="New Payment" routerLink="new">
        <svg
          class="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h14m-7 7V5"
          />
        </svg>
      </p-button>
    </div>

    <div class="d-flex flex-column flex-md-row justify-content-between mb-4">
      <div class="d-flex flex-column gap-2">
        <small for="dates">Range date filter</small>
        <p-datepicker
          id="dates"
          [(ngModel)]="rangeDates"
          size="small"
          placeholder="Range Dates"
          showIcon
          iconDisplay="input"
          selectionMode="range"
          (ngModelChange)="findPayments()"
        />
      </div>
      <div class="alert alert-success text-center font-weight-bold m-0">
        Total {{ total | currency }}
      </div>
    </div>

    <div class="bg-white p-1 rounded-3">
      <p-table [value]="isLoading ? skeletons : items">
        <ng-template pTemplate="header">
          <tr>
            <th>Date</th>
            <th>Service</th>
            <th>Total</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-item>
          @if (isLoading) {
          <tr>
            <td><p-skeleton /></td>
            <td><p-skeleton /></td>
            <td><p-skeleton /></td>
            <td><p-skeleton /></td>
            <td><p-skeleton /></td>
          </tr>
          } @else {
          <tr>
            <td>{{ item.createdAt }}</td>
            <td>
              <strong>{{ item.supply.name }}</strong>
            </td>
            <td>{{ item.total | currency }}</td>
            <td>{{ item.description }}</td>
            <td>
              <div class="d-flex flex-row gap-2">
                <p-button severity="danger">
                  <svg
                    aria-hidden="true"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                    />
                  </svg>
                </p-button>
                <p-button severity="info" routerLink="edit/{{ item.id }}">
                  <svg
                    aria-hidden="true"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </p-button>
              </div>
            </td>
          </tr>
          }
        </ng-template>
      </p-table>
    </div>
  `,
})
export class PaymentsComponent implements OnInit {
  public isLoading = false;
  public items: any[] = [];
  public skeletons = Array(5).fill({});
  public rangeDates: Date[] | undefined;
  public total = 0;

  constructor(
    private paymentsService: PaymentsService,
    private messageService: MessageService
  ) {
    this.initSearchForm();
    this.findPayments();
  }

  ngOnInit(): void {}

  public findPayments(): void {
    this.isLoading = true;
    this.paymentsService;

    const from = this.rangeDates?.[0]
      ? this.rangeDates?.[0].toISOString().split('T')[0]
      : null;
    const to = this.rangeDates?.[1]
      ? this.rangeDates?.[1].toISOString().split('T')[0]
      : null;

    if (!from || !to) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Select a valid date range',
      });
      return;
    }

    this.paymentsService
      .findBy({ from, to })
      .subscribe({
        next: (response) => {
          this.items = response;
          this.total = response.reduce(
            (acc, curr) => acc + Number(curr.total),
            0
          );
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
          });
        },
      })
      .add(() => (this.isLoading = false));
  }

  public removePayment(id: string): void {}

  public initSearchForm(): void {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.rangeDates = [firstDay, lastDay];
  }
}
