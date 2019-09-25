import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { UserService } from "src/app/core/service/user.service";
import { FlashMessagesService } from "ngx-flash-messages";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.sass"]
})
export class RegisterComponent implements OnInit {
  registerForm;
  @Input() addEmployee: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private auth: AuthService
  ) {}

  onSubmit(registerData) {
    if (this.addEmployee) {
      this.service.addNewEmployee(registerData).subscribe(
        (response: any) => {
          this.flashMessagesService.show(
            "Registered Successfully you can now login",
            {
              classes: ["alert", "alert-success"]
            }
          );
        },
        (err: any) => {
          let errorString = err.error.message.map(x => x.msg);
          this.flashMessagesService.show(errorString, {
            classes: ["alert", "alert-danger"]
          });
        }
      );
    } else {
      this.service.register(registerData).subscribe(
        (response: any) => {
          this.router.navigate(["/login"]);

          this.flashMessagesService.show(
            "Registered Successfully you can now login",
            {
              classes: ["alert", "alert-success"]
            }
          );
        },
        (err: any) => {
          let errorString = err.error.message.map(x => x.msg);
          this.flashMessagesService.show(errorString, {
            classes: ["alert", "alert-danger"]
          });
        }
      );
    }
  }

  ngOnInit() {
    if (this.addEmployee) {
      this.registerForm = this.formBuilder.group({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        department: "",
        manager: ""
      });
    } else {
      this.registerForm = this.formBuilder.group({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        hrAssisstantCode: ""
      });
    }
  }
}
