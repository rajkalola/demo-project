import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemoService } from '../services/demo.service';

interface Employee {
  name: string;
  address: string;
  mobile: number;
  employeeID: number;
  designation: string;
}

@Injectable()
export class ChildLevelDemoService extends DemoService {
  override getServiceInfo(): string {
    return 'Service provided at child level';
  }
}

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: DemoService, useClass: ChildLevelDemoService }
  ] // This will override the root level service with a new instance
})
export class ChildComponent {
  @Input() EmpListFromChild: Employee[] = [];
  @Output() empListChange = new EventEmitter<Employee[]>();
  
  employeeForm: FormGroup;
  editMode = false;
  currentEmployeeIndex: number | null = null;
  serviceInfo! : string;

  constructor(private fb: FormBuilder, private demoService: DemoService) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      mobile: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      employeeID: [null, Validators.required],
      designation: ['', Validators.required],
    });
    this.serviceInfo = this.demoService.getServiceInfo();
  }

  addOrUpdateEmployee() {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value as Employee;
      
      if (this.editMode && this.currentEmployeeIndex !== null) {
        this.EmpListFromChild[this.currentEmployeeIndex] = employeeData;
        this.editMode = false;
        this.currentEmployeeIndex = null;
      } else {
        this.EmpListFromChild = [...this.EmpListFromChild, employeeData];
      }

      this.empListChange.emit(this.EmpListFromChild);
      this.employeeForm.reset();
    }
  }

  editEmployee(index: number) {
    this.editMode = true;
    this.currentEmployeeIndex = index;
    const employee = this.EmpListFromChild[index];
    this.employeeForm.patchValue(employee);
  }

  cancelEdit() {
    this.editMode = false;
    this.currentEmployeeIndex = null;
    this.employeeForm.reset();
  }
}
