import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplyService } from '../../../services/supply.service';
import { ControlErrorComponent } from '../../../shared/control-error/control-error.component';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';

@Component({
  selector: 'app-supply-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ControlErrorComponent,
    SpinnerComponent,
  ],
  templateUrl: './supply-edit.component.html',
  styleUrl: './supply-edit.component.css',
})
export class SupplyEditComponent {
  isNew = false;
  isLoading = false;

  supplyForm = new FormGroup({
    id: new FormControl(null, []),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.maxLength(255)]),
  });

  constructor(
    private supplyService: SupplyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.route.snapshot.toString().includes('new')) {
      this.isNew = true;
    } else {
      this.loadData();
    }
  }

  public submit(): void {
    this.supplyService.save(this.supplyForm.value).subscribe((res) => {
      this.goBack();
    });
  }

  public goBack(): void {
    this.router.navigate(['supply']);
  }

  public loadData(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      const id = params['id'];

      this.supplyService.findById(id).subscribe((result) => {
        this.supplyForm.patchValue({
          ...result,
        });
        this.isLoading = false;
      });
    });
  }
}
