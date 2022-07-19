export default class User {
  username: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  
  constructor(username: string){
    this.username = username;
  }
}