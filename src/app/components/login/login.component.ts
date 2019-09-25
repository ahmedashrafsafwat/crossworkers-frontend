import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { UserService } from "src/app/core/service/user.service";
import { FlashMessagesService } from "ngx-flash-messages";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"]
})
export class LoginComponent implements OnInit {
  loginForm;

  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private auth: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: "",
      password: ""
    });
  }

  onSubmit(loginData) {
    this.service.login(loginData).subscribe(
      (response: any) => {
        this.router.navigate(["/dashboard"]);

        this.auth.setToken(response.user.token);
        this.auth.setUserData(
          response.user._id,
          response.user.username,
          response.user.email,
          response.user.role
        );
        this.flashMessagesService.show("Logged IN Successfully", {
          classes: ["alert", "alert-success"]
        });
      },
      (err: any) => {
        let errorString = err.error.message.map(x => x.msg);
        this.flashMessagesService.show(errorString, {
          classes: ["alert", "alert-danger"]
        });
      }
    );
  }

  ngOnInit() {}
}
