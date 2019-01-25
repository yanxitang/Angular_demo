import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {globalService} from './global.service';
import {alertService} from './alert.service';
import { NzMessageService } from 'ng-zorro-antd';




@Injectable()
export class selfHttp {
  public restServer;
  public http;
  // TODO 接口；正式和测试环境的切换
  constructor(Http: HttpClient, public global: globalService, private alert: alertService,private tipMessage:NzMessageService) {
    this.http = Http;
    // this.restServer = 'http://21ks854045.51mypc.cn';
    // this.restServer = 'http://qhtest.30days-tech.com'; // 测试
    this.restServer = 'http://shop.qhicm.com' // 正式
  }

  public get(url, params?: Object, cb?: Function) {
    let httpParams = new HttpParams();
    console.log('get开始请求', url);
    this.global.loadStatus = true;
    const vm = this;
    if (params) {
      for (const key in params) {
        if (params[key] === false || params[key] === 0 || params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    vm.http.get(vm.restServer + url, {params: httpParams})
      .subscribe(data => {
        console.log('get请求结束', url, data);
        vm.global.loadStatus = false;
        if (data.resultStatus) {
          cb(data);
        } else {
        //   vm.alert.error(data.errorMessage)
        this.tipMessage.create('error',data.errorMessage);
        }
      });
  }

  public post(url, data?: Object, cb?: Function, options?: Object) {
    console.log('post开始请求', url, data);
    this.global.loadStatus = true;
    const vm = this;
    vm.http.post(vm.restServer + url, data, options)
      .subscribe(res => {
        console.log('post请求结束', url, res);
        vm.global.loadStatus = false;
        if (res.resultStatus) {
          cb(res);
        } else {
        //   vm.alert.error(res.errorMessage);
        this.tipMessage.create('error',res.errorMessage);
        }
      });
  }

  public put(url, data?: Object, cb?: Function, options?: Object) {
    console.log('put开始请求', url);
    this.global.loadStatus = true;
    const vm = this;
    vm.http.put(vm.restServer + url, data, options)
      .subscribe(res => {
        console.log('put请求结束', url, res);
        vm.global.loadStatus = false;
        if (res.resultStatus) {
          cb(res);
        } else {
        //   vm.alert.error(res.errorMessage);
        vm.tipMessage.create('error',res.errorMessage);
        }
      });
  }

  public delete(url, params?: Object, cb?: Function) {
    let httpParams = new HttpParams();
    console.log('delete开始请求', url);
    this.global.loadStatus = true;
    const vm = this;
    if (params) {
      for (const key in params) {
        if (params[key] === false || params[key] === 0 || params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    vm.http.delete(vm.restServer + url, {params: httpParams})
      .subscribe(data => {
        console.log('delete请求结束', url, data);
        vm.global.loadStatus = false;
        if (data.resultStatus) {
          cb(data);
        } else {
        //   vm.alert.error(data.errorMessage);
          vm.tipMessage.create('error',data.errorMessage);
        }
      });
  }

  public ossget(url, params?: Object, cb?: Function) {
    let httpParams = new HttpParams();
    console.log('get开始请求', url);
    this.global.loadStatus = true;
    const vm = this;
    if (params) {
      for (const key in params) {
        if (params[key] === false || params[key] === 0 || params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      } 
    }
    vm.http.get(url, {params: httpParams})
      .subscribe(data => {
        console.log('get请求结束', url, data);
        vm.global.loadStatus = false;
        if (data.resultStatus) {
          cb(data);
        } else {
          vm.tipMessage.create('error',data.errorMessage);
        }
      });
  }
}
