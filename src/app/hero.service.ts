
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { catchError, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class HeroService {
  
  private heroesUrl = 'api/heroes';  // URL to web api

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

  constructor(private http: HttpClient) { }
     
  //Observable used to wait for service to return data   
  getServiceHero(id: number): Observable<Hero> {
    const url =`${this.heroesUrl}/${id}`;
      return this.http.get<Hero>(url).pipe(
        tap(_ => console.log('fetched hero id =${id}')),
        catchError(this.handleError<Hero>('getHero id = ${id'))
      );
  } 

  //get the heroes from the server, InMemoryDataService class that primes the in-memory database.
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_=> console.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }
  
  /* PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => console.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
    }  

  /* ADD: add the hero on the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => console.log(`added hero id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero:Hero): Observable<Hero> {
    const id = hero.id;
    const url = `${this.heroesUrl}/${id}`;
  
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term:string):Observable<Hero[]>{
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ? console.log(`found "${term}"`): console.log(`no heroes matching "${term}"`))
      ,catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
    }

  /* Handle Http operation that failed. Let the app continue
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}