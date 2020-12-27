import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { movies, Movie } from '../models/movie.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private ROOT_URL: string = 'http://localhost:3000/movies';

  constructor(private http: HttpClient) {}

  getMoviesFromHttp(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.ROOT_URL).pipe(this.addDelay);
  }

  movieFromHttp(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.ROOT_URL}/${id}`);
  }

  addMovie(movie: Movie) {
    return this.http.post(this.ROOT_URL, movie);
  }

  getMovies() {
    return of(movies);
  }

  movie(id: number): Observable<Movie> {
    return of(movies.find((movie) => movie.id === id));
  }

  addDelay(obs: Observable<any>): Observable<any> {
    return obs.pipe(delay(1000));
  }
}
