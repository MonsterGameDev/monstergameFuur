import { Component, OnInit } from '@angular/core';
import { DataService } from './../services/data.service';
import { Armor, HttpErrorTracker } from '../+state/admin.interfaces';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-armor-list',
  templateUrl: './armor-list.component.html',
  styleUrls: ['./armor-list.component.css']
})
export class ArmorListComponent implements OnInit {
  armor: Armor[];

  constructor(private svc: DataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const resolvedArmor: Armor[] | HttpErrorTracker = this.activatedRoute.snapshot.data['resolvedArmor'];

    if (this.isHttpErrorTracker(resolvedArmor)) {
      const err = resolvedArmor;
      console.log (`${err.errorNumber} ${err.message} ${err.friendlymessage}`);
    } else {
      this.armor = resolvedArmor;
    }

    // this.svc.getAllArmor().subscribe(
    //   (val: Armor[]) => {
    //     console.log('armor: ', val);
    //     this.armor = val;
    //   },
    //   (err: HttpErrorTracker) => console.log (`${err.errorNumber} ${err.message} ${err.friendlymessage}`)
    // );
  }

  deleteArmor(id: Number): void {
    if (confirm('Are you sure?')) {
      this.svc.deleteArmor(id)
        .subscribe(
          (val) => {
            this.router.navigate(['/armor']);
        },
          (err: Error) => console.log('Error: ', err)

        );
    }
  }

  // check if argument is of type HttpErrorTracker - type guard
  isHttpErrorTracker(arg: any): arg is HttpErrorTracker {
    return arg.errorNumber !== undefined;
  }
}
