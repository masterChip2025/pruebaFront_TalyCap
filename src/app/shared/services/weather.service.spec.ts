import { TestBed } from '@angular/core/testing';
import { Weather } from '../../core/models/weather.model';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse el servicio correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe retornar el listado de ciudades con su clima (mock)', (done: DoneFn) => {
    service.getWeather().subscribe({
      next: (weatherList: Weather[]) => {
        expect(weatherList.length).toBe(5);

        expect(weatherList[0].city).toBe('Bogotá');
        expect(weatherList[0].temperature).toBe(14);
        expect(weatherList[0].condition).toBe('Lluvioso');
        expect(weatherList[0].icon).toBe('cloud_queue');

        expect(weatherList[1].city).toBe('Madrid');
        expect(weatherList[1].condition).toBe('Soleado');

        done();
      },
      error: (fail) => {
        fail('El observable no debió haber arrojado un error');
        done();
      },
    });
  });
});
