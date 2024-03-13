import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent {

  constructor(private route: Router) { }

  continueOrdering() {
    this.route.navigate(['/customer-dashboard']);
  }
}
