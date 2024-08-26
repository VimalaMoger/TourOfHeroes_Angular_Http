import { Component, Input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';



@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})

export class HeroDetailComponent {
  
  //defines hero array
  heroes: Hero[] = [];
  hero : Hero | undefined;

  //ActivatedRoute - holds information about the route("id" parameter)
  constructor(private route: ActivatedRoute, private heroService: HeroService, private location:Location){}

  ngOnInit(): void {
    this.getHero();
  }
  
/*   getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getServiceHero(id)
      .subscribe(hero => this.hero = hero);
  } */
  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.heroService.getServiceHero(id)
    .subscribe(hero => this.hero = hero);
  }  

  goBack(): void {
    this.location.back();
  }
   
  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  } 

}
