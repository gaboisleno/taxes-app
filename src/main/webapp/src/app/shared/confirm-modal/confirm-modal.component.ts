import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  standalone: true,
})
export class ConfirmModalComponent implements OnInit {
  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}
}
