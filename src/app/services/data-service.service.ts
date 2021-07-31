import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { oxygen,covid,machineLearning,fiveG, oxygenAtmosphere, oxygenCorona, oxygenHuman, oxygenMachine, oxygenPlants, roboAgri, roboAI, roboEdu, robohealth, roboHotel, robotics, virtualReality, vrEducation, vrGaming, vrHealthcare, vrMovies, vrMultiMedia } from 'app/mock-data/mock-data';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  public searchedData = [];
  errorMsg: string;
  map: any = new Map([
    ['oxyg', oxygen],
    ['virt', virtualReality],
    ['robo', robotics]
  ]);

  resultMap: any = new Map([
    ['1234', oxygenMachine],
    ['covid', covid],
    ['machine learning', machineLearning],
    ['technology', fiveG],

    ['Oxygen Concentrators', oxygenHuman],
    ['Oxygen Cylinders', oxygenCorona],
    ['Oxygen sewage treatment', oxygenPlants],
    ['Oxygen rocket repellant', oxygenAtmosphere],
    ['Oxygen sewage treatment', oxygenMachine],

    ['virtual reality multimedia', vrMultiMedia],
    ['virtual reality movies', vrMovies],
    ['virtual reality education', vrEducation],
    ['virtual reality healthcare', vrHealthcare],
    ['virtual reality gaming', vrGaming],

    ['robotics healthcare', robohealth],
    ['robotics agriculture', roboAgri],
    ['robotics education', roboEdu],
    ['robotics AI', roboAI],
    ['robotics hotel', roboHotel],
  ]);

  public searchedQuery: any = new BehaviorSubject({text: '', pnNumber: ''});
  public updateRowData: any = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }

  getPnBySearch(query: string) {
    let result = '';
    this.map.forEach((value, key) => {
      if(query.toLowerCase().includes(key.toLowerCase())) {
        result = value;
      }
    });
    return result;
  }

  getPnByQuery(query: any): any {
    let result = [];
    if(!query[`text`] && !query[`pnNumber`]){
      return result;
    }
    
    this.resultMap.forEach((value, key) => {
      if(query[`text`] && query[`text`].toLowerCase() === key.toLowerCase()) {
        result = value;
      }
      value.forEach(element => {
        if(!query[`text`] && query[`pnNumber`] && element.publicationNumber == query[`pnNumber`]){
          result.push(element);
        }
      });
    });
    return result;
  }
}
