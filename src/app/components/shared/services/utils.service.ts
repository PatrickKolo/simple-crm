import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  loading: boolean = false;

  constructor(private router: Router) { }


   /**
   * Converts a unix timestamp to a date in the format MM/DD/YYYY
   * @param unixTimestamp the unix timestamp as param
   * @returns String date MM/DD/YYYY
   */
   convertTimestampToDate(unixTimestamp: number) {
    var a = new Date(unixTimestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear() - 1969;
    var month = months[a.getMonth()];
    var date = a.getDate();
    
    var time = date + ' ' + month + ' ' + year + ' ';
    return time;
  }

  /**
   * Converts a unix timestamp to a date in the format MM/DD/YYYY
   * @param unixTimestamp the unix timestamp as param
   * @returns String date MM/DD/YYYY
   */
  convertTimestampToBirthDate(unixTimestamp: number) {
    var a = new Date(unixTimestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear() - 53089;
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ';
    return time;
  }


  /**
   * Converts a date to a unix timestamp
   * @param date The date object from the date picker
   * @returns Unix timestamp
   */
  getUnixTimestamp(date: Date) {
    let timestamp = new Date(date).getTime();
    return timestamp;
  }


  /**
   * Converts a unix timestamp into a date object
   * @param timestamp Unix timestamp
   * @returns Date object
   */
  getDateFromTimestamp(timestamp: number) {
    let date = new Date(timestamp);
    return date;
  }

}
