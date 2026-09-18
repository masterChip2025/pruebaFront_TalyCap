import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { MovieService } from '../../../shared/services/movie.service';
import { WeatherService } from '../../../shared/services/weather.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let movieServiceMock: any;
  let weatherServiceMock: any;
  let snackBarMock: any;

  beforeEach(async () => {
    movieServiceMock = {
      getMovies: jasmine.createSpy('getMovies').and.returnValue(
        of([
          {
            id: 1,
            title: 'Superman',
            releaseDate: '2025-01-01',
            rating: 9,
            poster: '',
          },
        ]),
      ),
    };

    weatherServiceMock = {
      getWeather: jasmine
        .createSpy('getWeather')
        .and.returnValue(
          of([
            { city: 'Bogota', temperature: 20, condition: 'Soleado', icon: '' },
          ]),
        ),
    };

    snackBarMock = {
      open: jasmine.createSpy('open'),
    };

    await TestBed.configureTestingModule({
      imports: [HomeComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: Verificar carga de datos al iniciar el ciclo de vida
  it('debe cargar los datos de películas y clima al inicializar', () => {
    expect(movieServiceMock.getMovies).toHaveBeenCalled();
    expect(weatherServiceMock.getWeather).toHaveBeenCalled();

    // Validar que las tablas recibieron la información simulada
    expect(component.movieDataSource.data.length).toBe(1);
    expect(component.movieDataSource.data[0].title).toBe('');
  });

  // Test 3: Verificar que el filtro altera el estado del DataSource
  it('debe aplicar filtros correctamente al escribir', () => {
    const miEvento = { target: { value: 'Incept' } } as unknown as Event;

    component.applyFilter(miEvento, 'movie');

    expect(component.movieDataSource.filter).toBe('incept');
  });
});
