import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { OwnerEntity } from './model/OwnerEntity';
import { OwnerService } from './services/ownerService';

export function carNumberValidator(ownerService: OwnerService, carNumber: string = ''): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return ownerService.getOwners().pipe(map(
      (owners: OwnerEntity[]) => {
        if (carNumber.toLowerCase() == control.value.toLowerCase()){
          return null;
        } 
        let isNotUniq: string[] = owners.map(o => o.aCars.map(n => n.carNumber).join(';')).join(';').split(";").filter(k => control.value.toLowerCase() == k.toLowerCase());
        return isNotUniq.length > 0 ? { "carNumber": true } : null;
      }
    ));
  };
} 