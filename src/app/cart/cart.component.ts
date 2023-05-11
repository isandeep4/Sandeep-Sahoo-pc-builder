import { Component, OnInit } from '@angular/core';
import { selectPcBuilderCartStatus } from 'src/store/selectors/app.selector';
import { Router } from '@angular/router';
import { State, Store, select } from '@ngrx/store';
import { AppState, Products, Product } from 'src/store/app.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, count, first } from 'rxjs';
import { removeCartItem, updateCartItem } from 'src/store/actions/app.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  selectedProducts: Products;
  selectedProcessorPrice: string;
  selectedMotherboardPrice: string;
  selectedRamPrice: string;
  totalPrice = 0;
  componentData: [];
  displayedColumns: string[] = ['Product', 'ChangeItem', 'Price', 'Delete'];
  cartItems: Product[] = [];
  dataSourceEmpty = [];
  dataSource = new MatTableDataSource(this.cartItems);
  constructor(private router:Router, private store: Store<AppState>) {
  }
  cartDataSelector$: Observable<Product[]> = this.store.pipe(select(selectPcBuilderCartStatus));
  ngOnInit() {
    this.cartDataSelector$          // get the selected items from store
    .pipe(first())
    .subscribe(
      data => {
        this.cartItems = data;
        this.dataSource = new MatTableDataSource(this.cartItems);
        this.selectedProcessorPrice = data[0]?.price;
        this.selectedMotherboardPrice = data[1]?.price;
        this.selectedRamPrice = data[2]?.price;
      }        
      );
  }
  

  onAddClick(selected: any) {
    let initialPrice;
    const clickedItemIndex =                                  //finding the index of clicked item
    this.cartItems.findIndex(item => item.productName === selected.productName) 
    const currentItem = { ...this.cartItems[clickedItemIndex] };
    currentItem.count += 1;                                   //increasing the count of that particular item
    
    if(clickedItemIndex === 0){                               //updating the price of the item if clicked
      initialPrice = this.selectedProcessorPrice;
    } else if(clickedItemIndex === 1){
      initialPrice = this.selectedMotherboardPrice;
    } else if(clickedItemIndex === 2){
      initialPrice = this.selectedRamPrice;
    }
    currentItem.price =
         (Number(initialPrice) * currentItem.count).toString();
    this.store.dispatch(updateCartItem({
      index: clickedItemIndex,
      currentCount: currentItem.count,
      currentPrice: currentItem.price,
    }))
    this.updateDataSource(); 
  };
  
  onRemoveClick(selected: any){
    let initialPrice;
    const clickedItemIndex = 
      this.cartItems.findIndex(item => item.productName === selected.productName)
    const currentItem = { ...this.cartItems[clickedItemIndex] };
    if(currentItem.count > 1){
      currentItem.count -= 1;
      if(clickedItemIndex === 0){                               //updating the price of the processor item if clicked
        initialPrice = this.selectedProcessorPrice;
      } else if(clickedItemIndex === 1){
        initialPrice = this.selectedMotherboardPrice;
      } else if(clickedItemIndex === 2){
        initialPrice = this.selectedRamPrice;
      }
      currentItem.price =
         (Number(initialPrice) * currentItem.count).toString();
      this.store.dispatch(updateCartItem({
        index: clickedItemIndex,
        currentCount: currentItem.count,
        currentPrice: currentItem.price,
      }))
      this.updateDataSource(); 
    }
  }
  calculateTotal(){
    this.totalPrice = this.cartItems.map(item => Number(item.price)).reduce((prev, next) => prev + next);
    return this.totalPrice;
  }
  removeCart(index: number) {
    const currentItem = { ...this.cartItems[index] };
    this.store.dispatch(removeCartItem({
      currentProduct:currentItem.productName,
    }))
    this.updateDataSource();
  }
  updateDataSource() {
    this.cartDataSelector$          // get the selected items from store
    .pipe(first())
    .subscribe(
      data => {
        this.cartItems = data;
        this.dataSource.data = this.cartItems;
      }
    )
  }
}
