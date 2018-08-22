import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArmorComponent } from './armor/armor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminContainerComponent } from './admin-container/admin-container.component';
import { ArmorListComponent } from './armor-list/armor-list.component';
import { RouterModule } from '@angular/router';
import { ArmorDetailComponent } from './armor-detail/armor-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'armor', component: ArmorListComponent },
      { path: 'armordetails/:id', component: ArmorDetailComponent },
      { path: 'editarmor/:id', component: ArmorComponent},
    ])
  ],
  declarations: [ArmorComponent, AdminContainerComponent, ArmorListComponent,  ArmorDetailComponent],
  exports: [ArmorComponent, AdminContainerComponent]
})

export class AdminModule { }
