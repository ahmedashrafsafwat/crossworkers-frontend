import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public getToken(): string {
    return localStorage.getItem("token");
  }

  public setToken(token: string) {
    localStorage.setItem("token", token);
  }

  public setUserData(id: string, username: string, email, role: string) {
    localStorage.setItem("id", id);
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
  }
}
