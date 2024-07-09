import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { WrapperComponent } from '../dashboard/wrapper/wrapper.component';
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
import { TrainedSeekersComponent } from './trained-seekers/trained-seekers.component';
import { HiredSeekersComponent } from './hired-seekers/hired-seekers.component';
import { BulkDataUploadComponent } from './bulk-data-upload/bulk-data-upload.component';
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
import { CapacityBuildingComponent } from './capacity-building/capacity-building.component';
import { UserDashboardComponent } from './userDashbord/user-dashboard.component';
import { PlanningComponent } from './planning/planning.component';
import { PlanningAddComponent } from './planning-add/planning-add.component';
import { ZonalUserAddComponent } from './zonal-user-add/zonal-user-add.component';
import { ZonalUsersComponent } from './zonal-users/zonal-users.component';
import { NotificationComponent } from './notification/notification.component';
import { IndustryAddComponent } from './industry-add/industry-add.component';
import { IndustryInfoComponent } from './industry-info/industry-info.component';
import { IndustriesComponent } from './industries/industries.component';
import { AnnouncementAddComponent } from './announcement-add/announcement-add.component';
import { OfficeComponent } from './office/office.component';
import { PushnotificationComponent } from './pushnotification/pushnotification.component';

const routes: Routes = [
  {
    path: 'dash', component: WrapperComponent, children: [
      { path: "chat", component: ChatComponent },
      { path: "admins", component: AdminComponent },
      { path: "jobSeekers", component: JobSeekerComponent },
      { path: "addJobSeeker", component: JobJobSeekerAddComponent },
      { path: "jobs", component: JobSeekerComponent },
      { path: "services", component: ServicesComponent },
      { path: "announcements", component: AnnouncementComponent },
      { path: "addAnnouncement", component: AnnouncementAddComponent },
      { path: "settings", component: SystemSettingComponent },

      { path: "addAdmin", component: AdminAddComponent },
      {path:"kebeles",component:DepartmentComponent},
      {path:"addKebele",component:DepartmentAddComponent},

      {path:"goths",component:GothComponent},
      {path:"addGoth",component:GothAddComponent},

      {path:"zoneCoordinators",component:ZoneCoordinatorComponent},
      {path:"addZoneCoordinator",component:ZoneCoordinatorAddComponent},

      {path:"woredaCoordinators",component:WoredaCoordinatorComponent},
      {path:"addWoredaCoordinator",component:WoredaCoordinatorAddComponent},

      {path:"siraHidetOfficers",component:SiraHidetOfficerComponent},
      {path:"addSiraHidetOfficer",component:SiraHidetOfficerAddComponent},

      {path:"mayers",component:MayerComponent},
      {path:"addMayer",component:MayerAddComponent},

      {path:"trainedSeekers",component:TrainedSeekersComponent},
      {path:"hiredSeekers",component:HiredSeekersComponent},

      {path:"uploadBulkData",component:BulkDataUploadComponent},

      {path:"profile",component:ProfileComponent},

      {path:"report",component:ReportComponent},
      {path:"reports",component:ReportViewComponent},
      {path:"faqs",component:FaqsComponent},

      {path:"industryExtensions",component:IndustryExtensionComponent},
      {path:"addUser",component:IndustryExtensionAddComponent},

      {path:"educationAndTrainings",component:EducationAndTrainingComponent},
      {path:"addEducationAndTraining",component:EducationAndTrainingAddComponent},

      {path:"marketPreparations",component:MarketPreparationComponent},
      {path:"addMarketPreparation",component:MarketPreparationAddComponent},

      {path:"workAndDeployments",component:WorkAndDeploymentComponent},
      {path:"addWorkAndDeployment",component:MarketPreparationAddComponent},

      {path:"capacityBuildings",component:CapacityBuildingComponent},
      {path:"user-dashboard",component:UserDashboardComponent},

      {path:"plannings",component:PlanningComponent},
      {path:"addPlanning",component:PlanningAddComponent},

      
      {path:"office",component:OfficeComponent},
      
{path:"addZonalUser",component:ZonalUserAddComponent},
{path:"zonalUsers",component:ZonalUsersComponent},
{path:"notifications",component:NotificationComponent},
{path:"addIndustry",component:IndustryAddComponent},
{path:"industryInfo",component:IndustryInfoComponent},
{path:"industries",component:IndustriesComponent},
{path:"pushnotification",component:PushnotificationComponent},
  
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentsRoutingModule { }
