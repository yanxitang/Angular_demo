import { Component, Input, OnInit ,TemplateRef, ViewChild } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators
  } from '@angular/forms'

@Component({
    selector: 'editModalComponent',
    templateUrl: './addContent.component.html',
  })
  export class editModalComponent implements OnInit{
    validateForm: FormGroup;
    @Input() title: string;
    @Input() subtitle: string;
  
    constructor(private modal: NzModalRef,private fb: FormBuilder) { }
  
    destroyModal(): void {
      this.modal.destroy({ data: 'this the result data' });
    } 

    submitForm(): void {
        for (const i in this.validateForm.controls) {
          this.validateForm.controls[ i ].markAsDirty();
          this.validateForm.controls[ i ].updateValueAndValidity();
        }
      }
    
    
      ngOnInit(): void {
        this.validateForm = this.fb.group({
          userName: [ null, [ Validators.required ] ],
          password: [ null, [ Validators.required ] ],
          remember: [ true ]
        });
      }
  }