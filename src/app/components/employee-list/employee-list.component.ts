import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { UserService } from "src/app/core/service/user.service";
import { FlashMessagesService } from "ngx-flash-messages";
import { ChatBoxComponent } from "../chat-box/chat-box.component";
@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.sass"]
})
export class EmployeeListComponent implements OnInit {
  employees = [];

  constructor(
    private service: UserService,
    private flashMessagesService: FlashMessagesService,
    private resolver: ComponentFactoryResolver
  ) {
    this.service.getEmployees().subscribe(
      (response: any) => {
        // remove this user from employees list
        let employeesArr = response.data;
        employeesArr = employeesArr.filter(
          employee => employee._id != localStorage.getItem("id")
        );
        this.employees = employeesArr;
      },
      err => {
        // An error occured
        this.flashMessagesService.show(err.error.message, {
          classes: ["alert", "alert-danger"]
        });
      }
    );
  }

  componentRef: any;

  @ViewChild("chatContainer", { static: false, read: ViewContainerRef })
  entry: ViewContainerRef;

  createComponent(to, toId) {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(ChatBoxComponent);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.to = to;
    this.componentRef.instance.toId = toId;
  }

  destroyComponent(event) {
    console.log("PRESSED2", event);
    this.componentRef.destroy();
  }
  ngOnInit() {}
}
