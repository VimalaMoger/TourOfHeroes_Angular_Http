import { Component, numberAttribute, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';


//Component is decorator function that specifies the Angular metadata for the component
//added FormsModule for adding ngModel in the template
@Component({
  selector: 'app-heroes',  //app-heroes is the element selector for the HeroesComponent
  standalone: true,
  imports: [CommonModule, FormsModule, HeroDetailComponent, RouterModule],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})

export class HeroesComponent implements OnInit{  
 
 //defines hero array
  heroes: Hero[] = [];   //HEROES;
heroName: any;
  
  //expects angular to inject the HeroService into heroService variable
  constructor(private heroService: HeroService){}
  
  ngOnInit():void {
    this.getHeroes();    
  } 
   
  //subscribe passes the emitted array to the callback, which sets the component's heroes property
  getHeroes(): void{
    this.heroService.getHeroes().subscribe(heroes => this.heroes =heroes);
  }

    //add a new hero
  hero:Hero = {id: 0, name: ''};
  add(){
    //this.hero.name =this.hero.name?.trim();
    if (!this.hero.name) { return; }
    
    this.heroService.addHero(this.hero)
          .subscribe(hero => {
            this.heroes.push(hero);
          });
    //this.heroes.push(this.hero);
    }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
