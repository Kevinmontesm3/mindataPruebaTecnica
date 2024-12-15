import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { UppercaseDirective } from 'src/app/core/directives/uppercase.directive';
import { Superhero } from 'src/app/core/models/superhero.model';
import { DataService } from 'src/app/core/services/data.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

const MATERIAL_MODULES = [
  MatLabel,
  MatFormField,
  MatInput,
  MatDialogContent,
  MatError,
  MatIcon,
  MatButtonModule
]

@Component({
  selector: 'app-modal-hero',
  standalone: true,
  imports: [ReactiveFormsModule, MATERIAL_MODULES, CommonModule, UppercaseDirective],
  templateUrl: './modal-hero.component.html',
  styleUrl: './modal-hero.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ModalHeroComponent implements OnInit{

  heroForm!: FormGroup

  private readonly _fb = inject(FormBuilder)
  private _dataService = inject(DataService)
  private _dialogRef = inject(MatDialogRef<ModalHeroComponent>);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
 _snackbar = inject(SnackbarService)

  ngOnInit(): void {
      this._buildForm()
      if (this._matDialog.data) {
        this.heroForm.patchValue(this._matDialog.data)
      }

  }

  getTitle(){
    return this._matDialog.data ? 'Edit Hero' : 'Add Hero'
  }
  private _buildForm(): void {
    this.heroForm = this._fb.nonNullable.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(2)]],
      realName: ['', Validators.required],
      origin: ['', Validators.required],
      powers: this._fb.array([''], Validators.required),
      weaknesses: this._fb.array([''], Validators.required),
      city: ['', Validators.required],
      team: [null],
      firstAppearance: ['', Validators.required],
      enemies: this._fb.array([''], Validators.required),
      image: [
        '',
        [Validators.required ],
      ],
    });
  }





  get powers(): FormArray {
    return this.heroForm.get('powers') as FormArray;
  }

  get powersControls() {
    return (this.heroForm.get('powers') as FormArray).controls;
  }


get weaknessesControls() {
  return (this.heroForm.get('weaknesses') as FormArray).controls;
}

get enemiesControls() {
  return (this.heroForm.get('enemies') as FormArray).controls;
}

  get weaknesses(): FormArray {
    return this.heroForm.get('weaknesses') as FormArray;
  }

  get enemies(): FormArray {
    return this.heroForm.get('enemies') as FormArray;
  }

  addPower(): void {
    this.powers.push(this._fb.control('', Validators.required));
  }

  removePower(index: number): void {
    this.powers.removeAt(index);
  }

  addWeakness(): void {
    this.weaknesses.push(this._fb.control('', Validators.required));
  }

  removeWeakness(index: number): void {
    this.weaknesses.removeAt(index);
  }

  addEnemy(): void {
    this.enemies.push(this._fb.control('', Validators.required));
  }

  removeEnemy(index: number): void {
    this.enemies.removeAt(index);
  }

  saveHero(): void {
    let message = ''
    if (this.heroForm.valid) {
      const newHero: Superhero = this.heroForm.value;
      if (newHero.id) {
        this._dataService.updateHero(newHero);
        message = 'Hero update'
      } else {
        this._dataService.addHero(newHero);
         message = 'Hero added'
      }
      this._snackbar.showSnackBar(message)
      this._dialogRef.close(true);
    }
  }

  cancel(): void {
    this._dialogRef.close(false);
  }
}
