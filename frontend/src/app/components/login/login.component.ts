import { Component, OnInit } from "@angular/core";
import { JarwisService } from "../../Services/jarwis.service";
import { TokenService } from "../../Services/token.service";

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

  constructor(private Jarwis: JarwisService, private Token: TokenService) {}

  onSubmit() {
    this.Jarwis.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
  }
  handleError(error) {
    this.error = error.error.error;
  }

  ngOnInit() {}
}
