import { AuthService } from './../services/auth.service';
import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {


  constructor(
    private http: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public auth: AuthService
   ) {}

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe( (params) => {

      if (params.code) {
        console.log(params.code);

        this.http.stravaGetToken(params.code).subscribe(
          (token) => {

            this.auth.token = token.access_token;
            this.router.navigate(['']);

          }
        );

      }

    });
  }

  onAuthClick() {
    // redirect to strava API authorisation
    window.location.replace(this.http.stravaAuthUrl);
  }

  onDeAuthClick() {
    this.auth.deauthorise();
    this.router.navigate(['']);
  }

  onGetClick() {

    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - 3);

    this.http.stravaListActivities(endDate, startDate, this.auth.token).subscribe(
      (activities) => {
        console.log(activities);
      }
    );
  }


}
