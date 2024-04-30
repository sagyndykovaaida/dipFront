import { Component, OnInit } from '@angular/core';
import {NzContentComponent, NzFooterComponent, NzHeaderComponent, NzLayoutComponent} from "ng-zorro-antd/layout";
import {NzBreadCrumbComponent} from "ng-zorro-antd/breadcrumb";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzListComponent, NzListItemComponent} from "ng-zorro-antd/list";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import {ReactiveFormsModule} from '@angular/forms';
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
    NzInputDirective,
    NzButtonComponent,
    NzCardModule,
    NzModalModule,
    NzInputGroupComponent,
    NzInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  ngOnInit() {
  }

}
