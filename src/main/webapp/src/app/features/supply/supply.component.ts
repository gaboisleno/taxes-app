import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Supply } from '../../models/supply.interface';
import { SupplyService } from '../../services/supply.service';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { CustomTableComponent } from '../../shared/custom-table/custom-table.component';

@Component({
  selector: 'app-supply',
  standalone: true,
  imports: [CommonModule, RouterModule, CustomTableComponent],
  templateUrl: './supply.component.html',
  styleUrl: './supply.component.css',
})
export class SupplyComponent implements OnInit {
  public list: Supply[] = [];
  public isLoading = false;
  public tableInfo = [
    { field: 'name', label: 'Nombre' },
    { field: 'description', label: 'Detalle' },
  ];

  constructor(private supplyService: SupplyService, private modal: NgbModal) {}

  public ngOnInit(): void {
    this.loadPage();
  }

  public loadPage(): void {
    this.isLoading = true;
    this.supplyService
      .findAll()
      .subscribe((response) => {
        this.list = response;
      })
      .add(() => (this.isLoading = false));
  }

  public onEvent(event: any) {
    switch (event.key) {
      case 'delete':
        const modalRef = this.modal.open(ConfirmModalComponent, {
          size: 'lg',
          centered: true,
        });

        modalRef.result.then(
          (res) => {
            this.supplyService.delete(event.data).subscribe(() => {
              this.loadPage();
            });
          },
          () => {}
        );

        break;

      case 'view':
        break;
    }
  }
}
