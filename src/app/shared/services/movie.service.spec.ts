import { TestBed } from '@angular/core/testing';
import { MovieService } from './movie.service';
import { Movie } from '../../core/models/movie.model';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieService);
  });

  it('debe crearse correctamente el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debe retornar la lista de películas con sus propiedades requeridas', (done) => {
    service.getMovies().subscribe({
      next: (movies: Movie[]) => {
        // Validamos que devuelva datos
        expect(movies.length).toBeGreaterThan(0);

        // Validamos que el primer elemento tenga la estructura del modelo
        const primeraPelicula = movies[0];
        expect(primeraPelicula.title).toBeDefined();
        expect(primeraPelicula.rating).toBeDefined();
        expect(primeraPelicula.poster).toContain('http');

        done(); // Indica a Jasmine que la suscripción asíncrona terminó
      },
    });
  });
});
