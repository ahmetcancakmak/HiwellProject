import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  apiUrl = environment.apiUrl;

  getData() : Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/users`)
  }

  getPsy() : Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/psy`)
  }

  getSavedDatas() : Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/getData`)
  }

  setSavedDatas(savedDatas:User[]) : Observable<User[]>{
    return this.http.post<User[]>(`${this.apiUrl}/setData`, savedDatas).pipe()
  }
}
