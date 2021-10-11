import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { OwnerEntity } from '../model/OwnerEntity';

@Injectable({
  providedIn: 'root',
})
export class InOwnerDataService implements InMemoryDbService {
  createDb() {
    const owners: OwnerEntity[] = [
      { id: 11, aFirstName: 'Dr Nice' , aLastName: 'Smith', aMiddleName: "Petrovich", aCars: [
        {
          id:3553,
          carNumber: 'AX2952EK',
          carName: 'Toyota',
          carModel: 'Rav4',
          carYear: 2015
        },
        {
          id:33533,
          carNumber: 'AX4325AX',
          carName: 'Saab',
          carModel: '9b',
          carYear: 2010
        }
      ]},
      { id: 12, aFirstName: 'Narco', aLastName: 'Carol', aMiddleName: "Ivanovich",aCars: [{
        id:33535653,
        carNumber: 'AX8722AB',
        carName: 'Honda',
        carModel: 'CR-V',
        carYear: 2015
      }] },
      { id: 13, aFirstName: 'Bombasto', aLastName: 'Bell', aMiddleName: "Antonovich", aCars: [{
        id:33535653,
        carNumber: 'AX3222OP',
        carName: 'Lexus',
        carModel: 'L460',
        carYear: 2015
      }] },
      {id: 14, aFirstName: 'Celeritas', aLastName: 'White', aMiddleName: "Serheevich",aCars: [{
        id:33535653,
        carNumber: 'AX332OP',
        carName: 'Vaz',
        carModel: '2107',
        carYear: 1990
      }] }
    ];
    return {owners};
  }

  genId(owners: OwnerEntity[]): number {
    return owners.length > 0 ? Math.max(...owners.map(owner => owner.id)) + 1 : 11;
  }
}
