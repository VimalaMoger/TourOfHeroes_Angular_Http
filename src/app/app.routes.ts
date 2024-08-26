import { Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';


export const routes: Routes = [

    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, //Adding a default route
    { path : 'heroes', component : HeroesComponent},
    { path: 'detail/:id', component: HeroDetailComponent },   //:id is a placeholder for a specific hero id
    { path: 'dashboard', component: DashboardComponent }
   
    ];