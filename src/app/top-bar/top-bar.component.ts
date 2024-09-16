import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTruck  } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-top-bar',
  standalone: true,
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
  imports: [CommonModule,    FontAwesomeModule  ]  
})
export class TopBarComponent {
  faTruck  = faTruck ;
  @Input() selectedPlateNumber: string | null = null;
}
