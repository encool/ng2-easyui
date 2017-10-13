import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'

import {
  MatButtonModule,
} from '@angular/material';

import { AppComponent, DialogDataExampleDialog } from './app.component';
import {
  EuPageService,
  EasyUIBpmnModule,
  EasyUIMdModalModule,
  EasyUIRichSwipeModule,
  EuBpmnService,
  EuAngularTreeModule,
} from '../../'
// import { ModalInfoComponent } from './modal/modal.info.component'
// import { AgGridModule } from 'ag-grid-angular/main';

import { PageService } from './page.service';
import { BpmnService } from './bpmn.service';

import { RichSwipeDemoComponent } from './rich-swipe-demo/rich-swipe-demo.component';
import { Bpmn2DemoComponent } from './bpmn2/bpmn2.demo.component'
import { AngTreeDemoComponent } from './angular-tree/angular-tree.demo.component'
import { IndexComponent } from './index.component'

@NgModule({
  declarations: [
    AppComponent,
    DialogDataExampleDialog,
    Bpmn2DemoComponent,
    RichSwipeDemoComponent,
    AngTreeDemoComponent,
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
      { path: 'AngTreeDemoComponent', component: AngTreeDemoComponent },
      { path: '**', component: IndexComponent },
    ]),
    // AgGridModule,

    MatButtonModule,

    EasyUIMdModalModule,
    // EasyUIagGridModule,
    EasyUIRichSwipeModule,
    EasyUIBpmnModule,
    EuAngularTreeModule,
  ],
  providers: [
    { provide: EuPageService, useClass: PageService, },
    { provide: EuBpmnService, useClass: BpmnService, },
  ],
  entryComponents: [
    DialogDataExampleDialog,
    // ModalInfoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
