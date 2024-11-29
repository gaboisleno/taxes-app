import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { onlyNumbersValidator } from '../../../core/pipes/custom-validators';
import { Supply } from '../../../models/supply.interface';
import { PaymentService } from '../../../services/payment.service';
import { SupplyService } from '../../../services/supply.service';
import { ControlErrorComponent } from '../../../shared/control-error/control-error.component';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';

@Component({
  selector: 'app-payment-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ControlErrorComponent,
    SpinnerComponent,
    JsonPipe,
  ],
  templateUrl: './payment-edit.component.html',
  styleUrl: './payment-edit.component.css',
})
export class PaymentEditComponent {
  isNew = false;
  isLoading = false;
  supplies: Supply[] = [];

  paymentForm = new FormGroup({
    id: new FormControl(null, []),
    createdAt: new FormControl(),
    total: new FormControl(null, [
      Validators.required,
      Validators.minLength(1),
      onlyNumbersValidator,
    ]),
    supply: new FormControl(),
    description: new FormControl(),
    file: new FormControl(),
    fileType: new FormControl(),
  });

  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private supplyService: SupplyService,
    private route: ActivatedRoute
  ) {
    if (this.route.snapshot.toString().includes('new')) {
      this.isNew = true;
    } else {
      this.loadData();
    }
    this.loadSupplies();
    this.paymentForm.markAllAsTouched();
  }

  submit() {
    this.isLoading = true;
    const item = this.paymentForm.value;
    item.createdAt = item.createdAt ? item.createdAt : new Date();
    item.supply = { id: item.supply };

    this.paymentService
      .save(item)
      .subscribe(() => {
        this.goBack();
      })
      .add(() => (this.isLoading = false));
  }

  goBack() {
    this.router.navigate(['payment']);
  }

  loadSupplies(): void {
    this.supplyService.findAll().subscribe((res) => {
      this.supplies = res;
    });
  }

  loadData(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      const id = params['id'];

      this.paymentService.findById(id).subscribe((result) => {
        this.paymentForm.patchValue({
          ...result,
          supply: result.supply.id,
        });
        this.isLoading = false;
      });
    });
  }

  errorMessage() {
    throw new Error('Method not implemented.');
  }

  handleUpload(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Data = reader.result;
      console.log(base64Data);
      const fileType = (base64Data as string).split(',')[0];
      const fileData = (base64Data as string).split(',')[1];
      this.paymentForm.controls['fileType'].setValue(fileType);
      this.paymentForm.controls['file'].setValue(fileData);
    };
  }

  downloadFile() {
    const base64 = this.paymentForm.controls['file'].value;
    const fileName = this.paymentForm.controls['fileType'].value;
    const src = `${fileName},${base64}`;
    const link = document.createElement('a');
    link.href = src;
    // link.download = 'document';
    link.target = '_blank';
    link.click();

    link.remove();
  }

  public removeFile() {
    this.paymentForm.controls['file'].setValue('');
    this.paymentForm.controls['fileType'].setValue('');
  }
}
