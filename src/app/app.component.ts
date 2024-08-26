import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HeroesComponent, HeroDetailComponent, RouterOutlet, RouterModule,HttpClientInMemoryWebApiModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
 
export class AppComponent {
  title = 'Tour of Heroes';

}

