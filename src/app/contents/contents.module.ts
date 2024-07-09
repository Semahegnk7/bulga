import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentsRoutingModule } from './contents-routing.module';
import { ChatComponent } from './chat/chat.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AdminComponent } from './admin/admin.component';
import { JobSeekerComponent } from './job-seeker/job-seeker.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { ServicesComponent } from './services/services.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { DepartmentComponent } from './kebele/department.component';
import { DepartmentAddComponent } from './kebele-add/department-add.component';
import { GothComponent } from './goth/goth.component';
import { GothAddComponent } from './goth-add/goth-add.component';
import { JobJobSeekerAddComponent } from './job-job-seeker-add/job-seeker-add.component';
import { ZoneCoordinatorComponent } from './zone-coordinator/zone-coordinator.component';
import { ZoneCoordinatorAddComponent } from './zone-coordinator-add/zone-coordinator-add.component';
import { WoredaCoordinatorComponent } from './woreda-coordinator/woreda-coordinator.component';
import { WoredaCoordinatorAddComponent } from './woreda-coordinator-add/woreda-coordinator-add.component';
import { SiraHidetOfficerComponent } from './sira-hidet-officer/sira-hidet-officer.component';
import { SiraHidetOfficerAddComponent } from './sira-hidet-officer-add/sira-hidet-officer-add.component';
import { MayerComponent } from './mayer/mayer.component';
import { MayerAddComponent } from './mayer-add/mayer-add.component';
import { BulkDataUploadComponent } from './bulk-data-upload/bulk-data-upload.component';
import { TrainedSeekersComponent } from './trained-seekers/trained-seekers.component';
import { HiredSeekersComponent } from './hired-seekers/hired-seekers.component';
import { ProfileComponent } from './profile/profile.component';
import { SystemSettingComponent } from './system-setting/system-setting.component';
import { ReportComponent } from './report/report.component';
import { FaqsComponent } from './faqs/faqs.component';
import { IndustryExtensionComponent } from './industry-extension/industry-extension.component';
import { IndustryExtensionAddComponent } from './industry-extension-add/industry-extension-add.component';
import { ReportViewComponent } from './report-view/report-view.component';
import { EducationAndTrainingComponent } from './education-and-training/education-and-training.component';
import { EducationAndTrainingAddComponent } from './education-and-training-add/education-and-training-add.component';
import { MarketPreparationComponent } from './market-preparation/market-preparation.component';
import { MarketPreparationAddComponent } from './market-preparation-add/market-preparation-add.component';
import { WorkAndDeploymentComponent } from './work-and-deployment/work-and-deployment.component';
import { WorkAndDeploymentAddComponent } from './work-and-deployment-add/work-and-deployment-add.component';
import { PlanningComponent } from './planning/planning.component';
import { PlanningAddComponent } from './planning-add/planning-add.component';
import { CapacityBuildingComponent } from './capacity-building/capacity-building.component';
import { UserDashboardComponent } from './userDashbord/user-dashboard.component';
import { ZonalUserAddComponent } from './zonal-user-add/zonal-user-add.component';
import { ZonalUsersComponent } from './zonal-users/zonal-users.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationPushComponent } from './notification-push/notification-push.component';
import { IndustryAddComponent } from './industry-add/industry-add.component';
import { IndustryInfoComponent } from './industry-info/industry-info.component';
import { IndustriesComponent } from './industries/industries.component';
import { AnnouncementAddComponent } from './announcement-add/announcement-add.component';
import { CompanyMaintenanceComponent } from './company-maintenance/company-maintenance.component';
import { OfficeComponent } from './office/office.component';
import { PushnotificationComponent } from './pushnotification/pushnotification.component';


@NgModule({
  declarations: [
    ChatComponent,
    AdminComponent,
    JobSeekerComponent,
    AnnouncementComponent,
    ServicesComponent,
    AdminAddComponent,
    DepartmentComponent,
    DepartmentAddComponent,
    GothComponent,
    GothAddComponent,
    JobJobSeekerAddComponent,
    ZoneCoordinatorComponent,
    ZoneCoordinatorAddComponent,
    WoredaCoordinatorComponent,
    WoredaCoordinatorAddComponent,
    SiraHidetOfficerComponent,
    SiraHidetOfficerAddComponent,
    MayerComponent,
    MayerAddComponent,
    BulkDataUploadComponent,
    TrainedSeekersComponent,
    HiredSeekersComponent,
    ProfileComponent,
    SystemSettingComponent,
    ReportComponent,
    FaqsComponent,
    IndustryExtensionComponent,
    IndustryExtensionAddComponent,
    ReportViewComponent,
    EducationAndTrainingComponent,
    EducationAndTrainingAddComponent,
    MarketPreparationComponent,
    MarketPreparationAddComponent,
    WorkAndDeploymentComponent,
    WorkAndDeploymentAddComponent,
    PlanningComponent,
    PlanningAddComponent,
    CapacityBuildingComponent,
    UserDashboardComponent,
    ZonalUserAddComponent,
    ZonalUsersComponent,
    NotificationComponent,
    NotificationPushComponent,
    IndustryAddComponent,
    IndustryInfoComponent,
    IndustriesComponent,
    AnnouncementAddComponent,
    CompanyMaintenanceComponent,
    OfficeComponent,
    PushnotificationComponent
  ],
  exports:[
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ContentsRoutingModule,
    MaterialModule
  ]
})
export class ContentsModule { }
