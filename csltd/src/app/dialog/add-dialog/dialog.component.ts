import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { CarEntity } from 'src/app/model/CarEntity';
import { OwnerEntity } from 'src/app/model/OwnerEntity';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { InOwnerDataService } from 'src/app/services/InOwnerDataService'; 
import { OwnerService } from 'src/app/services/ownerService';
import {carNumberValidator} from 'src/app/carNumberValidator';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Input()
  owner: OwnerEntity;
  @Input()
  car: CarEntity;

  public dialogFormOwner: FormGroup;
  public cars: FormArray;
  public isShown: boolean = false ;
  public action: string;
  public newOwner: boolean = false;
  public submitted: boolean = false;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private ownerService: OwnerService,
              private location: Location,
              private inOwnerDataService: InOwnerDataService
              ) { 
                route.queryParams.subscribe(
                  (queryParam: any) => {
                      this.action = queryParam['action'];
                      this.newOwner = queryParam['add'];
                  }
              );
    }

  ngOnInit(): void {
    this.initializeForm();
  }

  public getCars() : CarEntity[] {
    return (this.dialogFormOwner.get('aCars') as any)['controls'];
  }
  
  public initializeForm(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == 'new'){
      this.newOwner = true;
      this.ownerService.getOwners().subscribe(owners => {
        this.dialogFormOwner = this.fb.group({
          id: this.inOwnerDataService.genId(owners),
          aLastName: new FormControl("", [Validators.required]),
          aFirstName: new FormControl("", [Validators.required]),
          aMiddleName: new FormControl("", [Validators.required]),
          aCars: this.fb.array([])
        });
      });
    } else {
      this.ownerService.getOwnerById(parseInt(id!, 10))
      .subscribe(owner => {
        this.owner = owner;
        this.dialogFormOwner = this.fb.group({
          id: this.owner.id,
          aLastName: new FormControl(this.owner.aLastName, [Validators.required]),
          aFirstName: new FormControl(this.owner.aFirstName, [Validators.required]),
          aMiddleName: new FormControl(this.owner.aMiddleName, [Validators.required]),
          aCars:this.fb.array(this.owner.aCars.map(car => this.fb.group(  {
            carNumber: new FormControl(car.carNumber.toUpperCase(), [Validators.required, Validators.pattern(new RegExp(/^[A-Za-z]{2}[0-9]{4}[A-Za-z]{2}$/))], [carNumberValidator(this.ownerService, car.carNumber.toUpperCase())] ),
            carName: new FormControl([car.carName], [Validators.required] ),
            carModel: new FormControl( [car.carModel], [Validators.required]),
            carYear: new FormControl( [car.carYear], [Validators.required , Validators.min(1990), Validators.max(2021)])
          })))
        });
      });
    }
  }
  public createCar(): FormGroup {
    return this.fb.group({
      carNumber:new FormControl( "".toUpperCase() , [Validators.required, Validators.pattern(new RegExp(/^[A-Za-z]{2}[0-9]{4}[A-Za-z]{2}$/))],  [carNumberValidator(this.ownerService)]),
      carName: new FormControl( "" , [Validators.required]),
      carModel:new FormControl( "" , [Validators.required]),
      carYear: new FormControl( "" , [Validators.required , Validators.min(1990), Validators.max(2021)]) 
    })}
    
  public addCar(): void{
    this.cars = this.getFildCars();
    this.cars.push(this.createCar());
  }

  public getFildCars(): FormArray {
    return this.dialogFormOwner.get('aCars') as FormArray;
  }

  public getFormsControls(i: number) : FormGroup{
    return this.getFildCars().controls[i] as FormGroup;
}

  public saveOwner():void {
    if (this.dialogFormOwner.invalid || this.dialogFormOwner.getRawValue().aCars.length < 1){

    } else {   
      this.submitted = true;
      this.ownerService.editOwner(this.dialogFormOwner.getRawValue())
      .subscribe(() => {
        this.submitted = false;
        void this.location.back();
    })
}}

  public deleteCar(i: number):void {
    let arr = this.dialogFormOwner.get('aCars') as FormArray;
    arr.removeAt(i);
  }

public toggleShow() {
  this.isShown = ! this.isShown;
  }
}
