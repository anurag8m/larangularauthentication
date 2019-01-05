import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { JarwisService } from "../../../Services/jarwis.service";

@Component({
  selector: "app-response-reset",
  templateUrl: "./response-reset.component.html",
  styleUrls: ["./response-reset.component.scss"]
})
export class ResponseResetComponent implements OnInit {
  public error = [];

  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  };

  constructor(private route: ActivatedRoute, private Jarwis: JarwisService) {
    route.queryParams.subscribe(params => {
      this.form.resetToken = params["token"];
    });
  }

  onSubmit() {
    this.Jarwis.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {}
  handleError(error) {}
  ngOnInit() {}
}
