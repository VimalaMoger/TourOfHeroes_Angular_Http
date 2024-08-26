import { Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.css'
})
export class HeroSearchComponent {
  //declaring heroes$ as observable
  heroes$!: Observable<Hero[]>;

  //RxJS Subject is both a source of observable values and an Observable itself, call next for next value
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  //search hero by name
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  //RXJS Operators in ngOnInit()
  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
