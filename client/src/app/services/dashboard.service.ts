import { Injectable } from '@angular/core';
import { HttpModule, Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable()
export class DashboardService {
  constructor(public http: Http, private authService: AuthService) {}

  removeFromDb(){
	return new Promise((resolve, reject) => {
		$(document).on('click', '.remove-from-dashboard' ,function (event) {
			var removeSelectedVid = $(event.target).prev('iframe').attr('src')
			console.log(removeSelectedVid)
			$(document).on('click', '.remove-from-dashboard', function(){
				$(this).closest('div').fadeOut('slow');
			})
			return resolve(removeSelectedVid)  	
			})
		})
  }

}