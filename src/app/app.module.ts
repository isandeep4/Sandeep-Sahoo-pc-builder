import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from 'src/app/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, isDevMode } from '@angular/core';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PcBuilderReducer } from 'src/store/reducers/app.reducer';
import { HttpClientModule } from '@angular/common/http';
import { PcBuilderEffects } from 'src/store/effects/app.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';



const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'cart', component: CartComponent}
]

@NgModule({
  declarations: [
    AppComponent,HeaderComponent,HomeComponent, ProductComponent, CartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatTableModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({pcBuilder: PcBuilderReducer} as ActionReducerMap<any,any>),
    EffectsModule.forRoot([PcBuilderEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }) 
  ],
  exports: [MatTableModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
