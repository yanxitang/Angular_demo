

import {  Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { promise } from 'protractor';
@Injectable()
export class alertService {
    comfirmDailog:Function;
    constructor(private messgeDailog:NzModalService){
        const vm = this
        vm.comfirmDailog= function(title:string,content:string,callback:Function ){
            vm.messgeDailog.confirm({
                nzTitle     : title,
                nzContent   : content,
                nzOkText    : '确定',
                nzOkType    : 'danger',
                nzOnOk      : () => {
                    callback('ok')
                },
                nzCancelText: '取消',
                nzOnCancel  : () => console.log('Cancel')
              });
        }
       
    }

}