import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, input, OnInit, viewChild, signal, effect, inject } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { Superhero } from 'src/app/core/models/superhero.model';
import { FilterComponent } from '../filter/filter.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from 'src/app/core/services/data.service';
import { ModalHeroService } from '../modal-hero/modal-hero.service';
import { ModalHeroComponent } from '../modal-hero/modal-hero.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Router } from '@angular/router';

const MATERIAL_MODULES = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule
]
@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [MATERIAL_MODULES, CommonModule, FilterComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent implements OnInit, AfterViewInit {

  displayedColumns = input.required<string[]>();
  valueFilter= signal('');
  data = input.required<any[]>()
  dataSource = new MatTableDataSource<any>();
  sort = viewChild.required<MatSort>(MatSort)
  paginator = viewChild.required<MatPaginator>(MatPaginator)
  sortableColumns = input<string[]>([]);
  private dataService = inject(DataService);
  private readonly _modalService = inject(ModalHeroService);
  snackbarService = inject(SnackbarService)
  private router = inject(Router)

  constructor(){
    effect(()=>{
      if (this.valueFilter()) {
        this.dataSource.filter = this.valueFilter();
      }else{
        this.dataSource.filter = ''
      }
      if (this.data) {
        this.dataSource.data = this.data();
      }
    }, {allowSignalWrites: true})

    //filtrar solo por el nombre
    // this.dataSource.filterPredicate = (data: Superhero, filter: string) => {
    //   return data.name.toLowerCase().includes(filter);
    // };
  }


  ngOnInit(): void {
    this.dataSource.data = this.data()
    this.dataSource.sort = this.sort();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator();
  }

  deleteHero(id : number){
    const confirmation = confirm('Are you sure you want to delete this hero?')
    if (confirmation) {
      this.dataService.deleteHero(id)
      this.snackbarService.showSnackBar('Hero delete')
    }
  }

  detailHero(id : number){
    this.router.navigate([`/list-heros/detail/${id}`])
  }

  editHero(hero : Superhero){
    this._modalService.openModal<ModalHeroComponent, any>(ModalHeroComponent, hero)
  }
  columnClass(column: string): string {
    return `mat-column-${column}`;
  }
}



