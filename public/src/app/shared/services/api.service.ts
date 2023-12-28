import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly API_BASE_URL: string = environment.API_BASE_URL;

  constructor(private http: HttpClient) { }

  /**
   * 
   * @param path 
   * @returns 
   */
  GET(path: string) {
    return this.http.get(`${this.API_BASE_URL}${path}`);
  }

  /**
   * 
   * @param path 
   * @param data 
   * @returns 
   */
  POST(path: string, data: any) {
    return this.http.post(`${this.API_BASE_URL}${path}`, data);
  }

  /**
   * 
   * @param path 
   * @param data 
   * @returns 
   */
  PUT(path: string, data: any) {
    return this.http.put(`${this.API_BASE_URL}${path}`, data);
  }

  /**
   * 
   * @param path 
   * @param data 
   * @returns 
   */
  PATCH(path: string, data: any) {
    return this.http.patch(`${this.API_BASE_URL}${path}`, data);
  }

  /**
   * 
   * @param path 
   * @returns 
   */
  DELETE(path: string) {
    return this.http.delete(`${this.API_BASE_URL}${path}`);
  }
}
