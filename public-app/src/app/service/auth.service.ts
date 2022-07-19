import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface loginDTO {
  username: string,
  password: string
}

interface registerDTO {
  username: string,
  email: string,
  password: string,
  name: string,
  surname: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService{

  constructor(private http: HttpClient){}

  loginUser(data: loginDTO){
    this.http.post('http://localhost:8000/auth/login', data).subscribe(data => {
      console.log(data);
    });
  }
}