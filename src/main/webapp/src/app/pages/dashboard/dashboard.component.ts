import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { CategoriesService } from '../services/categories.service';
import { PaymentsService } from '../services/payments.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CurrencyPipe,
    ProgressSpinnerModule,
    SelectModule,
    SkeletonModule,
    TableModule,
  ],
  template: `
    <div class="d-flex mb-4">
      <h1 class="fs-2">Dashboard</h1>
    </div>
    <div>
      <div class="d-inline-flex flex-column">
        <label for="category">
          <small>Category</small>
        </label>
        <p-select
          id="category"
          [formControl]="selectedCategory"
          [options]="categoryList"
          optionLabel="name"
          optionValue="id"
          placeholder="Select a category"
          (onChange)="search()"
        />
      </div>
    </div>
    <div>
      <p-table [value]="isLoading ? skeletons : data">
        <ng-template pTemplate="header">
          <tr>
            <th>Date</th>
            <th>Service</th>
            <th>Total</th>
            <th>Comments</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-item>
          @if (isLoading) {
          <tr>
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
          </tr>
          }
        </ng-template>
      </p-table>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  public categoryList: any[] = [];
  public data: any[] = [];
  public isLoading: boolean = false;
  public selectedCategory: FormControl;
  public skeletons = Array(5).fill({});

  constructor(
    private categoriesService: CategoriesService,
    private paymentsService: PaymentsService
  ) {
    this.selectedCategory = new FormControl();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  public getCategories(): void {
    this.isLoading = true;
    this.categoriesService
      .findAll()
      .subscribe({
        next: (response: any) => {
          this.categoryList = response;
        },
        error: (error) => {
          console.log(error);
        },
      })
      .add(() => {
        this.isLoading = false;
      });
  }

  public search(): void {
    this.isLoading = true;

    if (this.selectedCategory && this.selectedCategory.value) {
      this.paymentsService
        .findByCategory(this.selectedCategory.value)
        .subscribe({
          next: (response: any) => {
            this.data = response;
          },
          error: (error) => {
            console.log(error);
          },
        })
        .add(() => {
          this.isLoading = false;
        });
    }
  }
}
