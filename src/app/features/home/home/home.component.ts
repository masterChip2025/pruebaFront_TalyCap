import {
  Component,
  DestroyRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../shared/services/movie.service';
import { WeatherService } from '../../../shared/services/weather.service';
import { Movie } from '../../../core/models/movie.model';
import { Weather } from '../../../core/models/weather.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private movieService = inject(MovieService);
  private weatherService = inject(WeatherService);
  private snackBar = inject(MatSnackBar);
  private destroyRef = inject(DestroyRef);

  movieDataSource = new MatTableDataSource<Movie>([]);
  weatherDataSource = new MatTableDataSource<Weather>([]);

  // Columnas a mostrar
  movieColumns: string[] = ['title', 'releaseDate', 'rating', 'poster'];
  weatherColumns: string[] = ['city', 'temperature', 'condition', 'icon'];

  isLoading = false;
  currentTab = 0;

  @ViewChild('moviePaginator') set moviePaginator(mp: MatPaginator) {
    this.movieDataSource.paginator = mp;
  }
  @ViewChild('weatherPaginator') set weatherPaginator(wp: MatPaginator) {
    this.weatherDataSource.paginator = wp;
  }

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData() {
    this.isLoading = true;

    forkJoin({
      movies: this.movieService.getMovies(),
      weather: this.weatherService.getWeather(),
    })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe({
        next: ({ movies, weather }) => {
          this.movieDataSource.data = movies;
          this.weatherDataSource.data = weather;

          this.movieDataSource.filterPredicate = (
            data: Movie,
            filter: string,
          ) => {
            return data.title.toLowerCase().includes(filter);
          };
        },
        error: (err) => {
          this.snackBar.open(
            'Error al cargar los datos de los servicios',
            'Cerrar',
            { duration: 4000 },
          );
        },
      });
  }

  onTabChange(tabIndex: number) {
    this.currentTab = tabIndex;
  }

  applyFilter(event: Event, type: 'movie' | 'weather') {
    const filterValue = (event.target as HTMLInputElement).value;
    if (type === 'movie') {
      this.movieDataSource.filter = filterValue.trim().toLowerCase();
    } else {
      this.weatherDataSource.filter = filterValue.trim().toLowerCase();
    }
  }
}
