import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class JarwisService {
  private BaseUrl = "http://localhost:8000/api";
  constructor(private http: HttpClient) {}

  signup(data) {
    return this.http.post(`${this.BaseUrl}/signup`, data);
  }

  login(data) {
    return this.http.post(`${this.BaseUrl}/login`, data);
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.BaseUrl}/sendPasswordResetLink`, data);
  }
  changePassword(data) {
    return this.http.post(`${this.BaseUrl}/resetPassword`, data);
  }
}
