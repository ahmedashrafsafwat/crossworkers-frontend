import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-main-dashboard",
  templateUrl: "./main-dashboard.component.html",
  styleUrls: ["./main-dashboard.component.sass"]
})
export class MainDashboardComponent implements OnInit {
  currentUserName = localStorage.getItem("username");
  currentEmail = localStorage.getItem("email");
  currentRole = localStorage.getItem("role");
  constructor() {}

  ngOnInit() {}
}
