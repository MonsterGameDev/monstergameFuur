import { Component, OnInit } from '@angular/core';
import { DataService } from './../services/data.service';
import { Armor, HttpErrorTracker } from '../+state/admin.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-armor-list',
  templateUrl: './armor-list.component.html',
  styleUrls: ['./armor-list.component.css']
})
export class ArmorListComponent implements OnInit {
  armor: Armor[];

  constructor(private svc: DataService, private router: Router) { }

  ngOnInit() {
    this.svc.getAllArmor().subscribe(
      (val: Armor[]) => {
        console.log('armor: ', val);
        this.armor = val;
      },
      (err: HttpErrorTracker) => console.log (`${err.errorNumber} ${err.message} ${err.friendlymessage}`)
    );
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
}
