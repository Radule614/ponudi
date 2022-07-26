export class User {
  _id: string;
  username: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  
  constructor(username: string){
    this.username = username;
  }
}