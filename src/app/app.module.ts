import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { Ng2CompleterModule } from "ng2-completer";
import { MatIconModule } from "@angular/material/icon";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FlashMessagesModule } from "ngx-flash-messages";

import { ChatService } from "./core/service/chat.service";

import { AppComponent } from "./app.component";

import { CoreModule } from "./core/core.module";
import { BenefitTableComponent } from "./components/benefit-table/benefit-table.component";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { ChatBoxComponent } from "./components/chat-box/chat-box.component";
import { MainDashboardComponent } from "./components/main-dashboard/main-dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthInterceptor } from "./auth/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    BenefitTableComponent,
    EmployeeListComponent,
    ChatBoxComponent,
    MainDashboardComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule.forRoot(),
    Ng2SmartTableModule,
    Ng2CompleterModule,
    MatIconModule,
    NoopAnimationsModule,
    FlashMessagesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ChatService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ChatBoxComponent]
})
export class AppModule {}
