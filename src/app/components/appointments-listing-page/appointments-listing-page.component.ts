import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {User} from "../../models/user";
import {Appointment} from "../../models/appointment";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-appointments-listing-page',
  templateUrl: './appointments-listing-page.component.html',
  styleUrls: ['./appointments-listing-page.component.css']
})
export class AppointmentsListingPageComponent implements OnInit {

  constructor(private dataService:DataService,private modalService:NgbModal) { }

  getData!: User[];
  username!: string[];
  appointments!: Appointment[];
  closeResult!:string;
  modalDescription:any;
  key  = '';
  reverse = false;

  ngOnInit(): void {
    this.getSavedDatas();
  }

  getSavedDatas(){
    this.dataService.getSavedDatas().subscribe(data=>{
      this.getData = data;
      this.username = this.getData.map(val => val.username);
      this.appointments = [];
      this.getData.forEach(val => this.appointments.push(Object.assign({}, val.appointment)));
    });
  }

  open(content:any,description:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.modalDescription = description;
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

  approveAppointment(status:Appointment){
    status.status = true;
  }

  cancelAppointment(status:Appointment){
    status.status = false;
  }


  sort(key:any){
    this.key = key;
    this.reverse = !this.reverse;
  }

}
