import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {ModalDismissReasons, NgbModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {first} from "rxjs/operators";
import {User} from "../../models/user";
import {Appointment} from "../../models/appointment";

@Component({
  selector: 'app-appointments-by-client-listing-page',
  templateUrl: './appointments-by-client-listing-page.component.html',
  styleUrls: ['./appointments-by-client-listing-page.component.css']
})
export class AppointmentsByClientListingPageComponent implements OnInit {

  constructor(private dataService:DataService,private modalService:NgbModal) { }
  model!: NgbDateStruct;
  data!: any[];
  psy!: any[];
  closeResult!:string;
  savedData: any = {
    psyName: "",
    date: "",
    subject: "",
    description: ""
  };
  setDatas: User[] = [];
  getDatas: User[] = [];
  key  = '';
  reverse = false;
  appointments!: Appointment[];

  ngOnInit(): void {
    this.getData();
    this.getPsy();
    this.getSavedDatas();
  }

  getData(){
    this.dataService.getData().subscribe(data=>{
      this.data = data;
    });
  }

  getPsy(){
    this.dataService.getPsy().subscribe(data=>{
      this.psy = data;
    });
  }

  getSavedDatas(){
    this.dataService.getSavedDatas().subscribe(data=>{
      this.getDatas = data;
      this.appointments = [];
      this.getDatas.forEach(val => this.appointments.push(Object.assign({}, val.appointment)));
    });
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  save(){
    localStorage.setItem('form-data', JSON.stringify(this.savedData));
    this.setDatas.push(this.savedData);
    this.dataService.setSavedDatas(this.setDatas).pipe(first()).subscribe();
  }

  sort(key:any){
    this.key = key;
    this.reverse = !this.reverse;
  }

  cancelAppointment(status:Appointment){
    status.status = false;
  }

}
