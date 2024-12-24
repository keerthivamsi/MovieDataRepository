import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss'
})
export class ProfileViewComponent {
  profileData: any;
  imagePath: string = "";
  baseUrl: string = 'https://image.tmdb.org/t/p/w500/';
  constructor(private route: ActivatedRoute) {
    this.profileData = history.state.object;
    this.imagePath = this.baseUrl + this.profileData.profile_path;
  }

}
