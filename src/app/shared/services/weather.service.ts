import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Weather } from '../../core/models/weather.model';
import { Observable, of } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);

  private mockWeather: Weather[] = [
    {
      id: 1,
      city: 'Bogotá',
      temperature: 14,
      condition: 'Lluvioso',
      icon: 'cloud_queue',
    },
    {
      id: 2,
      city: 'Madrid',
      temperature: 26,
      condition: 'Soleado',
      icon: 'wb_sunny',
    },
    {
      id: 3,
      city: 'Miami',
      temperature: 30,
      condition: 'Húmedo',
      icon: 'beach_access',
    },
    {
      id: 4,
      city: 'Londres',
      temperature: 12,
      condition: 'Nublado',
      icon: 'filter_drama',
    },
    {
      id: 5,
      city: 'Tokyo',
      temperature: 19,
      condition: 'Despejado',
      icon: 'brightness_5',
    },
  ];

  constructor() {}

  getWeather(): Observable<Weather[]> {
    return of(this.mockWeather).pipe(
      delay(800),
      catchError((error) => {
        console.error('Error cargando clima', error);
        throw error;
      }),
    );
  }
}
