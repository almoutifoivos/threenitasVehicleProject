import { Component, Input, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import recordsData from '../assets/records.json';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

import { DatePipe } from '@angular/common';

interface Record {
  serialNumber: string;
  fullName: string;
  driverId: number;
  plate: string;
  issueDate: string; 
  isApproved: boolean;
  tierAmount: number;
  registrationAmount: number;
  consumptionAmount: number;
  rewardAmount: number;
}

@Component({
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatPaginatorModule,
  ],
  providers: [DatePipe],
  selector: 'app-search-fields',
  templateUrl: './search-fields.component.html',
  styleUrls: ['./search-fields.component.css'],
})
export class SearchFields implements OnChanges, AfterViewInit {
  
  @Input() selectedVehicle: string | null = null;
  records: Record[] = recordsData;
  dataSource: MatTableDataSource<Record> = new MatTableDataSource(this.records);
  uniqueNames: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filterForm: FormGroup;

  displayedColumns: string[] = [
    'serialNumber', 
    'fullName', 
    'issueDate', 
    'isApproved', 
    'tierAmount', 
    'registrationAmount', 
    'consumptionAmount', 
    'rewardAmount'
  ];

  constructor(private fb: FormBuilder, private datePipe: DatePipe) {
    this.filterForm = this.fb.group({
      serialNumber: [''],
      fullName: [''],
      issueDate: [''], 
      status: [''],
    });

    // Extract unique names from records
    this.uniqueNames = [...new Set(this.records.map(record => record.fullName))];
  }

  ngOnChanges(): void {
    this.applyFilter();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 5;
  }

  convertYYYYMMDDtoDate(dateString: string): Date {
    const year = parseInt(dateString.substring(0, 4), 10);
    const month = parseInt(dateString.substring(4, 6), 10) - 1; 
    const day = parseInt(dateString.substring(6, 8), 10);
    return new Date(year, month, day);
  }

  applyFilter(): void {
    const { serialNumber, fullName, issueDate, status } = this.filterForm.value;

    const filteredRecords = this.records.filter((record) => {
      const matchesSerial = !serialNumber || record.serialNumber.includes(serialNumber);
      const matchesFullName = !fullName || record.fullName === fullName;

      const recordIssueDate = this.convertYYYYMMDDtoDate(record.issueDate);
      const formattedRecordIssueDate = this.datePipe.transform(recordIssueDate, 'dd/MM/yyyy');

      const inputIssueDate = issueDate ? this.datePipe.transform(issueDate, 'dd/MM/yyyy') : null;
      const matchesIssueDate = !inputIssueDate || formattedRecordIssueDate === inputIssueDate;

      const matchesStatus =
        status === '' ||
        (status === 'approved' && record.isApproved) ||
        (status === 'canceled' && !record.isApproved);

      const matchesVehicle = this.selectedVehicle ? record.plate === this.selectedVehicle : true;

      return matchesSerial && matchesFullName && matchesIssueDate && matchesStatus && matchesVehicle;
    });

    this.dataSource.data = filteredRecords;
  }

  onSearch(): void {
    this.applyFilter();
  }

  getFormattedDate(yyyymmdd: string): string | null {
    const date = this.convertYYYYMMDDtoDate(yyyymmdd);
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
}
