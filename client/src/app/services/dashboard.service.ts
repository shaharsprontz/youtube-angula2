import { Injectable } from '@angular/core';
import { HttpModule, Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable()
export class DashboardService {
  constructor(public http: Http, private authService: AuthService) {}

  removeFromDb(){
	return new Promise((resolve, reject) => {
		$('.remove-from-dashboard').click(function (event) {
			var removeSelectedVid = $(event.target).prev('iframe').attr('src')
			// console.log(selectedVid)
			return resolve(removeSelectedVid)  	
			})
		  })
  }

}