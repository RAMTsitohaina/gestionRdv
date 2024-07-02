import { Component, OnInit } from '@angular/core';
import { ContactManageComponent } from './contact-manage/contact-manage.component';
import { MatDialog } from '@angular/material/dialog';
import { ContactService } from './contact.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmContactComponent } from './confirm-contact/confirm-contact.component';

@Component({
  selector: 'app-mod-contact',
  templateUrl: './mod-contact.component.html',
  styleUrls: ['./mod-contact.component.scss']
})
export class ModContactComponent implements OnInit {

  // Formulaire pour le filtre des contacts : 
  contactForm = new FormGroup({
    nomPrenomCtrl: new FormControl(''),
    telephoneCtrl: new FormControl(''),
    adresseCtrl: new FormControl(''),
    professionCtrl: new FormControl(''),
    entrepriseCtrl: new FormControl('')
  });

  // Afichage du pop-up de confirmation de suppression d'un contact
  showPopUpDelete: boolean = false;

  contactData: any = [];

  // Afficher ou non le message de confirmation de suppression
  showDeleteCOnfirmation: boolean = false;

  // Filtre des contacts
  filter: any = {
    nom_prenom: null,
    phone: null,
    adresse: null,
    profession: null,
    entreprise: null
  };

  constructor(private dialog: MatDialog, private contactService: ContactService) {}

  ngOnInit() {

    // Appele de tous les contacts
    this.getContact();
    
    this.contactForm.get('nomPrenomCtrl')?.valueChanges.subscribe((value) => {
      if (value != ''){
        this.filter.nom_prenom = value;
      } else {
        this.filter.nom_prenom = null;
      }
      this.getContact();
    });

    this.contactForm.get('telephoneCtrl')?.valueChanges.subscribe((value) => {
      if (value != ''){
        this.filter.phone = value;
      } else {
        this.filter.phone = null
      }
      this.getContact();
    });

    this.contactForm.get('adresseCtrl')?.valueChanges.subscribe((value) => {
      if (value != '') {
        this.filter.adresse = value;
      } else {
        this.filter.adresse = null;
      }
      this.getContact();
    });

    this.contactForm.get('professionCtrl')?.valueChanges.subscribe((value) => {
      if (value != '') {
        this.filter.profession = value;
      } else {
        this.filter.profession = null;
      }
      this.getContact();
    });

    this.contactForm.get('entrepriseCtrl')?.valueChanges.subscribe((value) => {
      if (value != '') {
        this.filter.entreprise = value;
      } else {
        this.filter.entreprise = null;
      }
      this.getContact();
    });

  }

  getContact(){
    /*
      DESC : Récupération des contacts
    */
    try {
      this.contactService.getContactFilter(this.filter).subscribe(data => {
        this.contactData = data;
      });
    } catch (error) {
      console.log ("Erreur : ", error)
    }
  }

  openDialog(): void {
    /*
      DeSC : Ouvrir le dialog de création de contact
    */
    const dialogRef = this.dialog.open(ContactManageComponent);

    dialogRef.afterClosed().subscribe(result => {
        this.getContact();
    })
  }

  openContactEdit(contact: any) {
    /*
      DESC : Ouvrir le dialog d'édition de contact
    */
    if (!this.showDeleteCOnfirmation){
      const dialogRef = this.dialog.open(ContactManageComponent, {
        data: {
          id: contact.id,
          nom: contact.nom,
          prenom: contact.prenom,
          phone: contact.phone,
          adresse: contact.adresse,
          entreprise: contact.entreprise,
          profession: contact.profession
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.getContact();
      })
    }

  }

  showDelete(contact: any){
    /*
      Affichage du pop up de confirmation de suppression du contact
    */

    this.showDeleteCOnfirmation = true

    const dialogRef = this.dialog.open(ConfirmContactComponent, {
      data: {
        nomPrenom: contact.nom + " " + contact.prenom,
        id: contact.id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.showDeleteCOnfirmation = false;
      this.getContact();
    })
  }
}
