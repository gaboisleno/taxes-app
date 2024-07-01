import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Supply } from '../../models/supply.interface';
import { SupplyService } from '../../services/supply.service';
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

  constructor(private supplyService: SupplyService) {}

  public ngOnInit(): void {
    this.loadPage();
  }

  public loadPage(): void {
    this.isLoading = true;
    this.supplyService.findAll().subscribe((response) => {
      this.list = response;
      this.isLoading = false;
    });
  }
}
