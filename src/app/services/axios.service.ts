import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  getPokemonPage(page: number, pageSize: number): Observable<any> {
    const offset = (page - 1) * pageSize;
    return Observable.create(
      (observer: {
        next: (arg0: { data: any; totalItems: any }) => void;
        complete: () => void;
        error: (arg0: any) => void;
      }) => {
        axios
          .get(`${this.apiUrl}/pokemon?offset=${offset}&limit=${pageSize}`)
          .then((response) => {
            observer.next({
              data: response.data.results,
              totalItems: response.data.count,
            });
            observer.complete();
          })
          .catch((error) => {
            observer.error(error);
          });
      }
    );
  }

  getPokemonDetail(name: string) {
    return axios.get(`${this.apiUrl}/pokemon/${name}`)
  }

  getPokemonAbilities(url: string) {
    return axios.get(`${url}`)
  }

  capitalizeFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

}
