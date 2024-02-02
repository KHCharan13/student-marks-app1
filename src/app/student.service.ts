import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Student } from './student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}
  public getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiServerUrl}/student`);
  }
  public addStudents(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiServerUrl}/student`, student);
  }
  public updateStudents(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiServerUrl}/student/update`, student);
  }
  public deleteStudents(roll_number: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/student/delete/${roll_number}`
    );
  }
}
