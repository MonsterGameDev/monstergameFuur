import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArmorComponent } from './armor/armor.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [ArmorComponent],
  exports: [ArmorComponent]
})
export class AdminModule { }
