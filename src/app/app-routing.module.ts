import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import components
import { BenefitTableComponent } from "./components/benefit-table/benefit-table.component";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { ChatBoxComponent } from "./components/chat-box/chat-box.component";
import { MainDashboardComponent } from "./components/main-dashboard/main-dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

const routes: Routes = [
  { path: "dashboard", component: MainDashboardComponent },
  { path: "", component: LoginComponent },
  { path: "register", component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
