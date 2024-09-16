import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SearchFields } from './search-fields/search-fields.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [SidebarComponent, TopBarComponent,SearchFields],
})
export class AppComponent {
  title = 'vehicleProject';
  selectedPlateNumber: string | null = null;

  onVehicleSelected(plateNumber: string): void {
    this.selectedPlateNumber = plateNumber;
  }
}

