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
import { FormsModule } from '@angular/forms';
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
import { AllTopicsComponent } from './all-topics/all-topics.component';
import { SendNotificationsComponent } from './send-notifications/send-notifications.component';
import { CreateNewTopicComponent } from './create-new-topic/create-new-topic.component';
import { TopicChatComponent } from './topic-chat/topic-chat.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditTopicComponent } from './edit-topic/edit-topic.component';
import { SuspendUserComponent } from './suspend-user/suspend-user.component';
import { UserTopicsComponent } from './user-topics/user-topics.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { CreateNewCategoryComponent } from './create-new-category/create-new-category.component';
import { UnblockUserComponent } from './unblock-user/unblock-user.component';
import { AllFeedbacksComponent } from './all-feedbacks/all-feedbacks.component';
import { FeedbackFilterPipePipe } from './feedback-filter-pipe.pipe';
import { UserReportsComponent } from './user-reports/user-reports.component';
import { ReporteeDetailsComponent } from './reportee-details/reportee-details.component';
import { TopicReportsComponent } from './topic-reports/topic-reports.component';
import { TopicDetailsComponent } from './topic-details/topic-details.component';


const appRoutes:Routes = [

  {path:'admin/dashboard',component:DashboardComponent},
  {path:'admin/all-users',component:ShowAllUsersComponent},
  {path:'admin/all-topics',component:AllTopicsComponent},
  {path:'admin/send-notifications',component:SendNotificationsComponent},
  {path:'admin/topic-chat/:topicId',component:TopicChatComponent},
  {path:'admin/all-categories',component:AllCategoriesComponent},
  {path:'admin/all-feedbacks',component:AllFeedbacksComponent},
  {path:'admin/user-topics/:userId',component:UserTopicsComponent},
  {path:'admin/user-reports',component:UserReportsComponent},
  {path:'admin/topic-reports',component:TopicReportsComponent},
  
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
    AllTopicsComponent,
    SendNotificationsComponent,
    CreateNewTopicComponent,
    TopicChatComponent,
    EditUserComponent,
    EditTopicComponent,
    SuspendUserComponent,
    UserTopicsComponent,
    AllCategoriesComponent,
    CreateNewCategoryComponent,
    UnblockUserComponent,
    AllFeedbacksComponent,
    FeedbackFilterPipePipe,
    UserReportsComponent,
    ReporteeDetailsComponent,
    TopicReportsComponent,
    TopicDetailsComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
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
