import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const MATERIAL_MODULES =[
  MatFormFieldModule,
  MatInputModule
]

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MATERIAL_MODULES,
    FormsModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class FilterComponent {



  filter = model('');
  placeholder = input<string>('Name')
}
