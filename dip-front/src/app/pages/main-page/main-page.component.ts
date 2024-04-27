import {Component, Input} from '@angular/core';
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent, NzSiderComponent} from "ng-zorro-antd/layout";
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from "ng-zorro-antd/breadcrumb";
import {NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent} from "ng-zorro-antd/menu";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import { NzGridModule } from 'ng-zorro-antd/grid';
import {NzIconModule} from "ng-zorro-antd/icon";
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import {CurrencyPipe, DecimalPipe, NgClass, NgForOf, NgStyle, PercentPipe} from "@angular/common";
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import {NzRadioComponent, NzRadioGroupComponent} from "ng-zorro-antd/radio";
import {FormsModule} from "@angular/forms";
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    NzHeaderComponent,
    NzLayoutComponent,
    NzSiderComponent,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzContentComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    NzSubMenuComponent,
    NzRowDirective,
    NzColDirective,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzAvatarModule,
    NgForOf,
    PercentPipe,
    CurrencyPipe,
    NzCarouselModule,
    NgClass,
    NzRadioGroupComponent,
    FormsModule,
    NzRadioComponent,
    NzButtonModule
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  timeRange: string = '1D';
  stocks = [
    { icon: 'https://logo.clearbit.com/spotify.com', name: 'Spotify', ticker: 'SPOT', price: '$310,40', change: '-1,10%' },
    { icon: 'https://logo.clearbit.com/airbnb.com', name: 'Airbnb', ticker: 'ABNB', price: '$310,40', change: '-1,10%' },
    { icon: 'https://logo.clearbit.com/shopify.com', name: 'Shopify', ticker: 'SHOP', price: '$310,40', change: '1,10%' },
    { icon: 'https://logo.clearbit.com/google.com', name: 'Google', ticker: 'GOOGL', price: '$310,40', change: '-1,10%' },
    { icon: 'https://logo.clearbit.com/playstation.com', name: 'Playstation', ticker: 'SONY', price: '$310,40', change: '-1,10%' },
    { icon: 'https://logo.clearbit.com/paypal.com', name: 'Paypal', ticker: 'PYPL', price: '$310,40', change: '-1,10%' },
    { icon: 'https://logo.clearbit.com/ibm.com', name: 'IBM', ticker: 'IBM', price: '$310,40', change: '-1,10%' },
    { icon: 'https://logo.clearbit.com/apple.com', name: 'Apple', ticker: 'APPL', price: '$310,40', change: '-1,10%' },
    { icon: 'https://logo.clearbit.com/microsoft.com', name: 'Microsoft', ticker: 'MSFT', price: '$310,40', change: '-1,10%' },
    { icon: 'https://logo.clearbit.com/intel.com', name: 'Intel Corp', ticker: 'INTC', price: '$310,40', change: '-1,10%' },
    // Добавьте другие акции здесь
  ];

}
