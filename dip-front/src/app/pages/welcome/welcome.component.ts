import { Component, OnInit } from '@angular/core';
import {NzContentComponent, NzFooterComponent, NzHeaderComponent, NzLayoutComponent} from "ng-zorro-antd/layout";
import {NzBreadCrumbComponent} from "ng-zorro-antd/breadcrumb";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzListComponent, NzListItemComponent} from "ng-zorro-antd/list";
import {NzInputDirective} from "ng-zorro-antd/input";
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    NzLayoutComponent,
    NzHeaderComponent,
    NzContentComponent,
    NzBreadCrumbComponent,
    NzFooterComponent,
    NzColDirective,
    NzMenuModule,
    NzDividerComponent,
    NzRowDirective,
    NzListComponent,
    NzListItemComponent,
    NzInputDirective
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
