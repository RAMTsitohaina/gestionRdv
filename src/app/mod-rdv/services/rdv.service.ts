import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:8000/rdv/api/rdv/';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  constructor(private http: HttpClient) { }

  getRdvFilter (filter: any) {
    /*
      DESC : Récupération des rendez-vous avec ou sans filtre
    */
    let params = "";

    if (filter.titre != null){
      params += '&titre=' + filter.titre;
    }

    if (filter.date != null){
      params += '&date=' + filter.date;
    }

    if (filter.heure != null){
      params += '&heure=' + filter.heure;
    }

    if (filter.contact != null){
      params += '&contact=' + filter.contact;
    }

    if (params != '') {
      params = "?" + params
    }

    return this.http.get(`${API_URL}get_rdv_filter/` + params);
  }

  createRdv (rdv: any) {
    /*
      DESC : service pour la Création de rdv
    */

    return this.http.post(`${API_URL}create_rdv/`, rdv, { observe: 'response' });
    
  }

  updateRdv (idRdv: number, rdv: any) {
    /*
      DESC : Mis à jour d'un Rendez-vous
    */

      return this.http.put(`${API_URL}update_rdv/` + idRdv, rdv, { observe: 'response' });
  }

  deleteRdv (idRdv: number){
    /*
      DESC : Suppression d'un Rendez-vous
    */

    return this.http.delete(`${API_URL}delete_rdv/` + idRdv, { observe: 'response' });
  }

}
