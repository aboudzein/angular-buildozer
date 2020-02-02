import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@shared/common';
import { UploadFileComponent } from './upload-file.component';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    MaterialModule,
    PipesModule
  ],
  declarations: [UploadFileComponent],
  exports: [UploadFileComponent]
})
export class UploadFileModule { }
