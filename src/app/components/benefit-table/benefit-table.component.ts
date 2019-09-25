import { Component, OnInit } from "@angular/core";

import { BenefitService } from "../../core/service/benefit.service";

import { FlashMessagesService } from "ngx-flash-messages";

@Component({
  selector: "app-log-table",
  templateUrl: "./benefit-table.component.html",
  styleUrls: ["./benefit-table.component.sass"]
})
export class BenefitTableComponent implements OnInit {
  /**
   *  ng2-smart-table package helps in pagination, sorting,adding,editing ,data in the table
   *  so we need to set the settings for the columns and path it to the <ng2-smart-table> tag
   */
  actions;
  settings;

  data = [];

  constructor(
    private service: BenefitService,
    private flashMessagesService: FlashMessagesService
  ) {
    console.log("ROLE:", localStorage.getItem("role"));
    // add or remove actions
    if (localStorage.getItem("role") == "hr-assisstant") {
      console.log("here");
      this.actions = {
        add: true,
        edit: true,
        delete: true
      };
    } else {
      this.actions = {
        add: false,
        edit: false,
        delete: false
      };
    }

    // ng2-smart-table settigns
    this.settings = {
      actions: this.actions,
      add: {
        confirmCreate: true,
        addButtonContent: "<i class='material-icons'>add</i>",
        createButtonContent: "<i class='material-icons'>done</i>",
        cancelButtonContent: "<i class='material-icons'>cancel</i>"
      },
      edit: {
        confirmSave: true,
        editButtonContent: "<i class='material-icons'>create</i>",
        saveButtonContent: "<i class='material-icons'>done</i>",
        cancelButtonContent: "<i class='material-icons'>cancel</i>"
      },
      delete: {
        deleteButtonContent: "<i class='material-icons'>delete</i>",
        confirmDelete: true
      },
      columns: {
        benefitType: {
          title: "Benefit Type"
        },
        benefitName: {
          title: "Benefit Name"
        },
        benefitDescription: {
          title: "Description"
        }
      }
    };
    // Get all the logs when the component is loaded
    this.service.getAllBenefits().subscribe(
      (response: any) => {
        // save the data locally and put it to the table
        console.log(response);

        // Check if we got a success response and a data
        if (response.data && response.data.length > 0) {
          this.data = response.data;

          // Show flash Message
          this.flashMessagesService.show(response.message, {
            classes: ["alert", "alert-success"]
          });
        } else {
          console.log(response.message);
          // An error occured
          this.flashMessagesService.show(
            "An error occured please try again later",
            {
              classes: ["alert", "alert-danger"]
            }
          );
        }
      },
      err => {
        console.log(err);
        this.flashMessagesService.show(err.error.message, {
          classes: ["alert", "alert-danger"]
        });
      }
    );
  }

  ngOnInit() {}

  // Add a new Benefit
  createConfirm(event): void {
    console.log(event);
    // Call the add log service
    this.service.addBenefit(event.newData).subscribe(
      (response: any) => {
        // Show flash Message
        this.flashMessagesService.show(response.message, {
          classes: ["alert", "alert-success"]
        });

        // Add dynamicly to the table
        event.confirm.resolve();
      },
      err => {
        // formating error message
        const errMessageArr = err.error.message.map(x => x.msg);
        const errMessageFormated = errMessageArr.map(
          errMessage => "* " + errMessage
        );
        const errMessageStr = errMessageFormated.join("\n");

        console.log(errMessageStr);

        // Show flash Message
        this.flashMessagesService.show(errMessageStr, {
          classes: ["alert", "alert-danger"]
        });
      }
    );
  }

  // Delete log
  onDeleteConfirm(event: any): void {
    if (window.confirm("Are you sure you want to delete?")) {
      this.service.deleteBenefit(event).subscribe(
        (response: any) => {
          console.log(response);
          this.flashMessagesService.show(response.message, {
            classes: ["alert", "alert-success"]
          });
          event.confirm.resolve();
        },
        (err: any) => {
          this.flashMessagesService.show(err.message, {
            classes: ["alert", "alert-success"]
          });
          console.log(err);
        }
      );
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  //edit log
  editConfirm(event: any): void {
    console.log(event);
    this.service.editBenefit(event.newData).subscribe(
      (response: any) => {
        console.log(response);
        this.flashMessagesService.show(response.message, {
          classes: ["alert", "alert-success"]
        });
        event.confirm.resolve();
      },
      (err: any) => {
        this.flashMessagesService.show(err.message, {
          classes: ["alert", "alert-success"]
        });
        console.log(err);
      }
    );
  }
}
