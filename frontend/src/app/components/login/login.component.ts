import { Component, OnInit } from "@angular/core";
import { JarwisService } from "../../Services/jarwis.service";
import { TokenService } from "../../Services/token.service";
import { Router } from "@angular/router";
import { AuthService } from "../../Services/auth.service";
import { SnotifyService } from "ng-snotify";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public form = {
    email: null,
    password: null
  };

  public error = null;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private Notify: SnotifyService,
    private spinner: NgxSpinnerService
  ) {}

  onSubmit() {
    this.spinner.show();
    this.Jarwis.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.spinner.hide();
    this.router.navigateByUrl("/profile");
  }
  handleError(error) {
    this.spinner.hide();
    this.error = error.error.error;
  }

  ngOnInit() {}
}
