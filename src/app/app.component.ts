import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from './student';
import { StudentService } from './student.service';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  public students: Student[];
  public editStudent: Student;
  public select_one: Student;
  public select_two: Student;
  chart: any = [];
  constructor(private studentService: StudentService) {}

  //this is to load the function loaded when the page is opened
  ngOnInit() {
    this.getStudents();
    var a = document.getElementById('acquisitions') as HTMLCanvasElement;
    this.chart = new Chart(a, {
      type: 'bar',
      data: {
        labels: ['English', 'Maths', 'Social', 'Science', 'Second Language'],
        datasets: [
          {
            label: 'student1',
            data: [0],
          },
          {
            label: 'student2',
            data: [0],
          },
        ],
      },
    });
  }

  public addStudent(student: Student): void {
    this.select_one = student;
    this.chart.data.datasets[0].data = [
      this.select_one.english,
      this.select_one.maths,
      this.select_one.social,
      this.select_one.science,
      this.select_one.second_lang,
    ];
    this.chart.data.datasets[0].label = this.select_one.name;
    this.chart.update();
  }
  public addStudent2(student: Student): void {
    this.select_two = student;
    this.chart.data.datasets[1].data = [
      this.select_two.english,
      this.select_two.maths,
      this.select_two.social,
      this.select_two.science,
      this.select_two.second_lang,
    ];
    this.chart.data.datasets[1].label = this.select_two.name;
    this.chart.update();
  }

  public getStudents(): void {
    this.studentService.getStudents().subscribe(
      (response: Student[]) => {
        this.students = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public updatedata(student: Student): void {
    this.editStudent = student;
    console.log(this.editStudent);
  }

  public onAddStudent(addForm: NgForm): void {
    alert('please wait as the details are saved');
    this.studentService.addStudents(addForm.value).subscribe(
      (response: Student) => {
        alert('student data added succesfully');
        console.log(response);
        this.getStudents();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onUpdateStudent(student: Student): void {
    this.studentService.updateStudents(student).subscribe(
      (response: Student) => {
        alert('student data added succesfully');
        this.getStudents();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteStudent(studentId: number): void {
    this.studentService.deleteStudents(studentId).subscribe(
      (response: void) => {
        alert('student data was deleted succesfully');
        this.getStudents();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
