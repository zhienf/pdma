import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = "/33251282/Zhi'En/api/v1/";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }), 
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  createCar(car: any) {
    return this.http.post(API_URL + '/cars', car, httpOptions); 
  }

  getCars() {
    return this.http.get(API_URL + '/cars');
  }

  deleteCar(id: string) {
    return this.http.delete(API_URL + '/cars/' + id);
  }

  createDriver(driver: any) {
    return this.http.post(API_URL + '/drivers/add', driver, httpOptions); 
  }

  getDrivers() {
    return this.http.get(API_URL + '/drivers');
  }

  deleteDriver(id: string) {
    return this.http.delete(API_URL + '/drivers/delete?id=' + id);
  }
}
