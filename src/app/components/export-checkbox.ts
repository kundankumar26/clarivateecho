import { ICellRendererParams } from '@ag-grid-community/all-modules';
import { Component, OnInit } from '@angular/core';
import { SpeechService } from './../speech.service';

@Component({
  selector: 'app-export-textarea',
  templateUrl: './export-checkbox.component.html',
  styleUrls: ['./export-checkbox.scss']
})
export class ExportCheckBoxComponent implements OnInit {
  public params: ICellRendererParams;
  refresh(params: any): boolean {
    return true;
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  constructor(public speech: SpeechService) {}

  ngOnInit() {}

  public onClickOnExport(checked,rowindex) {
    this.speech.selectRecord$.next({recordNumber:rowindex+1,checkedValue:checked});
  }
}
