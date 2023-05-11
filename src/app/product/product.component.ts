import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { ProductService } from '../product.service';
import { State, Store, select } from '@ngrx/store';
import { AppState, Products } from 'src/store/app.interface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { loadAllItems, addProcessorToCart, addMbToCart, addRamToCart } from 'src/store/actions/app.action';
import { selectPcBuilderStatus } from 'src/store/selectors/app.selector';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  products: Products;
  selectedProcessor: string;
  selectedMotherboard: string;
  selectedRam: string;

  constructor(private router:Router, private cdr: ChangeDetectorRef, private http: HttpClient,
    private productService:ProductService, private store: Store<AppState>) {
  }
  ngOnInit(): void {
    this.store.pipe(select(selectPcBuilderStatus))     //get all the items from the store
    .subscribe(
      data => {
        this.products = data;
      }        
      );   
  }
  onProcessorChange(val:any){                          // store the selected processor item
    this.store.dispatch(addProcessorToCart({
     processor: JSON.parse(val)
    }));
  }
  onMbChange(val:any){                                 // store the selected motherboard item
    this.store.dispatch(addMbToCart({
      motherboard: JSON.parse(val)
    }));
  }
  onRamChange(val:any){                                 // store the selected ram item
    this.store.dispatch(addRamToCart({
      ram: JSON.parse(val)
    }));
  }
  goToCart(){
    this.router.navigate(['/cart']);
  }
  
  
}



