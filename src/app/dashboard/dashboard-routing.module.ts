import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { WrapperComponent } from './wrapper/wrapper.component';


const routes: Routes = [
{path:'dash',component:WrapperComponent,children:[
  {path:"dashboard",component:MainContentComponent,
  children:[
  ]},
]},
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
