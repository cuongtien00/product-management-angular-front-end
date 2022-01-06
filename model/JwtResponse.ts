export class JwtResponse{
  public id:number;
public token: string;
public name: string;
public avatar: string;
public roles: any;


  constructor(id:number,token: string, name: string,avatar: string, roles: any) {
    this.id = id;
    this.token = token;
    this.name = name;
    this.avatar = avatar
    this.roles = roles;
  }
}

