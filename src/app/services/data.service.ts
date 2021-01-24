import { ShoppingCart } from './../shared/shoppingCart';
import { DATA } from './../shared/value';
import { Specs } from './../shared/specs';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dataValue : Specs[] = DATA;
  cart : Specs[] = [];

  private content = new BehaviorSubject<Specs[]>([]);

  public share = this.content.asObservable();

  constructor(private http : HttpClient) { }
  
  getData(): Observable<Specs[]>{
    return this.http.get<Specs[]>("assets/db1.json").pipe(delay(1000));
    
  }

  // addCart(id: string) : Observable<Specs>{
  //   return of(DATA.filter((book) => (book.bookID == id) )[0]).pipe();
    
  // }

  getCart(cart){
    this.content.next(cart);
  }

}
