import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material';
import { DataServiceService } from 'app/services/data-service.service';

@Component({
  selector: 'app-listentoast',
  templateUrl: './listentoast.component.html',
  styleUrls: ['./listentoast.component.scss']
})
export class ListenToastComponent implements OnInit {
  constructor(private snackBar: MatSnackBar, @Inject(MAT_SNACK_BAR_DATA) public data: any,public dataService: DataServiceService) {}
   
  ngOnInit() {}
}
