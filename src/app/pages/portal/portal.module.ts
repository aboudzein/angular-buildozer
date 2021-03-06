import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { MaterialModule } from '@shared/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormModule } from '@partials/form';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PincodeBoxModule } from '@widget/pincode-box/pincode-box.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    MaterialModule,
    FormModule,
    PincodeBoxModule,
    TranslateModule.forChild(),
  ]
})
export class PortalModule { }
