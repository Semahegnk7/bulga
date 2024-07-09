import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainContentComponent } from './main-content/main-content.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    SideBarComponent,
    HeaderComponent,
    FooterComponent,
    MainContentComponent,
    WrapperComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ],
  exports:[
    WrapperComponent
  ]
})
export class DashboardModule { }
