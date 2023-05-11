import { Component, OnInit } from '@angular/core';
import { selectPcBuilderCartStatus } from 'src/store/selectors/app.selector';
import { Router } from '@angular/router';
import { State, Store, select } from '@ngrx/store';
import { AppState, Products, Processor, Motherboard, Ram } from 'src/store/app.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, count, first } from 'rxjs';
import { updateMbCartItem, updateProcessorCartItem, updateRmCartItem } from 'src/store/actions/app.action';

interface ProductType {
  productName: string,
  price: string,
  count: number,
}

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
  cartItems: ProductType[] = [];
  dataSourceEmpty = [];
  dataSource = new MatTableDataSource(this.cartItems);
  constructor(private router:Router, private store: Store<AppState>) {
  }
  cartDataSelector$: Observable<Products> = this.store.pipe(select(selectPcBuilderCartStatus));
  ngOnInit() {
    this.cartDataSelector$          // get the selected items from store
    .pipe(first())
    .subscribe(
      data => {
        this.cartItems.push(data?.processorList[0]);
        this.cartItems.push(data?.motherboardList[0]);
        this.cartItems.push(data?.ramList[0]);
        this.selectedProcessorPrice = data?.processorList[0]?.price;
        this.selectedMotherboardPrice = data?.motherboardList[0]?.price;
        this.selectedRamPrice = data?.ramList[0]?.price;
      }        
      );
  }
  

  onAddClick(selected: any) {
    const clickedItemIndex =                                  //finding the index of clicked item
    this.cartItems.findIndex(item => item.productName === selected.productName) 
    const currentItem = { ...this.cartItems[clickedItemIndex] };
    currentItem.count += 1;                                   //increasing the count of that particular item
    if(clickedItemIndex === 0){                               //updating the price of the processor item if clicked
      currentItem.price = 
        (Number(this.selectedProcessorPrice) * currentItem.count).toString();
        this.store.dispatch(updateProcessorCartItem({
          currentCount: currentItem.count,
          currentPrice: currentItem.price,
        }))
    } else if(clickedItemIndex === 1){                        //updating the price of the motherboard item if clicked
      currentItem.price = 
        (Number(this.selectedMotherboardPrice) * currentItem.count).toString(); 
        this.store.dispatch(updateMbCartItem({
          currentCount: currentItem.count,
          currentPrice: currentItem.price,
        }))
    } else {                                                   //updating the price of the ram item if clicked
      currentItem.price = 
        (Number(this.selectedRamPrice) * currentItem.count).toString();
        this.store.dispatch(updateRmCartItem({
          currentCount: currentItem.count,
          currentPrice: currentItem.price,
        }))
    }

    this.cartItems[clickedItemIndex] = currentItem;           // update the original cartItem array
    this.updateDataSource(); 
  };
  
  onRemoveClick(selected: any){
    const clickedItemIndex = 
      this.cartItems.findIndex(item => item.productName === selected.productName)
    const currentItem = { ...this.cartItems[clickedItemIndex] };
    if(currentItem.count > 1){
      currentItem.count -= 1;
    if(clickedItemIndex === 0){
      currentItem.price = 
        (Number(this.selectedProcessorPrice) * currentItem.count).toString();
        this.store.dispatch(updateProcessorCartItem({
          currentCount: currentItem.count,
          currentPrice: currentItem.price,
        }))
    } else if(clickedItemIndex === 1){
      currentItem.price = 
        (Number(this.selectedMotherboardPrice) * currentItem.count).toString();
        this.store.dispatch(updateMbCartItem({
          currentCount: currentItem.count,
          currentPrice: currentItem.price,
        }))
    } else {
      currentItem.price = 
        (Number(this.selectedRamPrice) * currentItem.count).toString();
        this.store.dispatch(updateRmCartItem({
          currentCount: currentItem.count,
          currentPrice: currentItem.price,
        }))
    }
    this.cartItems[clickedItemIndex] = currentItem;
    this.updateDataSource();
    }
  }
  calculateTotal(){
    this.totalPrice = this.cartItems.map(item => Number(item.price)).reduce((prev, next) => prev + next);
    return this.totalPrice;
  }
  removeCart(index: number) {
    this.cartItems.splice(index, 1);
    this.updateDataSource();
  }
  updateDataSource() {
    this.dataSource.data = this.cartItems;
  }
}
