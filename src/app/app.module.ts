import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'

import {
  MdButtonModule,
} from '@angular/material';

import { ModalInfoComponent } from './modal/modal.info.component'
import { EuAggridDemoComponent } from './aggrid/eu-aggrid.demo.component'

import { AppComponent, DialogDataExampleDialog } from './app.component';
import { EasyUIMdModalModule, EasyUIagGridModule, EuPageService } from '../../'

// import { AgGridModule } from 'ag-grid-angular/main';

import { PageService } from './page.service';

import { EasyUIRichSwipeModule } from '../../'
import { RichSwipeDemoComponent } from './rich-swipe-demo/rich-swipe-demo.component';
import { IndexComponent } from './index.component'

@NgModule({
  declarations: [
    AppComponent,
    DialogDataExampleDialog,
    ModalInfoComponent,
    EuAggridDemoComponent,
    RichSwipeDemoComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'EuAggridDemoComponent', component: EuAggridDemoComponent },
      { path: 'RichSwipeDemoComponent', component: RichSwipeDemoComponent },
      { path: '**', component: IndexComponent },
    ]),
    // AgGridModule,

    MdButtonModule,

    EasyUIMdModalModule,
    EasyUIagGridModule,
    EasyUIRichSwipeModule,
  ],
  providers: [
    { provide: EuPageService, useClass: PageService, },
  ],
  entryComponents: [DialogDataExampleDialog, ModalInfoComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
