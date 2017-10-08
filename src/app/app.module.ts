import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'

import {
  MatButtonModule,
} from '@angular/material';

import { Bpmn2DemoComponent } from './bpmn2/bpmn2.demo.component'

import { AppComponent, DialogDataExampleDialog } from './app.component';
import { EuPageService, EasyUIBpmnModule, EasyUIMdModalModule } from '../../'
// import { ModalInfoComponent } from './modal/modal.info.component'
// import { AgGridModule } from 'ag-grid-angular/main';

import { PageService } from './page.service';

import { EasyUIRichSwipeModule } from '../../'
import { RichSwipeDemoComponent } from './rich-swipe-demo/rich-swipe-demo.component';
import { IndexComponent } from './index.component'

@NgModule({
  declarations: [
    AppComponent,
    DialogDataExampleDialog,
    Bpmn2DemoComponent,
    RichSwipeDemoComponent,
    IndexComponent,
    // ModalInfoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'demo', loadChildren: './aggrid/aggrid.module#AggridModule' },
      { path: 'RichSwipeDemoComponent', component: RichSwipeDemoComponent },
      { path: 'Bpmn2DemoComponent', component: Bpmn2DemoComponent },
      { path: '**', component: IndexComponent },
    ]),
    // AgGridModule,

    MatButtonModule,

    EasyUIMdModalModule,
    // EasyUIagGridModule,
    EasyUIRichSwipeModule,
    EasyUIBpmnModule,
  ],
  providers: [
    { provide: EuPageService, useClass: PageService, },
  ],
  entryComponents: [
    DialogDataExampleDialog,
    // ModalInfoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
