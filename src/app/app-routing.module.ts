import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTravelComponent } from './add-travel/add-travel.component';
import { BasketComponent } from './basket/basket.component';
import { LoginComponent } from './login/login.component';
import { TravelDetailsComponent } from './travel-details/travel-details.component';
import { TravelComponent } from './travel/travel.component';

import { AuthGuard } from './guard/auth.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { StartPageComponent } from './start-page/start-page.component';

const routes: Routes = [
  {path: 'travels', component: TravelComponent},
  {path: 'basket', component:BasketComponent},
  {path: 'addTravel', component: AddTravelComponent},
  {path: 'travelDetails/:id', component: TravelDetailsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'adminPanel', component: AdminPanelComponent, canActivate: [AuthGuard]},
  {path: 'startPage', component: StartPageComponent},
  {path: "", redirectTo:'/startPage', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
