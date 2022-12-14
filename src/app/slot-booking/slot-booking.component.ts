import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';
import { CreateSlotBookingComponent } from '../create-slot-booking/create-slot-booking.component';
import { StudioService } from '../services/studio.service';

@Component({
  selector: 'app-slot-booking',
  templateUrl: './slot-booking.component.html',
  styleUrls: ['./slot-booking.component.css']
})
export class SlotBookingComponent implements OnInit, AfterViewInit {

  @ViewChild('ejCalendar') ejCalendar: CalendarComponent;

  selectedStudio = "-1";
  selectedRoom: any = "-1";
  selectedRoomData: any;
  allStudios = [];
  allRooms = [];

  public month: number = new Date().getMonth();
  public fullYear: number = new Date().getFullYear();
  public dateValue: Date = new Date();
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
    if(e && e.name != 'change') {
      if ((e && e.value) || this.ejCalendar.value) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.id = 'save-booking';
        dialogConfig.height = 'auto';
        dialogConfig.width = '60%';
        //passing data
        dialogConfig.data = {
          studioId: this.selectedStudio,
          room: this.selectedRoomData,
          selectedDate: e && e.value ? e.value : this.ejCalendar.value
        };
  
        this.matDialog.open(CreateSlotBookingComponent, dialogConfig);
        this.matDialog
          ._getAfterAllClosed()
          .subscribe((res: any) => {
            this.ejCalendar.value = null;
          });
      } else {
        return;
      }
    } else {
      return;
    }
  }

}
