import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DiscountService } from 'src/app/services/discount.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.css']
})
export class EditDiscountComponent implements OnInit {

  discountId;
  discountDetails;

  defaultDiscount = "-1";

  dropdownList = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings = {};
  
  constructor(
    private discountService:DiscountService,
    private userService:UserService,
    private routerBtn:Router,
    private route:ActivatedRoute,
    private toast:ToastrService,
    private spinner:NgxSpinnerService
  )
  {
  }

  ngOnInit(): void {
    // this.dropdownList = [
    //   { id: 1, name: 'Netherlands' },
    //   { id: 3, name: 'Australia' },
    //   { id: 4, name: 'USA' },
    //   { id: 5, name: 'Canada' },
    // ];
    // this.selectedItems = [
    //   { id: 4, name: 'USA' },
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

    this.spinner.show();
    this.route.params.subscribe(resParams=>{
      this.discountId = resParams['discountId'];
      this.discountService.getSingleDiscountDetails(this.discountId).subscribe(res=>{
        if(res["status"])
        {
          this.discountDetails = res["discount"];
          this.discountDetails.discountDate = this.discountDetails.discountDate.split('T')[0];
          console.log(this.discountDetails);
        }
        if(this.discountDetails.discountType==3)
        {
          this.userService.getAllUsers().subscribe(resUsers=>{
            if(resUsers["status"])
            {
              console.log(resUsers["users"]);
              resUsers["users"].forEach(singleUser=>{
                this.dropdownList = this.dropdownList.concat({id:singleUser._id.toString(),name:singleUser.email});
              });
              //for selected users
              this.discountDetails.usersList.forEach(specialUser=>{
                const index = resUsers["users"].findIndex(i=>i._id.toString()==specialUser.toString());
                if(index!=-1)
                {
                  this.selectedItems = this.selectedItems.concat({id:specialUser,name:resUsers["users"][index].email});
                }
              })
            }
          });          
        }
        this.spinner.hide();
      });
    })
  }

  //to disable past dates
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }

  onSubmit(form:NgForm)
  {
    if(this.discountDetails.discountType==2)
    {
      this.discountDetails.discountDate = this.discountDetails.discountDate+"T00:00:00.000Z";
    }

    if(this.discountDetails.discountType==3)
    {
      this.discountDetails.usersList = [];
      this.selectedItems.forEach(singleItem=>{
        this.discountDetails.usersList.push(singleItem.id);
      })
    }
    console.log(this.discountDetails);

    this.spinner.show();
    this.discountService.editSingleDiscountDetails(this.discountId,this.discountDetails).subscribe(res=>{
      if(res["status"])
      {
        this.toast.info(res["message"],"Success",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        });
        this.routerBtn.navigate(['/admin/discounts']);

      }else{
        this.toast.error(res["message"],"Error Occured",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
      }
      this.spinner.hide();
    },err=>{
      this.toast.error(err,"Error Occured",{
        timeOut:2500,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-top-right'
      })
    })
  }

}
