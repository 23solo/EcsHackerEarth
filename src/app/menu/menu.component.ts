import { ShoppingCart } from './../shared/shoppingCart';
import { DataService } from './../services/data.service';
import { Specs, columns } from './../shared/specs';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})


export class MenuComponent implements OnInit, AfterViewInit{

  
  constructor(private dataService: DataService) {
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  cart : ShoppingCart[] = [];
  dataSource = new MatTableDataSource();

  ngOnInit() {
    this.dataService.share.subscribe((x) => this.cart = x);
    this.dataService.getData().subscribe((dat)=>this.dataSource.data = dat);
  }
  
  
  
  displayedColumns = columns ;
  
  

   applyFilter(search : string) {
    this.dataSource.filter = search.toLowerCase().trim();
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }



  add(value: Specs){
    this.cart.push(value);
    this.dataService.getCart(this.cart);
  }
  remove(value: Specs){
    this.cart = this.cart.filter((book_id)=> (book_id.bookID !== value.bookID));
    this.dataService.getCart(this.cart);
  }

  valuePresent(ele : number){
    
    if(this.cart.filter((book_id)=> (book_id.bookID == ele)).length != 0 )
    {
      //console.log("NO");
      return true;
    }
    return false; 
  }

}