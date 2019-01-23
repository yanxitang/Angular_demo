import { Component, OnInit,TemplateRef } from '@angular/core';
import { alertService } from 'src/app/service/alert.service';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import {editModalComponent} from './addContent/addContent.component'
import {Router} from '@angular/router'


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  dataSet = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }, {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }, {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }, {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
  tplModal: NzModalRef;

  constructor(public messageDail: alertService, public dailogMessage: NzMessageService, public modalService: NzModalService,private router:Router) {
    console.log('hhhhh',this.router)
  }

  pagination: boolean = true

  ngOnInit() {
    console.log('hhhhh',this.router)
  }

  delete(index) {
    var vm = this
    console.log('dianjilee',this.dataSet,index)
    this.messageDail.comfirmDailog('提示', '确定删除', function (data) { 
      console.log(data)
      if (data=='ok') {
        vm.dataSet= vm.dataSet.filter(d => Number(d.key) !== index);
        console.log(vm.dataSet)
      }
    })
    // this.dailogMessage.error('确定删除') //提示的错误信息
    // this.dailogMessage.success('添加成功',{ nzDuration: 10000 })
    //确认框
    // this.modalService.confirm({
    //   nzTitle: '提示',
    //   nzContent: '确定删除？',
    //   nzOkText: '确定',
    //   nzOkType: 'danger',
    //   nzOnOk: () => {
    //     console.log('yes')
    //   },
    //   nzCancelText: '取消',
    //   nzOnCancel: () => {
    //     console.log('no')
    //   }
    // });

  }

  changeStatus(){
   this.messageDail.comfirmDailog('提示','确定发布',function(data){
    if (data=="ok"){
      console.log('成功了')
    }
   }) 
  };

  //创建的模态框
  add(): void {
    const modal = this.modalService.create({
      nzTitle: '添加',
      nzContent: editModalComponent,
      nzComponentParams: {
        title: '测试',
        subtitle: '123'
      },
      nzFooter: [{
        label: 'change component tilte from outside',
        onClick: (componentInstance) => {
          componentInstance.title = 'title in inner component is changed';
        }
      }]
    });
  }
  // add(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
  //     this.tplModal = this.modalService.create({
  //       nzTitle: tplTitle,
  //       nzContent: tplContent,
  //       nzFooter: tplFooter,
  //       nzMaskClosable: false,
  //       nzClosable: false,
  //       nzOnOk: () => console.log('Click ok')
  //     });
  //   }
  

}
