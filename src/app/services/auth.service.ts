import { Injectable } from '@angular/core';

@Injectable()

export class AuthService {

  private MAX_AGE = 60 * 60 * 24 * 365 * 10;  // 31 days
  private COOKIE_NAME_STRAVA_OAUTH = '__trailscape_strava_oauth';

  constructor(
  ) {}


  public set token(token: string) {
    document.cookie = `${this.COOKIE_NAME_STRAVA_OAUTH}=${JSON.stringify(token)}; max-age=${this.MAX_AGE}; path=/`;
  }

  public get token() {
    try {
      return JSON.parse(this.fetchCookie(this.COOKIE_NAME_STRAVA_OAUTH));
    } catch {
      return null;
    }
  }

  deauthorise() {
    this.deleteCookie(this.COOKIE_NAME_STRAVA_OAUTH);
  }

  private fetchCookie(cookieName: string) {
    return document.cookie.split('; ').find(row => row.startsWith(cookieName)).split('=')[1];
  }

  private deleteCookie(cookieName: string) {
    document.cookie = `${cookieName}=; max-age=0; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"`;
  }

}
