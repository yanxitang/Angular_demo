import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators,FormControl} from '@angular/forms';
import {Router} from '@angular/router'
import  { login } from './login'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,private router:Router) { }

  ngOnInit() {
  }

  login = new login('18881700910',123456)
  submitLogin($event,value):void{
      $event.preventDefault()
      console.log(event,value.controls.userName.value)
      this.router.navigateByUrl('default/list')
      //数据的提交处理
      // this.model.formAge= `${value.controls.formAge.value}1232133`;
      // this.model.formName = `${value.controls.formName.value}hhhhhh`;
    }



}
