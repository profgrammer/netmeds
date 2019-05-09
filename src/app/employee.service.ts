import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Employee } from './Employee';
import { catchError, map, tap } from 'rxjs/operators';

const base_url: string = "http://localhost:3000/employees/";
const base_url2: string = "http://localhost:3000/employees";
const SKILLS: string[] = ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5', 'Skill 6', 'Skill 7', 'Skill 8', 'Skill 9', 'Skill 10'];
@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  public image_url: string = "http://localhost:3000/images/";
  
  constructor(public http: HttpClient) { }

  getEmployees(): Observable<any[]>{
    return this.http.get<any[]>(base_url);
  }

  getSkills(): string[]{
    return SKILLS;
  }

  getEmployee(id: string): Observable<any>{
    return this.http.get<any>(`${base_url}${id}`);
  }

  addEmployee(data: FormData): Observable<any>{
    return this.http.post(base_url, data).pipe(
      tap(_ => console.log("Added successfully"))
    );
  }

  deleteEmployee(employee: Employee):Observable<any>{
    return this.http.delete(`${base_url}${employee._id}`).pipe(
      tap(_ => console.log("delete successful"))
    );
  }

  editEmployee(data: FormData, id: string):Observable<any>{
    return this.http.patch(`${base_url}${id}`, data).pipe(
      tap(_ => console.log("update successful"))
    );
  }

  getPaginatedEmployees(page: number, limit: number):Observable<any>{
    return this.http.get(`${base_url2}?page=${page}&limit=${limit}`).pipe(
      tap(_ => console.log("Success"))
    );
  }

  searchEmployee(term: string): Observable<any[]>{
    if(!term.trim()) return of([]);
    return this.http.get<Observable<any>[]>(`${base_url}search/${term}`).pipe(
      tap(_ => console.log(`found employees with term ${term}`))
    );
  }

}
