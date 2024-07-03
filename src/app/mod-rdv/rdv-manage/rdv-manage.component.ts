import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../mod-contact/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RdvService } from '../services/rdv.service';
import * as moment  from 'moment';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { map, filter } from 'rxjs';
import { ConfirmRdvComponent } from '../confirm-rdv/confirm-rdv.component';

@Component({
  selector: 'app-rdv-manage',
  templateUrl: './rdv-manage.component.html',
  styleUrls: ['./rdv-manage.component.scss']
})
export class RdvManageComponent {

  @Output() saveRdv = new EventEmitter<string>();

  // Contact sélectionner
  selectedContact: any;

  // Initialisation du data pour la création d'un contact
  rdv: any = {
    id: null,
    titre: null,
    date: null,
    heure_debut: null,
    heure_fin: null,
    contact: null,
    description: null,
  };

  // Initialisation du formeGroup pour le formulaire
  rdvForm = new FormGroup({
    titreCtrl: new FormControl(''),
    dateCtrl: new FormControl(''),
    heureDebutCtrl: new FormControl(''),
    heureFinCtrl: new FormControl(''),
    contactCtrl: new FormControl(''),
    descriptionCtrl: new FormControl('')
  });

  // Initialisation du données reçu lors d'un mis à jour
  rdvData = this.data;

  // Liste des contacts et des contacts filtrer
  options:any = [];
  filteredOptions: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<RdvManageComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private contactService: ContactService,
    private rdvService: RdvService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit() { 
    
    this.contactService.getContactFilter('').subscribe(res => {
      this.options = res;
    })

    this.rdvForm.get('contactCtrl')?.valueChanges.subscribe((value) => {
        this.filteredOptions = this.filterOptions(value);
      } 
    );

    if (this.rdvData || this.data){
      // Récupération des données reçu pour l'affichage sur le formulaire
      this.contactService.getContactFilter('').subscribe((res: any) => {
        res.forEach((element: any) => {
          if (element.id == this.rdvData.contact){
            this.rdvForm.patchValue({contactCtrl: element.nom +' '+ element.prenom});
            this.filteredOptions = element;
            this.selectedContact = element
          }
        });
        this.options = res;
      })
      this.rdvForm.patchValue({
        titreCtrl: this.rdvData.titre,
        dateCtrl: this.rdvData.date,
        heureDebutCtrl: this.rdvData.heure_debut,
        heureFinCtrl: this.rdvData.heure_fin,
        descriptionCtrl: this.rdvData.description,
      })
      
    }
  }

  selectionContact(option: any){
    this.selectedContact = option;
  }

  filterOptions(value: any) {
    /*
      DESC :Filtrer les contacts
    */
      return this.options.filter((option: any) => option.nom.toLowerCase().includes(value.toLowerCase()) || option.prenom.toLowerCase().includes(value.toLowerCase()));
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    /*
      DESC : Sauvegarde d'une création ou d'un mis à jour d'un contact
    */
   
    this.rdv.titre = this.rdvForm.get('titreCtrl')?.value;
    this.rdv.date = moment(this.rdvForm.get('dateCtrl')?.value).format('YYYY-MM-DD');
    this.rdv.heure_debut = this.rdvForm.get('heureDebutCtrl')?.value;
    this.rdv.heure_fin = this.rdvForm.get('heureFinCtrl')?.value;
    this.rdv.contact = this.selectedContact?.id;
    this.rdv.description = this.rdvForm.get('descriptionCtrl')?.value ? this.rdvForm.get('descriptionCtrl')?.value : null;
    
    if (this.rdvForm.valid && !this.rdvData.id && this.rdv.contact && (this.selectedContact?.nom + ' ' + this.selectedContact?.prenom == this.rdvForm.get('contactCtrl')?.value)) {
      // Création d'un rdv
      this.rdvService.createRdv(this.rdv).subscribe((data) => {
        this.snackBar.open(data.body+'', '', { duration: 3000 });
        this.dialogRef.close();
      });
    } else if (this.rdvForm.valid && this.rdvData.id && this.rdv.contact && (this.selectedContact?.nom + ' ' + this.selectedContact?.prenom == this.rdvForm.get('contactCtrl')?.value)) {
      // Mis à jour d'un rdv
      this.rdvService.updateRdv(this.rdvData.id, this.rdv).subscribe((data) => {
        this.snackBar.open(data.body+'', '', { duration: 3000 });
        this.saveRdv.emit('Contact à jour');
        this.dialogRef.close();
      });
    } else if (!this.selectedContact?.id || (this.selectedContact?.nom + ' ' + this.selectedContact?.prenom != this.rdvForm.get('contactCtrl')?.value)){
      this.snackBar.open('Veuiller sélectionner un contact', '', { duration: 3000 });
    }
  }

  onDelete() {
    /*
      DESC : Suppression d'un rendez-vous
    */
      const dialogRef = this.dialog.open(ConfirmRdvComponent, {
        data: {
          id: this.rdvData.id
        }
      });

      dialogRef.afterClosed().subscribe(res => {
        this.dialogRef.close()
      })
  }

}
