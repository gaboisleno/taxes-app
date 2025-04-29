import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  imports: [RouterModule, TableModule, SkeletonModule, ButtonModule],
  standalone: true,
  template: `
    <div class="d-flex flex-row justify-content-between mb-4">
      <h1 class="fs-2">Categories</h1>
      <p-button label="New Category" routerLink="new">
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

    <div class="bg-white p-1 rounded-3">
      <p-table [value]="isLoading ? skeletons : items">
        <ng-template pTemplate="header">
          <tr>
            <th>Name</th>
            <th>Url</th>
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
          </tr>
          } @else {
          <tr>
            <td>{{ item.name }}</td>
            <td>
              <a
                href="{{ item.url }}"
                target="_blank"
                rel="noopener noreferrer"
                >{{ item.url }}</a
              >
            </td>
            <td>{{ item.description }}</td>
            <td></td>
            <td>
              <div class="d-flex flex-row gap-2">
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
export class CategoriesComponent implements OnInit {
  public isLoading = false;
  public items: any[] = [];
  public skeletons = Array(5).fill({});
  constructor(
    private categoriesService: CategoriesService,
    private messagesService: MessageService
  ) {}

  ngOnInit(): void {
    this.findCategories();
  }

  private findCategories(): void {
    this.isLoading = true;
    this.categoriesService
      .findAll()
      .subscribe({
        next: (response) => {
          this.items = response;
        },
        error: (error) => {
          this.messagesService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
          });
        },
      })
      .add(() => (this.isLoading = false));
  }
}
