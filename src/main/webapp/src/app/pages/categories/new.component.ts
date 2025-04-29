import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TextareaModule } from 'primeng/textarea';
import { CategoriesService } from '../services/categories.service';

@Component({
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
  ],
  selector: 'app-new-category',
  template: `
    <div class="d-flex justify-content-center">
      <div
        class="col-12 col-sm-8 col-md-4 card box-shadow p-3"
        *ngIf="!isLoading; else loading"
      >
        <form
          [formGroup]="form"
          (ngSubmit)="onSubmit()"
          class="d-flex flex-column gap-4 place-items-center"
        >
          <div class="fw-bold">
            {{ isNew ? 'New Category' : 'Edit Category' }}
          </div>

          <div class="d-flex flex-column gap-2">
            <input pInputText formControlName="name" placeholder="Name" />
          </div>

          <div class="d-flex flex-column gap-2">
            <input pInputText formControlName="url" placeholder="Url" />
          </div>

          <div class="d-flex flex-column gap-2">
            <textarea
              rows="5"
              cols="30"
              pTextarea
              formControlName="description"
              placeholder="Comments"
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
export class NewCategoryComponent implements OnInit {
  public form: FormGroup;
  public isNew = true;
  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private messageService: MessageService
  ) {
    if (this.router.url.includes('edit')) {
      this.isNew = false;
      this.getCategory();
    }

    this.form = this.fb.group({
      id: [''],
      name: [''],
      url: [''],
      description: [''],
    });
  }

  public ngOnInit(): void {}

  private getCategory(): void {
    this.isLoading = true;
    let id = this.router.url.split('/').pop();
    this.categoriesService
      .findById(id!)
      .subscribe({
        next: (response) => {
          this.form.patchValue({ ...response });
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
  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    let object = this.form.value;

    if (this.isNew) {
      delete object.id;
    }

    this.categoriesService
      .save(object)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Category saved',
          });
          this.router.navigate(['/pages/categories']);
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
}
