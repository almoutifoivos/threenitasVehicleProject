import { Component, EventEmitter, Output } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import vehicleData from '../assets/vehicles.json';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatInputModule, CommonModule, ReactiveFormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  vehicles: { id: number; plate: string }[] = vehicleData;
  filteredVehicles: { id: number; plate: string }[] = this.vehicles;

  @Output() vehicleSelected = new EventEmitter<string>();

  searchControl: FormControl = new FormControl('');

  constructor() {
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((searchText: string) => {
      this.filterVehicles(searchText);
    });
  }

  onVehicleSelect(plateNumber: string): void {
    this.vehicleSelected.emit(plateNumber);
  }

  filterVehicles(searchText: string): void {
    if (!searchText) {
      this.filteredVehicles = this.vehicles;
    } else {
      this.filteredVehicles = this.vehicles.filter((vehicle) =>
        vehicle.plate.toLowerCase().includes(searchText.toLowerCase())
      );
    }
  }
}
