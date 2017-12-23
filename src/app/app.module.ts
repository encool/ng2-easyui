import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
} from '@angular/material';

// import { TreeModule } from "ng2-tree";

import { AppComponent, DialogDataExampleDialog } from './app.component';
import {
  EasyUIMdModalModule,
  EasyUIRichSwipeModule,
  EasyUIAngularTreeModule,
  EasyUIMatContainerModule,
  EasyUIMatMenuSideBarModule,
  EasyUIMenuModule,
  EasyUIMatPanelModule,
  // EasyUINg2TreeModule,
  EasyUIAntTreeModule,

  // EuBpmnService,
  TitleGuard,
  // } from 'ng2-easyui'
} from '../../widget'
import {
  EuPageService,
  EuBpmnService,
} from "ng2-easyui.core";
import { Bootstrap3GridModule } from "ng2-bootstrap3-grid";

import { PageService } from './page.service';
import { BpmnService } from './bpmn.service';

import { RichSwipeDemoComponent } from './rich-swipe-demo/rich-swipe-demo.component';
import { AngTreeDemoComponent } from './angular-tree/angular-tree.demo.component'
import { MatPanelDemoComponent } from './mat-panel/mat-panel.demo.component'
// import { Ng2TreeDemoComponent } from "./ng2-tree/ng2-tree.demo.component";
import { AntdTreeDemoComponent } from "./antd-tree/antd-tree.demo.component";

import { IndexComponent } from './index.component'
import { EntryComponent } from "./entry.component";

@NgModule({
  declarations: [
    AppComponent,
    DialogDataExampleDialog,
    MatPanelDemoComponent,
    // Ng2TreeDemoComponent,
    AntdTreeDemoComponent,

    RichSwipeDemoComponent,
    AngTreeDemoComponent,
    IndexComponent,
    EntryComponent,
    // ModalInfoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([{
      path: "",
      data: { title: "首页" },
      canActivate: [TitleGuard],
      canActivateChild: [TitleGuard],
      children: [
        { path: 'demo', loadChildren: './aggrid/aggrid.module#AggridModule' },
        { path: 'Bpmn2Demo', loadChildren: './bpmn2/bpmn2.module#Bpmn2Module' },
        { path: 'RichSwipeDemoComponent', component: RichSwipeDemoComponent, data: { title: "翻页效果" } },
        { path: 'MatPanelDemoComponent', component: MatPanelDemoComponent, data: { title: "MatPanel" } },
        // { path: 'Ng2TreeDemoComponent', component: Ng2TreeDemoComponent, data: { title: "Ng2Tree" } },
        { path: 'AntdTreeDemoComponent', component: AntdTreeDemoComponent, data: { title: "AntdTree" } },
        { path: 'AngTreeDemoComponent', component: AngTreeDemoComponent, data: { title: "angular-tree" } },
        { path: 'EntryComponent', component: EntryComponent, data: { title: "entry" } },
        { path: '**', redirectTo: "EntryComponent" },
      ]
    }]),
    Bootstrap3GridModule,

    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,

    // TreeModule,

    EasyUIMdModalModule,
    // EasyUIagGridModule,
    EasyUIRichSwipeModule,
    EasyUIAngularTreeModule,
    EasyUIMatContainerModule,
    EasyUIMenuModule,
    EasyUIMatMenuSideBarModule.forRoot(),
    EasyUIMatContainerModule.forRoot(),
    EasyUIMatPanelModule,
    // EasyUINg2TreeModule,
    EasyUIAntTreeModule
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
