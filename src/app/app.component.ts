import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {AuthService} from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private primeConfig: PrimeNGConfig, private authService: AuthService) {
  }

  ngOnInit() {
    this.primeConfig.ripple = true;
    this.authService.loadFromStorage().subscribe();
  }
}
