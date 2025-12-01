import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PatientData {
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
  gender?: string;
  profession?: string;
  password?: string;
  phoneNumber?: string;
  username?: string;
}

export interface MedecinData {
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
  gender?: string;
  profession?: string;
  password?: string;
  phoneNumber?: string;
  username?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private _dataPatient = new BehaviorSubject<PatientData>({});
  dataPatient$ = this._dataPatient.asObservable();

  private _dataMedecin = new BehaviorSubject<PatientData>({});
  dataMedecin$ = this._dataMedecin.asObservable();

  constructor() { }

  updatePatientData(partial: Partial<PatientData>) {
    this._dataPatient.next({ ...this._dataPatient.value, ...partial });
  }

  get valuePatientData() {
    return this._dataPatient.value;
  }

  updateMedecinData(partial: Partial<PatientData>) {
    this._dataMedecin.next({ ...this._dataMedecin.value, ...partial });
  }

  get valueMedecinData() {
    return this._dataMedecin.value;
  }

}
