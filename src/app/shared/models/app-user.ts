import {UserType} from "./user-type";
import {JwtHelperService} from "@auth0/angular-jwt";

export class AppUser {
  userId!: string;
  accessToken!: string;
  refreshToken!: string | null;
  expires!: Date;
  scope!: string[];
  userType!: UserType;
  displayName: string = '';
  profileImage: string = '';
  permissions: number[] = [];
  stayLoggedIn: boolean;

  constructor (accessToken: string, refreshToken: string | null, stayLoggedIn: boolean = false) {
    this.updateTokens(accessToken, refreshToken);
    this.stayLoggedIn = stayLoggedIn;
  }

  updateTokens(accessToken: string, refreshToken: string | null) {
    let jwtHelper = new JwtHelperService();
    let token = jwtHelper.decodeToken(accessToken);
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.userId = token.sub;
    this.scope = token.scope;
    this.expires = new Date(token.exp * 1000);
    this.userType = parseInt(token.type);
  }
}
