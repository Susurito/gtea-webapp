import { Routes } from '@angular/router';
import { LandingScreenComponent } from './screens/landing-screen/landing-screen.component';
import { LoginScreenComponent } from './screens/auth/login-screen/login-screen.component';
import { RegisterScreenComponent } from './screens/auth/register-screen/register-screen.component';
import { ListScreenComponent } from './screens/events/list-screen/list-screen.component';
import { CategoriesScreenComponent } from './screens/admin/categories-screen/categories-screen.component';
import { UsersScreenComponent } from './screens/admin/users-screen/users-screen.component';
import { DashboardScreenComponent } from './screens/dashboard-screen/dashboard-screen.component';
import { ReportsScreenComponent } from './screens/reports-screen/reports-screen.component';
import { VenuesScreenComponent } from './screens/admin/venues-screen/venues-screen.component';
import { MyScreenComponent } from './screens/enrollments/my-screen/my-screen.component';
import { EventosAdminComponent } from './screens/events/eventos-admin/eventos-admin.component';
import { RegisterLogeadoComponent } from './screens/register-logeado/register-logeado.component';

export const routes: Routes = [
  {path:'', component: LandingScreenComponent, pathMatch: 'full'},
  {path:'login', component: LoginScreenComponent, pathMatch: 'full'},
  {path:'register', component: RegisterScreenComponent, pathMatch: 'full'},
  {path:'events', component: ListScreenComponent, pathMatch: 'full'},
  {path:'admin', component: CategoriesScreenComponent, pathMatch: 'full'},
  {path: 'usuarios', component: UsersScreenComponent, pathMatch: 'full'},
  {path: 'categorias', component: CategoriesScreenComponent, pathMatch: 'full'},
  {path: 'dashboard', component: DashboardScreenComponent, pathMatch: 'full'},
  {path: 'sedes', component: VenuesScreenComponent, pathMatch: 'full'},
  {path: 'reportes', component: ReportsScreenComponent, pathMatch: 'full'},
  {path: 'mis-inscripciones', component: MyScreenComponent, pathMatch: 'full'},
  {path: 'eventos-admin', component: EventosAdminComponent, pathMatch: 'full'},
  {path: 'register-log', component: RegisterLogeadoComponent, pathMatch: 'full'},

];
