import { Component, effect, inject, OnInit } from '@angular/core';
import { GridComponent } from '@shared/components/grid/grid.component';
import { ColumnsKeys, Superhero } from 'src/app/core/models/superhero.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-list-heros',
  standalone: true,
  imports: [GridComponent],
  templateUrl: './list-heros.component.html',
  styleUrl: './list-heros.component.scss'
})


export class ListHerosComponent  {


  private dataService = inject(DataService);


  data!: Superhero[];
  displayedColumns: ColumnsKeys<Superhero> = ['image', 'id', 'name', 'realName', 'city', 'origin', 'actions'];
  sortables:ColumnsKeys<Superhero>  = [ 'id', 'name', 'realName', 'city', 'origin']


  constructor(){
    effect(() => {
      this.data = this.dataService.sortedHeroes();
    });
  }

}



