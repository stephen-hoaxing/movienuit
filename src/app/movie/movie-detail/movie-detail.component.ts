import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from '../models/movie.model';
import { NavbarService } from 'src/app/navbar/services/navbar.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  id: number;
  movie: Movie;
  movieSub$: Subscription;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private navbarService: NavbarService
  ) {}

  ngOnDestroy(): void {
    this.movieSub$.unsubscribe();
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.movieSub$ = this.movieService.movieFromHttp(this.id).subscribe((m) => {
      this.movie = m;
      this.navbarService.title.next(m.name);
    });
  }
}
