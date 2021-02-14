import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTravelComponent } from './add-travel/add-travel.component';
import { BasketComponent } from './basket/basket.component';
import { StarComponent } from './star/star.component';
import { TravelComponent } from './travel/travel.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { OneTravelComponent } from './one-travel/one-travel.component';
import { TravelDetailsComponent } from './travel-details/travel-details.component';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MenuComponent } from './menu/menu.component';
import { StartPageComponent } from './start-page/start-page.component';


@NgModule({
  declarations: [
    AppComponent,
    AddTravelComponent,
    BasketComponent,
    StarComponent,
    TravelComponent,
    OneTravelComponent,
    TravelDetailsComponent,
    LoginComponent,
    AdminPanelComponent,
    MenuComponent,
    StartPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.fireBaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
