import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { ServiceComponent } from './service/service.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { MaterialModule } from '../material/material.module';
import { RegistrationComponent } from './registration/registration.component';
import { IndustryInfoComponent } from './industry-info/industry-info.component';



@NgModule({
  declarations: [
    HeaderComponent,
    AboutComponent,
    ContactComponent,
    AnnouncementComponent,
    ServiceComponent,
    HomeComponent,
    FooterComponent,
    ServiceListComponent,
    RegistrationComponent,
    IndustryInfoComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MaterialModule
  ]
})
export class PublicModule { }
