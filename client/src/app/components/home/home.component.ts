import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

username;
user;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      if (!profile.success == false)
        this.username = profile.user.username
        else{
          this.user = 'user' 
        }
    })
  }
  goToLogin= function () {
    this.router.navigateByUrl('/login');
};
  goToRegister= function () {
    this.router.navigateByUrl('/register');
};

}
