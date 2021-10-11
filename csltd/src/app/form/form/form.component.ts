import { Component, OnInit } from '@angular/core';
import { OwnerEntity } from 'src/app/model/OwnerEntity';
import { OwnerService } from 'src/app/services/ownerService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public owners: OwnerEntity[];
  public selectedOwnerId: number | null;
  
  constructor( private ownerService: OwnerService,
               private router : Router){ }

  ngOnInit(): void {
    this.getOwners();
  }
  
  public getOwners(): void {
    this.ownerService.getOwners().subscribe(owners => this.owners = owners);
  }

  public removeOwner() {
    if (this.selectedOwnerId != null) {
      this.ownerService.deleteOwner(this.selectedOwnerId).subscribe( () => {
        this.getOwners();
      });  
    }
  }

 public onSelect(id: number) :void{
      if (this.selectedOwnerId == id) {
        this.selectedOwnerId = null;
      } else{
        this.selectedOwnerId = id;   
      }  
 }

 public editOwner():void {
    this.router.navigate(['dialog', this.selectedOwnerId], {
      queryParams:{
          'action': 'edit'
      }
  });
 }
 public previewOwner():void {
  this.router.navigate(['dialog', this.selectedOwnerId])
  }

}
