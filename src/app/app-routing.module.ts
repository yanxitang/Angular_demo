import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//引入组件
import { LoginComponent } from './component/main/login/login.component'
import { formComponent } from './component/main/form/form.component'
import { ListComponent } from '../app/component/main/list/list.component'
import { ListDetailComponent } from '../app/component/main/list/list-detail/list-detail.component'
import { CeshiComponent } from '../app/component/main/ceshi/ceshi.component'
import { FileUploadComponent } from '../app/component/main/file-upload/file-upload.component'
import { GaoMapComponent } from '../app/component/main/gao-map/gao-map.component'
import { ChartComponent } from '../app/component/main/chart/chart.component'
import { DefaultComponent } from '../app/component/default/default.component'
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'default',
    component: DefaultComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'listDetail', component: ListDetailComponent },
      {
        path: 'ceshi', component: CeshiComponent
      },
      {
        path: 'file', component: FileUploadComponent
      },
      {
        path: 'map', component: GaoMapComponent
      },
      {
        path: 'chart', component: ChartComponent
      },
      {
        path: 'form', component: formComponent
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
