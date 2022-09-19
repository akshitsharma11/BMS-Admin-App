import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
//to install angular material
//ng add @angular/material


//for pie chart -- 
//npm install --save ng2-charts
//npm install --save chart.js
import {ChartsModule} from 'ng2-charts';

import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppComponent } from './app.component';
// import { LoginComponent } from './login/login.component'; 
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';

import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
// import { NamefilterPipe } from './namefilter.pipe';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { MessagingService } from './services/messaging.service';
import { AsyncPipe } from '@angular/common';
import { NameFilterPipe } from './name-filter.pipe';
import { LoginComponent } from './login/login.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { ProfileComponent } from './profile/profile.component';
import { ShortenPipe } from './shorten.pipe';
import { OnlyLoginGuardService } from './services/only-login-guard.service';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ExcelService } from './services/excel.service';
import { ModuleFilterPipe } from './module-filter.pipe';
import { ClassFilterPipe } from './class-filter.pipe';
import { ShowAllUsersComponent } from './show-all-users/show-all-users.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';
import { SendNotificationsComponent } from './send-notifications/send-notifications.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FeedbackFilterPipePipe } from './feedback-filter-pipe.pipe';
import { ReporteeDetailsComponent } from './reportee-details/reportee-details.component';
import { ListStudiosComponent } from './list-studios/list-studios.component';
import { CreateStudioComponent } from './create-studio/create-studio.component';
import { AddRoomInfoComponent } from './create-studio/add-room-info/add-room-info.component';
import { AddTeamMemberComponent } from './create-studio/add-team-member/add-team-member.component';
import { ShowStudioDetailsComponent } from './list-studios/show-studio-details/show-studio-details.component';
import { ViewStudioDetailsComponent } from './create-studio/view-studio-details/view-studio-details.component';
import { RoomDetailsComponent } from './create-studio/room-details/room-details.component';
import { MemberDetailsComponent } from './create-studio/member-details/member-details.component';
import { ListDiscountComponent } from './discount/list-discount/list-discount.component';
import { EditDiscountComponent } from './discount/edit-discount/edit-discount.component';
import { EditStudioComponent } from './edit-studio/edit-studio.component';
import { ListActiveBookingsComponent } from './bookings/list-active-bookings/list-active-bookings.component';
import { ListCompletedBookingsComponent } from './bookings/list-completed-bookings/list-completed-bookings.component';
import { ListCancelledBookingsComponent } from './bookings/list-cancelled-bookings/list-cancelled-bookings.component';
import { ListTransactionsComponent } from './transactions/list-transactions/list-transactions.component';
import { ListSubadminsComponent } from './sub-admins/list-subadmins/list-subadmins.component';
import { CreateSubadminComponent } from './sub-admins/create-subadmin/create-subadmin.component';
import { RouteProtectGuard } from './route-protect.guard';
import { ListOwnersComponent } from './owner/list-owners/list-owners.component';
import { CreateOwnerComponent } from './owner/create-owner/create-owner.component';

const appRoutes:Routes = [

  {path:'admin/dashboard',component:DashboardComponent},
  {path:'admin/sub-admins',component:ListSubadminsComponent,canActivate:[RouteProtectGuard],data: {roles: ['SubAdmins']}},
  {path:'admin/sub-admins/create',component:CreateSubadminComponent,canActivate:[RouteProtectGuard],data: {roles: ['SubAdmins']}},
  {path:'admin/all-users',component:ShowAllUsersComponent,canActivate:[RouteProtectGuard],data: {roles: ['Users']}},
  {path:'admin/studios',component:ListStudiosComponent,canActivate:[RouteProtectGuard],data: {roles: ['Studios']}},
  {path:'admin/studios/create',component:CreateStudioComponent,canActivate:[RouteProtectGuard],data: {roles: ['Studios']}},
  {path:'admin/studios/:studioId',component:ViewStudioDetailsComponent,canActivate:[RouteProtectGuard],data: {roles: ['Studios']}},
  {path:'admin/studios/edit/:studioId',component:EditStudioComponent,canActivate:[RouteProtectGuard],data: {roles: ['Studios']}},
  {path:'admin/discounts',component:ListDiscountComponent,canActivate:[RouteProtectGuard],data: {roles: ['Discounts']}},
  {path:'admin/discounts/edit/:discountId',component:EditDiscountComponent,canActivate:[RouteProtectGuard],data: {roles: ['Discounts']}},
  {path:'admin/bookings/active',component:ListActiveBookingsComponent,canActivate:[RouteProtectGuard],data: {roles: ['Bookings']}},
  {path:'admin/bookings/completed',component:ListCompletedBookingsComponent,canActivate:[RouteProtectGuard],data: {roles: ['Bookings']}},
  {path:'admin/bookings/cancelled',component:ListCancelledBookingsComponent,canActivate:[RouteProtectGuard],data: {roles: ['Bookings']}},
  {path:'admin/transactions',component:ListTransactionsComponent,canActivate:[RouteProtectGuard],data: {roles: ['Transactions']}},
  {path:'admin/send-notifications',component:SendNotificationsComponent,canActivate:[RouteProtectGuard],data: {roles: ['Notifications']}},
  {path:'admin/all-owners',component:ListOwnersComponent},
  {path:'admin/owners/create',component:CreateOwnerComponent},
  
  {path:'admin/login',component:LoginUserComponent,canActivate:[OnlyLoginGuardService]},
  {path:'admin/profile',component:ProfileComponent},
 
  {path:'',redirectTo:'/admin/login',pathMatch:'full'}      
  
];

@NgModule({
  declarations: [
    AppComponent,
    // NamefilterPipe,
    NameFilterPipe,
    LoginUserComponent,
    ProfileComponent,
    ShortenPipe,
    EditAdminComponent,
    ModuleFilterPipe,
    ClassFilterPipe,
    ShowAllUsersComponent,
    ShowDetailsComponent,
    DeleteCustomerComponent,
    SendNotificationsComponent,
    EditUserComponent,
    FeedbackFilterPipePipe,
    ReporteeDetailsComponent,
    ListStudiosComponent,
    CreateStudioComponent,
    AddRoomInfoComponent,
    AddTeamMemberComponent,
    ShowStudioDetailsComponent,
    ViewStudioDetailsComponent,
    RoomDetailsComponent,
    MemberDetailsComponent,
    ListDiscountComponent,
    EditDiscountComponent,
    EditStudioComponent,
    ListActiveBookingsComponent,
    ListCompletedBookingsComponent,
    ListCancelledBookingsComponent,
    ListTransactionsComponent,
    ListSubadminsComponent,
    CreateSubadminComponent,
    ListOwnersComponent,
    CreateOwnerComponent,
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    NgxImageZoomModule,
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ChartsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    CommonModule,
    PdfViewerModule,
    ToastrModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [MessagingService,AsyncPipe,OnlyLoginGuardService,ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
