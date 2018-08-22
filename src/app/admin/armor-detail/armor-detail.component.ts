import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DataService } from '../services/data.service';
import { Armor } from '../+state/admin.interfaces';

@Component({
  selector: 'app-armor-detail',
  templateUrl: './armor-detail.component.html',
  styleUrls: ['./armor-detail.component.css']
})
export class ArmorDetailComponent implements OnInit {

  sub: Subscription;
  armor: Armor;

  constructor(private activatedRoute: ActivatedRoute, private svc: DataService) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      console.log('id: ', id);
      this.sub = this.svc.getArmorPiece(id).subscribe(val => {
        this.armor = val;
        console.log('foundArmor: ', this.armor);
      },
      err => console.log('Error: ', err)
    );
    },
    err => console.log('Error: ', err));
  }

}
