import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Movie } from '../../core/models/movie.model';
import { Observable, of } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private mockMovies: Movie[] = [
    {
      id: 1,
      title: 'Inception',
      releaseDate: '2010-07-16',
      rating: 8.8,
      poster: 'https://placeholder.com',
    },
    {
      id: 2,
      title: 'The Dark Knight',
      releaseDate: '2008-07-18',
      rating: 9.0,
      poster: 'https://placeholder.com',
    },
    {
      id: 3,
      title: 'Interstellar',
      releaseDate: '2014-11-07',
      rating: 8.6,
      poster: 'https://placeholder.com',
    },
    {
      id: 4,
      title: 'Avatar: The Way of Water',
      releaseDate: '2022-12-16',
      rating: 7.6,
      poster: 'https://placeholder.com',
    },
    {
      id: 5,
      title: 'Pulp Fiction',
      releaseDate: '1994-10-14',
      rating: 8.9,
      poster: 'https://placeholder.com',
    },
  ];

  constructor() {}

  getMovies(): Observable<Movie[]> {
    // Simulamos el retraso de red de un HttpClient real
    const movies$ = of(this.mockMovies);
    if (!isPlatformBrowser(this.platformId)) {
      return movies$;
    }
    return movies$.pipe(
      delay(800),
      catchError((error) => {
        console.error('Error cargando películas', error);
        throw error;
      }),
    );
  }
}
