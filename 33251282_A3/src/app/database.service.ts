import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = "/33251282/Zhi'En/api/v1";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }), 
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  getDrivers() {
    return this.http.get(API_URL + '/drivers');
  }

  createDriver(aDriver: any) {
    return this.http.post(API_URL + '/drivers/add', aDriver, httpOptions); 
  }

  deleteDriver(id: string) {
    return this.http.delete(API_URL + '/drivers/delete?id=' + id);
  }

  updateDriver(aDriver: any) {
    return this.http.put(API_URL + '/drivers/update', aDriver, httpOptions);
  }

  getPackages() {
    return this.http.get(API_URL + '/packages');
  }

  createPackage(aPackage: any) {
    return this.http.post(API_URL + '/packages/add', aPackage, httpOptions); 
  }

  deletePackage(id: string) {
    return this.http.delete(API_URL + '/packages/delete/' + id);
  }

  updatePackage(aPackage: any) {
    return this.http.put(API_URL + '/packages/update', aPackage, httpOptions);
  }

  loginUser(aUser: any) {
    return this.http.post(API_URL + '/login', aUser, httpOptions);
  }

  signupUser(aUser: any) {
    return this.http.post(API_URL + '/signup', aUser, httpOptions);
  }

  getStats() {
    return this.http.get(API_URL + '/stats');
  }
}