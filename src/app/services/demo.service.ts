import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor() { }
  getServiceInfo(): string {
    return 'Service provided at root level';
  }
}
