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
import { RegisterLogeadoCategoriasComponent } from './screens/register-logeado-categorias/register-logeado-categorias.component';
import { RegisterLogeadoEstudiantesComponent } from './screens/register-logeado-estudiantes/register-logeado-estudiantes.component';
import { RegisterLogeadoSedesComponent } from './screens/register-logeado-sedes/register-logeado-sedes.component';
import { RegisterLogeadoOrganizadorComponent } from './screens/register-logeado-organizador/register-logeado-organizador.component';

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
  {path: 'register-logeado-evento', component: RegisterLogeadoComponent, pathMatch: 'full'},
  {path: 'register-categorias', component: RegisterLogeadoCategoriasComponent, pathMatch: 'full'},
  {path: 'register-categorias/:id', component: RegisterLogeadoCategoriasComponent, pathMatch: 'full'},
  {path: 'register-logeado-estudiante', component: RegisterLogeadoEstudiantesComponent, pathMatch: 'full'},
  {path: 'register-logeado-organizador', component: RegisterLogeadoOrganizadorComponent, pathMatch: 'full'},
  {path: 'register-sedes', component: RegisterLogeadoSedesComponent, pathMatch: 'full'},
  {path: 'register-sedes/:id', component: RegisterLogeadoSedesComponent, pathMatch: 'full'},


];
