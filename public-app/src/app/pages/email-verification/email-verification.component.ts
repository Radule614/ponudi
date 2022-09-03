import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { take } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

enum VerificationStatus { INPROGRESS, SUCCESS, FAILED };

@Component({
  selector: 'app-email-verification',
  templateUrl: 'email-verification.component.html',
  styleUrls: ['email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
  status: VerificationStatus = VerificationStatus.SUCCESS;
  Status = VerificationStatus;

  constructor(private authService: AuthService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.authService.emailVerification(this.route.snapshot.queryParams['token']).pipe(take(1)).subscribe({
      next: _ => {
        this.status = VerificationStatus.SUCCESS
      },
      error: _ => {
        this.status = VerificationStatus.FAILED;
      }
    });
  }

  resendVerification(): void {
    this.authService.resendEmailVerification("123").pipe(take(1)).subscribe({
      next: response => {
        console.log(response);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}