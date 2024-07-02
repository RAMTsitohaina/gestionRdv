import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactService } from '../contact.service';


@Component({
  selector: 'app-confirm-contact',
  templateUrl: './confirm-contact.component.html',
  styleUrls: ['./confirm-contact.component.scss']
})
export class ConfirmContactComponent {

  @Output() deleteContact = new EventEmitter<string>();

  // Données à supprimer
  contactData = this.data;

  constructor(
    private dialogRef: MatDialogRef<ConfirmContactComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private contactService: ContactService,
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

    this.contactService.deleteContact(this.contactData.id).subscribe((data) => {
      if (data){
        this.snackBar.open(data.body+'', '', { duration: 3000 });
        this.dialogRef.close({data: data});
      }
    });
  }

}
