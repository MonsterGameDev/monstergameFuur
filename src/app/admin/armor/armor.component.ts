import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { ArmorTypeEnum } from '../+state/admin.interfaces';

@Component({
  selector: 'app-armor',
  templateUrl: './armor.component.html',
  styleUrls: ['./armor.component.css']
})
export class ArmorComponent implements OnInit {

  armorForm: FormGroup;
  armorNameErrMsg: string;
  armorLevelErrMsg: string;
  armorTypeErrMsg: string;
  armorStatsGroupErrMsg: string;
  armorStatsGroupHealthErrMsg: string;
  armorStatsGroupPowerErrMsg: string;
  armorStatsGroupDefenceErrMsg: string;
  _armorLevel: number;
  armorTypeEnum = ArmorTypeEnum;
  keys: string[];

  // ERROR MESSAGES
  private armorNameFieldMessages = {
    required: 'Please enter a name for the Armor Piece',
    minlength: 'The name should be longer than 3 charcters'
  };

  private armorLevelFieldMessages = {
    required: 'Please enter a number between 0 and 50',
    min: 'You cannot enter a value below zero',
    max: 'you cannot enter a value greater than 50'
  };

  private armorTypeFieldMessages = {
    required: 'Please pick a value for Armor Type'
  };

  private armorStatsGroupMessages = {
    sum: `The total sum of health, power and defence should equal ${this._armorLevel}`
  };

  private armorStatsGroupHealthMessages = {
    min:  'The value for stat: Health should be above 0',
    max: 'The value for stat: Health should be below 50'
  };

  private armorStatsGroupPowerMessages = {
    min:  'The value for stat: Power should be above 0',
    max: 'The value for stat: Power should be below 50'
  };

  private armorStatsGroupDefenceMessages = {
    min:  'The value for stat: Defence should be above 0',
    max: 'The value for stat: Defence should be below 50'
  };

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    // SET PROPERTIES
    this._armorLevel = 0;
    this.keys = Object.keys(this.armorTypeEnum);

    // FORM
    this.armorForm = this.fb.group({
      armorName: ['', [Validators.required, Validators.minLength(3)]],
      armorLevel: ['', [Validators.required, Validators.min(0), Validators.max(50)]],
      armorType: ['', [Validators.required]],
      armorStatsGroup: this.fb.group({
        health: ['', [Validators.min(0), Validators.max(50)]],
        power: ['', [Validators.min(0), Validators.max(50)]],
        defence: ['', [Validators.min(0), Validators.max(50)]]
      }, { validator: this.armorStatSummarizing(30) })
    });

    this.armorForm.get('armorStatsGroup').disable();

    // FIELD VALUE-CHANGE LISTENERS
    const armorNameControl = this.armorForm.get('armorName');
    this.armorForm.get('armorName').valueChanges.pipe(debounceTime(1000)).subscribe(val => this.armorNameValidityCheck(armorNameControl));

    const armorLevelControl = this.armorForm.get('armorLevel');
    this.armorForm.get('armorLevel').valueChanges.subscribe(val => {
      this.armorLevelValidityCheck(armorLevelControl);
      this._armorLevel = armorLevelControl.value;

      // disable armorFormGroup if ho armorLevel has been entered
      (!this._armorLevel || this._armorLevel === 0 || this._armorLevel === 50)
        ? this.armorForm.get('armorStatsGroup').disable()
        : this.armorForm.get('armorStatsGroup').enable() ;

      this.armorStatsGroupMessages['sum'] = 'The sum of health, power and defence stats should equal the set armorLevel: '
      + this._armorLevel;
    });

    const armorTypeControl = this.armorForm.get('armorType');
    this.armorForm.get('armorType').valueChanges.subscribe(val => this.armorTypeValidityCheck(armorTypeControl));

    const armorStatsGroupControl = this.armorForm.get('armorStatsGroup');
    this.armorForm.get('armorStatsGroup').valueChanges.subscribe(val => this.armorStatsGroupValidityCheck(armorStatsGroupControl));

    const armorStatsGroupHealthControl = this.armorForm.get('armorStatsGroup.health');
    armorStatsGroupHealthControl.valueChanges.subscribe(val => this.armorStatsGroupHealthValidityCheck(armorStatsGroupHealthControl));

    const armorStatsGroupPowerControl = this.armorForm.get('armorStatsGroup.power');
    armorStatsGroupPowerControl.valueChanges.subscribe(val => this.armorStatsGroupPowerValidityCheck(armorStatsGroupPowerControl));

    const armorStatsGroupDefenceControl = this.armorForm.get('armorStatsGroup.defence');
    armorStatsGroupDefenceControl.valueChanges.subscribe(val => this.armorStatsGroupDefenceValidityCheck(armorStatsGroupDefenceControl));
  }  // end ngOnInit()

  // VALIDATION CHECK - ACTIVATE ERROR-MESSAGES
  armorNameValidityCheck(c: AbstractControl): void {
    this.armorNameErrMsg = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.armorNameErrMsg = Object.keys(c.errors).map(key => this.armorNameFieldMessages[key]).toString();
    }
  }

  armorLevelValidityCheck (c: AbstractControl) {
    this.armorLevelErrMsg = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.armorLevelErrMsg = Object.keys(c.errors).map(key => this.armorLevelFieldMessages[key]).toString();
    }
  }

  armorTypeValidityCheck (c: AbstractControl) {
    // console.log('im here', c);
    this.armorTypeErrMsg = '';
    if ((c.touched || c.dirty) && c.errors) {
      // console.log(Object.keys(c.errors));
      this.armorTypeErrMsg = Object.keys(c.errors).map(key => this.armorTypeFieldMessages[key]).toString();
    }
  }

  armorStatsGroupValidityCheck (c: AbstractControl) {
    this.armorStatsGroupErrMsg = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.armorStatsGroupErrMsg = Object.keys(c.errors).map(key => this.armorStatsGroupMessages[key]).toString();
    }
  }

  armorStatsGroupHealthValidityCheck (c: AbstractControl) {
    this.armorStatsGroupHealthErrMsg = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.armorStatsGroupHealthErrMsg = Object.keys(c.errors).map(key => this.armorStatsGroupHealthMessages[key]).toString();
    }
  }

  armorStatsGroupPowerValidityCheck (c: AbstractControl) {
    this.armorStatsGroupPowerErrMsg = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.armorStatsGroupPowerErrMsg = Object.keys(c.errors).map(key => this.armorStatsGroupPowerMessages[key]).toString();
    }
  }

  armorStatsGroupDefenceValidityCheck (c: AbstractControl) {
    this.armorStatsGroupDefenceErrMsg = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.armorStatsGroupDefenceErrMsg = Object.keys(c.errors).map(key => this.armorStatsGroupDefenceMessages[key]).toString();
    }
  }

  // CUSTOM ERRORS
  armorStatSummarizing(maxSum: number): ValidatorFn {
    return (c: AbstractControl)  => {
      const health = c.get('health');
      const power = c.get('power');
      const defence = c.get('defence');
      if (defence.pristine || power.pristine || health.pristine) {
        return null;
      }
      if ((health.value + power.value + defence.value) !== maxSum) {
        return {'sum': true};
      }
      return null;
    };
  }

}
