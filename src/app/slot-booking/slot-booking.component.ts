import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateSlotBookingComponent } from '../create-slot-booking/create-slot-booking.component';
import { StudioService } from '../services/studio.service';

@Component({
  selector: 'app-slot-booking',
  templateUrl: './slot-booking.component.html',
  styleUrls: ['./slot-booking.component.css']
})
export class SlotBookingComponent implements OnInit, AfterViewInit {

  selectedStudio = "-1";
  selectedRoom: any = "-1";
  selectedRoomData: any;
  allStudios = [];
  allRooms = [];

  public month: number = new Date().getMonth();
  public fullYear: number = new Date().getFullYear();
  public dateValue: Date = new Date(this.fullYear, this.month, 11);
  public minDate: Date = new Date();
  public maxDate: Date = new Date(this.fullYear, this.month, 15);

  constructor(
    private studioService: StudioService,
    public matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.studioService.getAllStudios().subscribe((res: any) => {
      if (res.status) {
        this.allStudios = res.studios;
      }
    });
  }

  ngAfterViewInit(): void {
    const license = document.getElementById('js-licensing');
    license.style.display = 'none'
  }

  onStudioSelect(e) {
    this.allRooms = this.allStudios.find(studio => studio._id == e).roomsDetails;
  }

  onRoomSelect(e) {
    this.selectedRoomData = this.allRooms.find(room => room.roomId = e);
  }

  onChange(e) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'save-container';
    dialogConfig.height = 'auto';
    dialogConfig.width = '60%';
    //passing data
    dialogConfig.data = {
      studioId: this.selectedStudio,
      room: this.selectedRoomData,
      selectedDate: e.value
    };

    this.matDialog.open(CreateSlotBookingComponent, dialogConfig);
    this.matDialog
      ._getAfterAllClosed()
      .subscribe((res: any) => {
        this.selectedStudio = "-1";
        this.selectedRoom = "-1";
      });
  }

}
