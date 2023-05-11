import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadAllItems } from 'src/store/actions/app.action';
import { Products } from 'src/store/app.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Products;
  constructor(private store: Store<{ productList: Products}>) {
  }
  

  ngOnInit() {
    this.store.dispatch(loadAllItems());
  }
}
