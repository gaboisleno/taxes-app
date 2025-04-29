import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { CategoriesService } from '../services/categories.service';
import { PaymentsService } from '../services/payments.service';

@Component({
  selector: 'app-new-payment',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectModule,
    DatePickerModule,
    TextareaModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
  template: `
    <div class="d-flex justify-content-center">
      <div
        class="col-12 col-sm-8 col-md-4 card box-shadow p-3"
        *ngIf="!isLoading; else loading"
      >
        <form
          [formGroup]="form"
          class="d-flex flex-column gap-4 place-items-center"
          (ngSubmit)="onSubmit()"
        >
          <div class="fw-bold">
            {{ isNew ? 'New Payment' : 'Edit Payment' }}
          </div>

          <div class="d-flex flex-column gap-2">
            <label for="createdAt">
              <small>Date</small>
            </label>
            <p-datepicker
              id="createdAt"
              formControlName="createdAt"
              showIcon
              iconDisplay="input"
              placeholder="Date"
            />
          </div>

          <div class="d-flex flex-column gap-2">
            <label for="category">
              <small>Category</small>
            </label>
            <p-select
              id="category"
              formControlName="supply"
              [options]="categories"
              optionLabel="name"
              optionValue="id"
              placeholder="Select a category"
            />
          </div>

          <div class="d-flex flex-column gap-2">
            <label for="total">
              <small>Total</small>
            </label>
            <input
              pInputText
              id="total"
              formControlName="total"
              autocomplete="off"
              placeholder="Total"
            />
          </div>

          <div class="d-flex flex-column gap-2">
            <label for="description">
              <small>Description</small>
            </label>
            <textarea
              rows="5"
              cols="30"
              pTextarea
              formControlName="description"
              placeholder="Description"
            ></textarea>
          </div>

          <div class="d-flex justify-content-end">
            <p-button type="submit" label="Submit" />
          </div>
        </form>
      </div>

      <ng-template #loading>
        <p-progress-spinner
          strokeWidth="8"
          ariaLabel="Loading"
          animationDuration=".5s"
        />
      </ng-template>
    </div>
  `,
})
export class NewPaymentComponent implements OnInit {
  public isLoading = 0;
  public isNew = true;
  public form: FormGroup;
  public categories: any[] = [];

  constructor(
    private paymentService: PaymentsService,
    private router: Router,
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService
  ) {
    if (this.router.url.includes('edit')) {
      this.isNew = false;
      this.getPayment();
    }

    this.form = this.fb.group({
      id: [null],
      createdAt: [new Date(), [Validators.required]],
      supply: [null, [Validators.required]],
      total: [0, [Validators.required, Validators.min(0)]],
      description: [null],
    });
  }

  public ngOnInit(): void {
    this.loadCategories();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading += 1;

    let object = this.form.value;
    object.supply = { id: object.supply };

    if (this.isNew) {
      delete object.id;
    }

    this.paymentService
      .save(object)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Category saved',
          });
          this.router.navigate(['/pages/payments']);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
          });
        },
      })
      .add(() => (this.isLoading -= 1));
  }

  private getPayment(): void {
    this.isLoading += 1;

    let id = this.router.url.split('/').pop();
    this.paymentService
      .findById(id!)
      .subscribe({
        next: (response) => {
          const parts = response.createdAt.split('-'); // valor = "2025-04-01"
          const date = new Date(parts[0], parts[1] - 1, parts[2]); // año, mes (0-indexed), día

          this.form.patchValue({
            ...response,
            createdAt: new Date(date),
            supply: response.supply.id,
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
          });
        },
      })
      .add(() => (this.isLoading -= 1));
  }

  public loadCategories(): void {
    this.isLoading += 1;
    this.categoriesService
      .findAll()
      .subscribe({
        next: (response) => {
          this.categories = response;
        },
      })
      .add(() => (this.isLoading -= 1));
  }

  public handleUpload(event: any): void {
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      const fileType = base64String.split(',')[0];
      const fileData = base64String.split(',')[1];
      this.form.patchValue({
        fileType,
        fileData,
      });
    };
    reader.readAsDataURL(file);
  }

  public downloadFile(): void {
    const fileType = this.form.get('fileType')?.value;
    const fileData = this.form.get('fileData')?.value;
    const blob = new Blob([fileData], { type: fileType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.click();
  }

  public removeFile(): void {
    this.form.patchValue({
      fileType: null,
      fileData: null,
    });
  }
}
