import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


//使用datepicker时需要引入
import {registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh'
registerLocaleData(zh)


//根组件
import { AppComponent } from './app.component';
//引入外部的模块
import { AppRoutingModule } from './app-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {NgxEchartsModule} from 'ngx-echarts';

//引入公共的服务
import { alertService} from './service/alert.service'
import { globalService} from './service/global.service'
import { uploadService } from './service/fileUpload.service';
import { selfHttp } from './service/selfhttp.service';

//引入组件
import { SiderBarComponent } from '../app/component/default/sidebar/sidebar.component';
import { TopHeaderComponent } from '../app/component/default/top-header/top-header.component';
import { CenterMainComponent } from '../app/component/default/center-main/center-main.component';


//引入单个页面
import { ListComponent } from './component/main/list/list.component';
import { ListDetailComponent } from './component/main/list/list-detail/list-detail.component';
import { DefaultComponent } from './component/default/default.component';
import { editModalComponent}  from './component/main/list/addContent/addContent.component';
import { formComponent } from './component/main/form/form.component';
import { CeshiComponent } from './component/main/ceshi/ceshi.component'
import { from } from 'rxjs';
import { FileUploadComponent } from './component/main/file-upload/file-upload.component';
import { GaoMapComponent } from './component/main/gao-map/gao-map.component';
import { ChartComponent } from './component/main/chart/chart.component';
import { LoginComponent } from './component/main/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListDetailComponent,
    SiderBarComponent,
    TopHeaderComponent,
    CenterMainComponent,
    DefaultComponent,
    editModalComponent,
    formComponent,
    CeshiComponent,
    FileUploadComponent,
    GaoMapComponent,
    ChartComponent,
    LoginComponent
  ],
  entryComponents: [editModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgZorroAntdModule.forRoot(),
    ReactiveFormsModule,
    NgxEchartsModule
  ],
  providers: [alertService,globalService,selfHttp,uploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
