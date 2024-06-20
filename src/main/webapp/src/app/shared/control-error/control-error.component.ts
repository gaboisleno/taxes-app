import { AsyncPipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-control-error',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './control-error.component.html',
  styleUrl: './control-error.component.css',
})
export class ControlErrorComponent implements OnInit, OnDestroy {
  @Input() controlName!: string;
  public message$ = new BehaviorSubject<string>('');
  private subscription = new Subscription();

  constructor(private formGroupDirective: FormGroupDirective) {}

  ngOnInit(): void {
    if (this.formGroupDirective) {
      const control = this.formGroupDirective.control.get(this.controlName);

      if (control) {
        this.subscription = control.valueChanges.subscribe(() => {
          const errors = control.errors;
          if (errors) {
            const firstKey = Object.keys(errors)[0];
            this.setError(this.mapError(firstKey));
          } else {
            this.setError('');
          }
        });
      }
    }
  }

  setError(error: string) {
    this.message$.next(error);
  }

  mapError(key: string): string {
    switch (key) {
      case 'required':
        return 'Campo requerido';

      case 'isNotNumber':
        return 'Solo se permiten numeros';

      default:
        return key;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
