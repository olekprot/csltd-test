import { NgModule } from '@angular/core';
import { FormComponent } from './form/form/form.component';
import { RouterModule, Routes } from '@angular/router';
import { DialogComponent } from './dialog/add-dialog/dialog.component';


const routes: Routes = [
  { path: '', redirectTo: '/form', pathMatch: 'full' },
  { path: 'form', component: FormComponent },
  { path: 'dialog/:id', component: DialogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
