import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RdvService } from '../services/rdv.service'

@Component({
  selector: 'app-confirm-rdv',
  templateUrl: './confirm-rdv.component.html',
  styleUrls: ['./confirm-rdv.component.scss']
})
export class ConfirmRdvComponent {

  @Output() deleteContact = new EventEmitter<string>();

  // Données à supprimer
  rdvData = this.data;

  constructor(
    private dialogRef: MatDialogRef<ConfirmRdvComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private rdvService: RdvService,
    private snackBar: MatSnackBar,
  ){}

  onCancel(): void {
    /*
      DESC : Fermer le dialogue
    */
    this.dialogRef.close();
  }

  onDelete() {
    /*
      DESC : Suppression d'un contact
    */

    this.rdvService.deleteRdv(this.rdvData.id).subscribe((data) => {
      if (data){
        this.snackBar.open(data.body+'', '', { duration: 3000 });
        this.dialogRef.close({data: data});
      }
    });
  }

}
