import { Specs } from './../shared/specs';
import { DataService } from './../services/data.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cart : Specs[] =[];
  
  total_count : number;
  constructor(private dataService:  DataService) { 
    this.total_count = dataService.cart.length;
    
    //console.log(this.total_count);
  }
  
  ngOnDestroy(){
  
  }


  ngOnInit() {
    this.dataService.share.subscribe((x) => this.cart = x);
  }
  
}
