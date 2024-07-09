import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementComponent } from './announcement/announcement.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ServiceComponent } from './service/service.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from '../contents/profile/profile.component';
import { IndustryInfoComponent } from './industry-info/industry-info.component';
console.warn("Module loaded");
const routes: Routes = [
  {path:"",redirectTo:"/home",pathMatch:"full"},
  {path:"announcement",component: AnnouncementComponent},
  {path:"home",component:HomeComponent},
  {path:"contact",component:ContactComponent},
  {path:"about",component:AboutComponent},
  {path:"industries",component:ServiceComponent},
  {path:"registration",component:RegistrationComponent},
  { path: 'dash', children: [
    {path:"profile",component:ProfileComponent},
  ]},
  
  
  {path:"industry",component:IndustryInfoComponent},
  {path:"**",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
