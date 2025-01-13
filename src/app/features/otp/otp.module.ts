import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OtpRoutingModule } from './otp-routing.module';
import { OtpComponent } from './otp.component';


@NgModule({
  declarations: [
    OtpComponent
  ],
  imports: [
    CommonModule,
    OtpRoutingModule,
    FormsModule
  ]
})
export class OtpModule { }
