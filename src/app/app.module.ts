import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { voiceBotService } from './voiceBot.service';
import { ListenComponent } from './listen/listen.component';
import { SpeechService } from './speech.service';
import { AgGridModule } from 'ag-grid-angular';
import { ExcelService } from './excel-export.service';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatSnackBarModule,
} from '@angular/material';
import { ExportCheckBoxComponent } from './components/export-checkbox';
import { ListenToastComponent } from './listen-toast/listentoast.component';

@NgModule({
  declarations: [
    AppComponent,
    ListenComponent,
    ExportCheckBoxComponent,
    ListenToastComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    voiceBotService,
    SpeechService,
    ExcelService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
