import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { UsersApi } from "../data/users";

@Injectable({
  providedIn: "root"
})
export class UserService implements UsersApi {
  /**
   * This service is responsible for all CRUD requests
   */

  // backend URI and endpoint API
  private backendUrl = "http://localhost:3000/";
  private endpoint = "user";

  constructor(private http: HttpClient) {}

  //  Get all employees
  getEmployees() {
    return this.http.get(`${this.backendUrl}employee/all`);
  }

  // Login user
  login(loginData: Object) {
    console.log(loginData);
    return this.http.post(
      `${this.backendUrl + this.endpoint}/login`,
      loginData
    );
  }

  // Add a new Log
  register(newUser: Object) {
    console.log("from the service newLog:", newUser);
    return this.http.post(`${this.backendUrl + this.endpoint}/signup`, newUser);
  }

  addNewEmployee(newEmployee: Object) {
    return this.http.post(
      `${this.backendUrl}hr-assistant/add-employee/`,
      newEmployee
    );
  }
}
