import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ExcelService {
  private headers: string[];

  constructor(public datepipe: DatePipe) {}
  async generateExcel(dataToExport) {
    const header = ['Serial No','Patent Number', 'Title', 'Dwpi Title'];
    const data = this.formatExportData(dataToExport);
    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Add Header Row
    worksheet.addRow(header);
    // Add Data and Conditional Formatting
    data.forEach((rowData) => {
      worksheet.addRow(rowData);
    });
    let rowIndex = 1;
    for (rowIndex; rowIndex <= worksheet.rowCount; rowIndex++) {
      worksheet.getRow(rowIndex).alignment = { vertical: 'top', wrapText: true };
    }
    worksheet.columns.forEach(function (column) {
      var dataMax = 0;
      column.eachCell({ includeEmpty: true }, function (cell) {
        var columnLength = cell.value ? cell.value.toString().length : 1;
        if (columnLength > dataMax) {
          dataMax = columnLength;
        }
      });
      column.width = dataMax < 10 ? 10 : 60;
    });
    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((workbookData: any) => {
      const blob = new Blob([workbookData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'excel' + this.datepipe.transform(new Date(), 'yyyy-MM-dd-HH-mm-ss') + '.xlsx');
    });
  }
  public formatExportData(dataToExport) {
    let formattedData = [];
    let dataPerPublications = [];
    for (const dataPerDialogPatent of dataToExport) {
        dataPerPublications.push(dataPerDialogPatent.serialNo);
        dataPerPublications.push(dataPerDialogPatent.patentNumber);
        dataPerPublications.push(dataPerDialogPatent.patentTitle);
        dataPerPublications.push(dataPerDialogPatent.dwpiTitle);
        formattedData.push(dataPerPublications);
        dataPerPublications = [];
    }
    return formattedData;
  }
}
