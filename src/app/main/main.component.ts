import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  private stravaClientId = environment.STRAVA_CLIENT_ID;

  constructor(
    private http: HttpService,
    private activatedRoute: ActivatedRoute
   ) {}

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe( (params) => {

      if (params.code) {

        this.http.stravaGetToken(params.code).subscribe(
          (token) => {
            console.log(token);

            const endDate = new Date();
            const startDate = new Date();
            startDate.setMonth(endDate.getMonth() - 3);

            this.http.stravaListActivities(endDate, startDate, token.access_token).subscribe(
              (activities) => {
                console.log(activities);
              }
            );
          }
        );

      }
    });
  }

  onBtnClick() {

    window.location.href =
      `https://www.strava.com/oauth/authorize?client_id=${this.stravaClientId}` +
      '&redirect_uri=http://localhost:4200&response_type=code&scope=activity:read';

    // https://www.strava.com/oauth/authorize?
    // client_id=YOUR_CLIENT_ID&
    // redirect_uri=YOUR_CALLBACK_DOMAIN&
    // response_type=code&
    // scope=YOUR_SCOPE

    // console.log('click');
    // const endDate = new Date();
    // const startDate = new Date();
    // startDate.setMonth(endDate.getMonth() - 3);
    // console.log(endDate, startDate);
    // this.http.stravaListActivities(endDate, startDate).subscribe(
    //   (response) => { console.log(response); },
    //   (error) => {
    //     // console.log(error);
    //     // this.alert.showAsElement(`${error.name}: ${error.name} `, error.message, true, false).subscribe( () => {});
    //   }
    // );
  }


}
