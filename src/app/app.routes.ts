import { Routes } from '@angular/router';
import { LandingScreenComponent } from './screens/landing-screen/landing-screen.component';
import { LoginScreenComponent } from './screens/auth/login-screen/login-screen.component';
import { RegisterScreenComponent } from './screens/auth/register-screen/register-screen.component';
import { ListScreenComponent } from './screens/events/list-screen/list-screen.component';
import { DashboardScreenComponent } from './screens/dashboard-screen/dashboard-screen.component';

export const routes: Routes = [
  {path:'', component: LandingScreenComponent, pathMatch: 'full'},
  {path:'login', component: LoginScreenComponent, pathMatch: 'full'},
  {path:'register', component: RegisterScreenComponent, pathMatch: 'full'},
  {path:'events', component: ListScreenComponent, pathMatch: 'full'},
  {path:'dashboard', component: DashboardScreenComponent, pathMatch: 'full'},

];
