import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ContainerComponent } from './container/container.component';
import { ContentComponent } from './content/content.component';
import { MaterialModule } from '@shared/common/material.module';
import { SidebarModule } from 'app/widget/sidebar';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarItemComponent } from './components/navbar-item/navbar-item.component';
import { NavbarCollapseComponent } from './components/navbar-collapse/navbar-collapse.component';
import { NavbarHeaderComponent } from './components/navbar-header/navbar-header.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DirectivesModule } from '@shared/directives';
import { ProgressBarModule } from '@widget/progress-bar';

import { GravatarModule } from 'ngx-gravatar';
import { ChatModule } from 'app/pages/chat';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MaterialModule,
    SidebarModule,
    TranslateModule.forChild(),
    ScrollingModule,
    DirectivesModule,
    GravatarModule,
    ChatModule,
    ProgressBarModule
  ],
  declarations: [
    ToolbarComponent,
    NavbarComponent,
    FooterComponent,
    ContainerComponent,
    ContentComponent,
    NavbarItemComponent,
    NavbarCollapseComponent,
    NavbarHeaderComponent,
  ]
})
export class LayoutModule { }
