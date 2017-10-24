import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
} from '@angular/material';

import { AppComponent, DialogDataExampleDialog } from './app.component';
import {
  EuPageService,
  EasyUIBpmnModule,
  EasyUIMdModalModule,
  EasyUIRichSwipeModule,
  EasyUIAngularTreeModule,
  EasyUIMatContainerModule,
  EasyUIMatMenuSideBarModule,
  EasyUIMenuModule,

  EuBpmnService,
  TitleGuard,
} from '../../'
// import { ModalInfoComponent } from './modal/modal.info.component'
// import { AgGridModule } from 'ag-grid-angular/main';

import { PageService } from './page.service';
import { BpmnService } from './bpmn.service';

import { RichSwipeDemoComponent } from './rich-swipe-demo/rich-swipe-demo.component';
import { Bpmn2DemoComponent } from './bpmn2/bpmn2.demo.component'
import { AngTreeDemoComponent } from './angular-tree/angular-tree.demo.component'
import { IndexComponent } from './index.component'
import { EntryComponent } from "./entry.component";

@NgModule({
  declarations: [
    AppComponent,
    DialogDataExampleDialog,
    Bpmn2DemoComponent,
    RichSwipeDemoComponent,
    AngTreeDemoComponent,
    IndexComponent,
    EntryComponent,
    // ModalInfoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot([{
      path: "",
      data: { title: "首页" },
      canActivate: [TitleGuard],
      canActivateChild: [TitleGuard],
      children: [
        { path: 'demo', loadChildren: './aggrid/aggrid.module#AggridModule' },
        { path: 'RichSwipeDemoComponent', component: RichSwipeDemoComponent, data: { title: "翻页效果" } },
        { path: 'Bpmn2DemoComponent', component: Bpmn2DemoComponent, data: { title: "bpmn2" } },
        { path: 'AngTreeDemoComponent', component: AngTreeDemoComponent, data: { title: "angular-tree" } },
        { path: 'EntryComponent', component: EntryComponent, data: { title: "entry" } },
        { path: '**', redirectTo: "EntryComponent" },
      ]
    }]),
    // AgGridModule,

    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,

    EasyUIMdModalModule,
    // EasyUIagGridModule,
    EasyUIRichSwipeModule,
    EasyUIBpmnModule,
    EasyUIAngularTreeModule,
    EasyUIMatContainerModule,
    EasyUIMenuModule.forRoot(),
    EasyUIMatMenuSideBarModule.forRoot(),
    EasyUIMatContainerModule.forRoot(),
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
