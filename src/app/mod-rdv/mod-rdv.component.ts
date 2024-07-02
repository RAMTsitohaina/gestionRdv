import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import frLocale from '@fullcalendar/core/locales/fr';
import { MatDialog } from '@angular/material/dialog';
import { RdvManageComponent } from './rdv-manage/rdv-manage.component';
import * as moment  from 'moment';
import { RdvService } from './services/rdv.service';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-mod-rdv',
  templateUrl: './mod-rdv.component.html',
  styleUrls: ['./mod-rdv.component.scss']
})
export class ModRdvComponent implements OnInit, AfterViewInit {

  @ViewChild('calendar', { static: false }) calendar: FullCalendarComponent | undefined;

  // Pour l'affichage du calendrier en Français
  locales = [frLocale];

  // Initialisation du calendrier
  calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      interactionPlugin
    ],
    locales: this.locales,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    events: [],
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  // Events sélectionner
  currentEvents: any[] = [];

  // Liste des rendez-vous
  rdvList: any = [];

  // Initialisation du filtre
  filter: any = {
    titre: null,
    date: null,
    heure_debut: null,
    heure_fin: null,
    contact: null,
    description: null
  }

  constructor(
    private dialog: MatDialog,
    private rdvService: RdvService,
  ) {}

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    this.refreshEvent();
  }

  getRdv(){
    /*
      DESC : Récupération des rendez-vous
    */
    try {
      this.rdvService.getRdvFilter(this.filter).subscribe(res => {
        this.rdvList = res;
      })
    }catch(error) {
      console.log ("Erreur : ", error)
    }
  }

  refreshEvent() {
    /*
      DESC : Mis à jour du calendrier
    */
    this.calendar?.getApi().removeAllEvents();

    this.rdvService.getRdvFilter(this.filter).subscribe((res: any) => {
      this.rdvList = res;
      if (res){
        res.forEach((element: any) => {
          
          let data: any = {
            titre: element.titre,
            description: element.description,
            startStr: element.date + 'T' + element.heure_debut,
            endStr: element.date + 'T' + element.heure_fin,
            idRdv: element.id,
            idContact: element.contact,
            heure_debut: element.heure_debut,
            heure_fin: element.heure_fin,
            date: element.date,
          }
    
          this.addEvent(data);
    
        });
      }
    })

  }

  addEvent(data: any){
    /*
      DESC : Ajout des rendez-vous dans le calendrier
    */
    this.calendar?.getApi().addEvent({
      title: data.titre,
      start: data.startStr,
      end: data.endStr,
      extendedProps: {
        description: data.description,
        idRdv: data.idRdv,
        contactId: data.idContact,
        titre: data.titre,
        heure_debut: data.heure_debut,
        heure_fin: data.heure_fin,
        date: data.date
      },
      editable: false,
    });
  }

  handleDateSelect(selectInfo: any) {
      /*
        DESC : Ajout d'une nouvelle date pour un rendez-vous
      */
    
    const dialogRef = this.dialog.open(RdvManageComponent, {
      data: {
        heure_debut: moment(selectInfo.start).format('HH:mm:ss'),
        heure_fin: moment(selectInfo.end).format('HH:mm:ss'),
        date: moment(selectInfo.startStr),
        allDay: selectInfo.allDay,
        data: selectInfo
      }
    });

    dialogRef.afterClosed().subscribe(res => {

      const calendarApi = selectInfo.view.calendar;

      calendarApi.unselect();

      this.refreshEvent();
        
    })
  }

  handleEvents(events: any[]) {
    this.currentEvents = events;
  }

  handleEventClick(selectInfo: any) {
    /*
      DESC :Affichage du dialogue de mis à jour quand on clique sur un évennement
    */
    let info = selectInfo.event._def.extendedProps;
    const dialogRef = this.dialog.open(RdvManageComponent, {
      data: {
        heure_debut: info.heure_debut,
        heure_fin: info.heure_fin,
        date: moment(info.date),
        id: info.idRdv,
        titre: info.titre,
        contact: info.contactId,
        description: info.description,
        // allDay: selectInfo.allDay,
        data: info
      }
    });

    dialogRef.afterClosed().subscribe(res => {

      this.refreshEvent();
        
    })
  }

}
