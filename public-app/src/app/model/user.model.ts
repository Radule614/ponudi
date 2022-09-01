export class User {
  _id: string;
  username: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  roles?: string[];
  
  constructor(username: string){
    this.username = username;
  }
}