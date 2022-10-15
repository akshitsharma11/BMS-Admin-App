import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-create-slot-booking',
  templateUrl: './create-slot-booking.component.html',
  styleUrls: ['./create-slot-booking.component.css']
})
export class CreateSlotBookingComponent implements OnInit {
  roomData: any;
  slotData: any;
  availableSlots = [];
  bookingHours = 1;
  selectedSlot: any;

  constructor(
    public dialogRef: MatDialogRef<CreateSlotBookingComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private bookingService: BookingService,
    private toast: ToastrService
  ) {
    this.roomData = this.data.room;
    this.slotData = this.data;
  }

  ngOnInit(): void {
    this.getAvailability();
  }

  getAvailability() {
    const payload = { 
      studioId: this.slotData.studioId, 
      roomId: this.slotData.room.roomId, 
      bookingDate: this.slotData.selectedDate, 
      bookingHours: this.bookingHours 
    };

    this.bookingService.getAvailability(payload).subscribe((res: any) => {
      this.availableSlots = res.availableSlots;
    });
  }

  onHoursChange(e) {
    this.getAvailability();
  }

  saveBooking() {
    console.log(this.slotData.room);
    const totalPrice = this.slotData.room.pricePerHour * this.bookingHours;
    const payload = {
      userId: JSON.parse(localStorage.getItem('authUserDataBMS'))._id,
      studioId: this.slotData.studioId,
      roomId: this.slotData.room.roomId,
      bookingDate: this.slotData.selectedDate,
      bookingTime: this.selectedSlot,
      totalPrice
    };

    this.bookingService.saveBooking(payload).subscribe((res: any) => {
      this.toast.success(res.message);
      this.closeModel();
    }, (error:any) => {
      this.toast.error(error.error.message);
      this.closeModel();
    });
  }
  

  closeModel() {
    this.dialogRef.close();
  }

}
