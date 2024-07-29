import { Component, Injectable, OnInit } from '@angular/core';
import { DemoService } from './services/demo.service';
@Injectable()
export class RootLevelDemoService extends DemoService {
  override getServiceInfo(): string {
    return 'Service provided at app root level';
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{ provide: DemoService, useClass: RootLevelDemoService }], // This will override the root level service with a new instance
})
export class AppComponent implements OnInit {
  serviceInfo!: string;

  constructor(private demoService: DemoService) {}

  ngOnInit(): void {
    this.serviceInfo = this.demoService.getServiceInfo();
  }
}
