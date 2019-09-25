import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BenefitsApi } from "../data/benefits";

@Injectable({
  providedIn: "root"
})
export class BenefitService implements BenefitsApi {
  /**
   * This service is responsible for all CRUD requests
   */

  // backend URI and endpoint API
  private backendUrl = "http://localhost:3000/";
  private endpoint = "benefit";

  constructor(private http: HttpClient) {}

  //  Get all benefits
  getAllBenefits() {
    return this.http.get(`${this.backendUrl + this.endpoint}/all`);
  }

  // Add a new Log
  addBenefit(newBenefit: any) {
    console.log(newBenefit);
    return this.http.post(
      `${this.backendUrl + this.endpoint}/save`,
      newBenefit
    );
  }

  editBenefit(editedBenefit: any) {
    console.log(editedBenefit);
    return this.http.put(
      `${this.backendUrl + this.endpoint}/edit/${editedBenefit._id}`,
      editedBenefit
    );
  }

  deleteBenefit(benefit: any) {
    console.log(benefit);
    return this.http.delete(
      `${this.backendUrl + this.endpoint}/delete/${benefit.data._id}`
    );
  }
}
