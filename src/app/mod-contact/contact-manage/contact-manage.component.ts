import { Component, OnInit, Inject, EventEmitter, Output, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-manage',
  templateUrl: './contact-manage.component.html',
  styleUrls: ['./contact-manage.component.scss']
})
export class ContactManageComponent implements OnInit {

  @Output() saveContact = new EventEmitter<string>();

  // Initialisation du data pour la création d'un contact
  contact: any = {
    nom: null,
    prenom: null,
    phone: null,
    adresse: null,
    profession: null,
    entreprise: null,
  };

  // Initialisation du formeGroup pour le formulaire
  contactForm = new FormGroup({
    nomCtrl: new FormControl('', [Validators.required]),
    prenomCtrl: new FormControl('', [Validators.required]),
    telephoneCtrl: new FormControl('', [Validators.required]),
    adresseCtrl: new FormControl('', [Validators.required]),
    professionCtrl: new FormControl(''),
    entrepriseCtrl: new FormControl('')
  });

  // Initialisation du données reçu lors d'un mis à jour
  contactData = this.data;

  constructor(
    private dialogRef: MatDialogRef<ContactManageComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private contactService: ContactService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void { 

    if (this.contactData || this.data){
      this.contactForm.patchValue({
        nomCtrl: this.contactData.nom,
        prenomCtrl: this.contactData.prenom,
        telephoneCtrl: this.contactData.phone,
        adresseCtrl: this.contactData.adresse,
        entrepriseCtrl: this.contactData.entreprise,
        professionCtrl: this.contactData.profession,
      })
    }
  }

  onCancel(): void {
    /*
      DESC : Fermeture du dialogue
    */
    this.dialogRef.close();
  }

  onSave(): void {
    /*
      DESC : Sauvegarde d'une création ou d'un mis à jour d'un contact
    */
    
    if (this.contactForm.valid && !this.contactData) {
      // Création d'un contact
      this.contact.nom = this.contactForm.get('nomCtrl')?.value;
      this.contact.prenom = this.contactForm.get('prenomCtrl')?.value;
      this.contact.phone = this.contactForm.get('telephoneCtrl')?.value;
      this.contact.adresse = this.contactForm.get('adresseCtrl')?.value;
      this.contact.profession = this.contactForm.get('professionCtrl')?.value ? this.contactForm.get('professionCtrl')?.value : null;
      this.contact.entreprise = this.contactForm.get('entrepriseCtrl')?.value ? this.contactForm.get('entrepriseCtrl')?.value : null;

      this.contactService.createContact(this.contact).subscribe((data) => {
        this.snackBar.open(data.body+'', '', { duration: 3000 });
        this.dialogRef.close();
      });
    } else if (this.contactData) {
      // Mis à jour d'un contact
      this.contact.nom = this.contactForm.get('nomCtrl')?.value;
      this.contact.prenom = this.contactForm.get('prenomCtrl')?.value;
      this.contact.phone = this.contactForm.get('telephoneCtrl')?.value;
      this.contact.adresse = this.contactForm.get('adresseCtrl')?.value;
      this.contact.profession = this.contactForm.get('professionCtrl')?.value ? this.contactForm.get('professionCtrl')?.value : null;
      this.contact.entreprise = this.contactForm.get('entrepriseCtrl')?.value ? this.contactForm.get('entrepriseCtrl')?.value : null;

      this.contactService.updateContact(this.contactData.id, this.contact).subscribe((data) => {
        this.snackBar.open(data.body+'', '', { duration: 3000 });
        this.saveContact.emit('Contact à jour');
        this.dialogRef.close();
      });
    }
  }

}
