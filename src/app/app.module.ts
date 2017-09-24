import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'

import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdDatepickerModule,
  MdDialogModule,
  MdExpansionModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdNativeDateModule,
  MdPaginatorModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdSortModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
} from '@angular/material';

import { ModalInfoComponent } from './modal/modal.info.component'
import { EuAggridDemoComponent } from './aggrid/eu-aggrid.demo.component'

import { AppComponent, DialogDataExampleDialog } from './app.component';
import { EasyUIMdModalModule, EasyUIagGridModule, EuPageService } from '../../'

// import { AgGridModule } from 'ag-grid-angular/main';

import { PageService } from './page.service';

import { EasyUIRichSwipeModule } from '../../'
import { RichSwipeDemoComponent } from './rich-swipe-demo/rich-swipe-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogDataExampleDialog,
    ModalInfoComponent,
    EuAggridDemoComponent,
    RichSwipeDemoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,

    // AgGridModule,

    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,

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
