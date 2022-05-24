import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpService {

  private backendDomain = 'http://localhost:4200';
  private stravaApiUrl = 'https://www.strava.com/';
  private stravaClientId = environment.STRAVA_CLIENT_ID;
  private stravaClientSecret = environment.STRAVA_CLIENT_SECRET;
  public stravaAuthUrl = `${this.stravaApiUrl}/oauth/authorize?client_id=${this.stravaClientId}` +
      `&redirect_uri=${this.backendDomain}&response_type=code&scope=activity:read`;

  constructor(
    private http: HttpClient,
    private error: ErrorService
  ) {}


  stravaGetToken(authCode: string) {
    return this.http
    .post<any>(`https://www.strava.com/oauth/token?`+
        `client_id=${this.stravaClientId}&` +
        `client_secret=${this.stravaClientSecret}&` +
        `code=${authCode}&` +
        `grant_type=authorization_code`, '')
    .pipe( catchError(this.error.handleError) );
  }

  stravaListActivities(dateStart: Date, dateEnd: Date, stravaToken: string) {

    const before = Math.floor(dateStart.getTime() / 1000);
    const after = Math.floor(dateEnd.getTime() / 1000);

    return this.http
      .get<any>(`${this.stravaApiUrl}api/v3/athlete/activities?before=${before}&after=${after}&page=1&per_page=30`,
      // {headers: {header: `Authorization: Bearer ${stravaToken}`}})
      {headers: new HttpHeaders().set('Authorization', `Bearer ${stravaToken}`)})
      .pipe( catchError(this.error.handleError) );

  }

}
