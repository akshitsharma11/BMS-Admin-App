import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudioService } from 'src/app/services/studio.service';

@Component({
  selector: 'app-view-studio-details',
  templateUrl: './view-studio-details.component.html',
  styleUrls: ['./view-studio-details.component.css']
})
export class ViewStudioDetailsComponent implements OnInit {

  studioId;
  studioDetails;

  constructor(
    private route:ActivatedRoute,
    private studioService:StudioService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(Params=>{
      this.studioId = Params['studioId'];
      this.studioService.getSingleStudio(this.studioId).subscribe(res=>{
        if(res["status"])
        {
          this.studioDetails = res["studio"];
        }
        console.log(this.studioDetails);
      });
    });
  }

}
