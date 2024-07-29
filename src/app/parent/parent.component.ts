import { ChangeDetectionStrategy, Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DemoService } from '../services/demo.service';

interface Employee {
  name: string;
  address: string;
  mobile: number;
  employeeID: number;
  designation: string;
}
@Injectable()
export class ParentLevelDemoService extends DemoService {
  override getServiceInfo(): string {
    return 'Service provided at Parent level';
  }
}

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    { provide: DemoService, useClass: ParentLevelDemoService }
  ]
})
export class ParentComponent implements OnInit {
  employeeForm!: FormGroup;
  empListFromParent: Employee[] = [];
  serviceInfo!: string;


  constructor(private fb: FormBuilder,private demoService : DemoService) {}

  ngOnInit(): void {
    this.serviceInfo = this.demoService.getServiceInfo();
    this.employeeForm = this.fb.group({
      name: [''],
      address: [''],
      mobile: [null],
      employeeID: [null],
      designation: [''],
    });
  }

  addNewEmployee() {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value as Employee;
      this.empListFromParent = [...this.empListFromParent, employeeData];
      this.employeeForm.reset();
    }
  }
  updateEmployeeList(empList: Employee[]) {
    this.empListFromParent = empList;
  }
}
