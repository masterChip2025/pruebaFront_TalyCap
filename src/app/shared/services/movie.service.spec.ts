import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { Movie } from '../../core/models/movie.model';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService],
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debe retornar un listado de películas (mock)', (done) => {
    service.getMovies().subscribe((movies: Movie[]) => {
      expect(movies.length).toBeGreaterThan(0);
      expect(movies[0].title).toBe('Inception');
      done(); // Notifica a Jasmine que la suscripción asíncrona terminó
    });
  });
});
