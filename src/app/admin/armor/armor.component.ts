import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { ArmorTypeEnum, Armor } from '../+state/admin.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


import { DataService } from '../services/data.service';

@Component({
  selector: 'app-armor',
  templateUrl: './armor.component.html',
  styleUrls: ['./armor.component.css']
})
export class ArmorComponent implements OnInit {
  armor: Armor;
  armorForm: FormGroup;
  armorNameErrMsg: string;
  armorLevelErrMsg: string;
  armorTypeErrMsg: string;
  armorStatsGroupErrMsg: string;
  armorStatsGroupHealthErrMsg: string;
  armorStatsGroupPowerErrMsg: string;
  armorStatsGroupdefenseErrMsg: string;
  _armorLevel: number;
  armorFormHeader: string;
  armorTypeEnum = ArmorTypeEnum;
  keys: string[];
  newArmor: Armor;
  sub: Subscription;

  //#region  "ERROR MESSAGES"
  private armorNameFieldMessages = {
    required: 'Please enter a name  the Armor Piece',
    minlength: 'The name should be longer than 3 charcters'
  };

  private armorLevelFieldMessages = {
    required: 'Please enter a number between 1 and 50',
    min: 'You cannot enter a value below 1',
    max: 'you cannot enter a value greater than 50'
  };

  private armorTypeFieldMessages = {
    required: 'Please pick a value for Armor Type'
  };

  private armorStatsGroupMessages = {
    sum: `The total sum of health, power and defense should equal ${this._armorLevel}`
  };

  private armorStatsGroupHealthMessages = {
    min:  'The value for stat: Health should be above 0',
    max: 'The value for stat: Health should be below 50'
  };

  private armorStatsGroupPowerMessages = {
    min:  'The value for stat: Power should be above 0',
    max: 'The value for stat: Power should be below 50'
  };

  private armorStatsGroupdefenseMessages = {
    min:  'The value for stat: defense should be above 0',
    max: 'The value for stat: defense should be below 50'
  };
//#endregion "ERROR MESSAGES"

  constructor(
      private fb: FormBuilder,
      private svc: DataService,
      private activatedRoute: ActivatedRoute,
      private router: Router) { }

  ngOnInit() {

    // SET PROPERTIES
    this._armorLevel = 0;
    this.keys = Object.keys(this.armorTypeEnum);

    // FORM
    this.armorForm = this.fb.group({
      armorName: ['', [Validators.required, Validators.minLength(3)]],
      armorLevel: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
      armorType: ['', [Validators.required]],
      armorStatsGroup: this.fb.group({
        health: ['', [Validators.min(0), Validators.max(50)]],
        power: ['', [Validators.min(0), Validators.max(50)]],
        defense: ['', [Validators.min(0), Validators.max(50)]]
      })
    });

    this.armorForm.get('armorStatsGroup').disable();

    this.sub = this.activatedRoute.params
      .subscribe(params => {
      const id = params['id'];
      this.getArmor(id);
    });

    //#region "FIELD VALUE-CHANGE LISTENERS"
    const armorNameControl = this.armorForm.get('armorName');
    this.armorForm.get('armorName').valueChanges.pipe(debounceTime(1000)).subscribe(val => this.armorNameValidityCheck(armorNameControl));

    const armorLevelControl = this.armorForm.get('armorLevel');
    this.armorForm.get('armorLevel').valueChanges.subscribe(val => {
      this.armorLevelValidityCheck(armorLevelControl);
      this._armorLevel = armorLevelControl.value;

      // dynamically setting the validator for the StatsGroup fields-sum
      this.armorForm.get('armorStatsGroup').setValidators( this.armorStatSummarizing(this._armorLevel));

      // disable armorFormGroup if ho armorLevel has been entered
      (!this._armorLevel || this._armorLevel < 1 || this._armorLevel > 50)
        ? this.armorForm.get('armorStatsGroup').disable()
        : this.armorForm.get('armorStatsGroup').enable() ;

      this.armorStatsGroupMessages['sum'] = 'The sum of health, power and defense stats should equal the armorLevel: '
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

    const armorStatsGroupdefenseControl = this.armorForm.get('armorStatsGroup.defense');
    armorStatsGroupdefenseControl.valueChanges.subscribe(val => this.armorStatsGroupdefenseValidityCheck(armorStatsGroupdefenseControl));

    //#endregion "FIELD VALUE-CHANGE LISTENERS"

  }  // end ngOnInit()


  //#region "VALIDAION CHECK"
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

  armorStatsGroupdefenseValidityCheck (c: AbstractControl) {
    this.armorStatsGroupdefenseErrMsg = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.armorStatsGroupdefenseErrMsg = Object.keys(c.errors).map(key => this.armorStatsGroupdefenseMessages[key]).toString();
    }
  }
  //#endregion "VALIDITY CHECK"

  save() {
    if (this.armorForm.valid) {
      if (this.armorForm.dirty) {
        const a = { ...this.armor, ...this.armorForm.value };
        if (a.id === 0) {
          this.svc.createArmor(a)
            .subscribe (
              () => this.onSaveComplete(),
              (error: any) => console.log('Error: ', error)
            );
        } else {
          this.svc.updateArmor(a)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => console.log('Error: ', error)
            );
        }
      } else if (!this.armorForm.dirty) {
        this.onSaveComplete();
      }
    }
  }

  private onSaveComplete(): void {
    this.armorForm.reset();
    this.router.navigate(['/armor']);
  }


  getArmor(id: number) {
    this.svc.getArmorPiece(id)
      .subscribe(
        (val: Armor)  => this.onDataReceived(val),
        (err) => console.log('Error: ', err)
      );
  }

  onDataReceived(armor: Armor) {
    if (this.armorForm) {
      this.armorForm.reset();
    }

    this.armor = armor;

    if (armor.id === 0) {
      this.armorFormHeader = 'Add Armor';
    } else {
      this.armorFormHeader = 'Edit Armor: ' + armor.armorName;
    }

    // Set form values
    this.armorForm.patchValue({
      armorName: armor.armorName,
      armorLevel: armor.armorLevel,
      armorType: armor.armorType,
      armorStatsGroup: {
        health: armor.armorStats.health,
        power: armor.armorStats.power,
        defense: armor.armorStats.defense
      }
    });

  }

  // CUSTOM ERRORS
  armorStatSummarizing(maxSum: number): ValidatorFn {
    return (c: AbstractControl)  => {
      const health = c.get('health');
      const power = c.get('power');
      const defense = c.get('defense');
      // if (defense.pristine || power.pristine || health.pristine) {
      //   return null;
      // }
      if ((health.value + power.value + defense.value) !== maxSum) {
        return {'sum': true};
      }
      return null;
    };
  }

}
