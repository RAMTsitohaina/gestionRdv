import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:8000/rdv/api/contact/';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { 
    
  }

  getContactFilter (filter: any) {
    /*
      DESC : Récupération des contacts avec ou sans filtre
    */
    let params = "";

    if (filter.id != null) {
      params += '&id=' + filter.id;
    }

    if (filter.nom_prenom != null){
      params += '&nom_prenom=' + filter.nom_prenom;
    }

    if (filter.phone != null){
      params += '&phone=' + filter.phone;
    }

    if (filter.adresse != null){
      params += '&adresse=' + filter.adresse;
    }

    if (filter.profession != null){
      params += '&profession=' + filter.profession;
    }

    if (filter.entreprise != null){
      params += '&entreprise=' + filter.entreprise;
    }

    if (params != '') {
      params = "?" + params
    }

    return this.http.get(`${API_URL}get_contact_filter/` + params);
  }

  createContact (contact: any) {
    /*
      DESC : service pour la Création de contact
    */

    return this.http.post(`${API_URL}create_contact/`, contact, { observe: 'response' });
    
  }

  updateContact (idContact: number, contact: any) {
    /*
      DESC : Mis à jour d'un Contact
    */

      return this.http.put(`${API_URL}update_contact/` + idContact, contact, { observe: 'response' });
  }

  deleteContact (idContact: number){
    /*
      DESC : Suppression d'un contact
    */

    return this.http.delete(`${API_URL}delete_contact/` + idContact, { observe: 'response' });
  }

}
