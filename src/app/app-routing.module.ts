import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*Components*/
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/main/home/home.component';
import { DashboardComponent } from './components/main/dashboard/dashboard.component';
import { LightComponent } from './components/main/light/light.component';
import { DoorComponent } from './components/main/door/door.component';
import { OtherComponent } from './components/main/other/other.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthLoginGuard } from './guards/auth-login.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthLoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthLoginGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', redirectTo: '/home/dashboard', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'lights', component: LightComponent, canActivate: [AuthGuard] },
      { path: 'doors', component: DoorComponent, canActivate: [AuthGuard] },
      { path: 'others', component: OtherComponent, canActivate: [AuthGuard] },
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
