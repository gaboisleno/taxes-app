import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NamePipe } from '../../core/pipes/test.pipe';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [SpinnerComponent, CommonModule, RouterModule, NamePipe],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.css',
})
export class CustomTableComponent {
  @Input() data: any[] = [];
  @Input() model: string = '';
  @Input() isLoading = false;
  @Input() showPagination = false;
  @Input() mapTable: any[] = [];

  @Output() event = new EventEmitter();

  constructor() {}

  public emitEvent(key: string, data: any) {
    this.event.emit({ key, data });
  }
}
