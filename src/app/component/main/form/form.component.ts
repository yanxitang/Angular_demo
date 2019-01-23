import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators,FormControl} from '@angular/forms';
import  { model } from './form'
import {differenceInCalendarDays } from 'date-fns'
import {Router} from '@angular/router'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})



export class formComponent implements OnInit {
  constructor(private fb: FormBuilder,private router:Router) { }
  //响应式表单
  confirmValidator=(control:FormControl):{[s:string]:boolean} =>{
    console.log(control)
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  }
  validateForm = this.fb.group({
    email: ['', [Validators.required,Validators.email]],
    password: ['', [Validators.required]],
    confirm:['',[this.confirmValidator]]
  })
  
  email2:string="1570101654@qq.com"
  status:boolean = true
  changeStatus(){
    setTimeout(() => {
      this.status = true
    }, 1000);
  }
 

  ngOnInit(): void {
    // this.changeStatus()
      this.validateForm.patchValue({
        email:'1570101654@qq.com',
        password:'123456',
        confirm:'123'
      })
  }
  get email() { return this.validateForm.get('email')}

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }
  submitForm($event,value): void {
    $event.preventDefault()
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.router.navigateByUrl('default/list')
    console.log(value) // 获取提交数据
  }

  //模板驱动的表单
  openStatus:boolean=false 
  model = new model('ceshi','6',null,null,null)
  // model={
  //   formName:'ceshide',
  //   formAge:6,
  //   startDate:'2019-01-14',
  //   end:Date,
  //   start:Date
  // }
  // get diagnostic() { return JSON.stringify(this.model); }
  
  
  //限制不可选当前时间之前的时间
  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, new Date()) <0;
  };

  //根据开始时间限定结束时间的选择
  disabledEnd=(endValue:Date)=>{
    if(!this.model.start ||endValue){
      return false
    } else {
      return endValue.getTime() < this.model.start.getTime()
    }
  }

  //选择时间重新赋值
  onStartChange(value){
    this.model.start = value
  }
  onEndChange(value:Date){
    this.model.end = value
  }

  //是否打开下拉框
  openEndDate(open:boolean){
    console.log(open)
    if(!open){
      this.openStatus=true
    }
  }

  handelEnd(open:boolean){
    this.openStatus = open
  }
  submitform($event,value):void{
    $event.preventDefault()
    console.log(value.controls.formAge.value,$event);

    //数据的提交处理
    // this.model.formAge= `${value.controls.formAge.value}1232133`;
    // this.model.formName = `${value.controls.formName.value}hhhhhh`;
  }

  

 
 

}
        