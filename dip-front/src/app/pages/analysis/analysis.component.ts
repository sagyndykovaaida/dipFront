import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { formatDate } from '@angular/common';
import { PlotlyModule } from 'angular-plotly.js';
import {FormsModule} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutComponent, NzHeaderComponent, NzSiderComponent, NzContentComponent } from 'ng-zorro-antd/layout';
import { NzBreadCrumbComponent, NzBreadCrumbItemComponent } from 'ng-zorro-antd/breadcrumb';
import { NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent } from 'ng-zorro-antd/menu';
import { NzRowDirective, NzColDirective, NzGridModule } from 'ng-zorro-antd/grid';
import { MatIconButton } from '@angular/material/button';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatIcon} from "@angular/material/icon";

interface StockData {
  Date: string;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume:number;
}

@Component({
  selector: 'app-analysis',
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
    NzInputModule,
    NzButtonModule,
    PlotlyModule,
    NzDatePickerModule,
    MatIconButton,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    MatIcon
  ],
  templateUrl: './analysis.component.html',
  styleUrls: ['../main-page/main-page.component.scss']
})
export class AnalysisComponent implements OnInit {

  ticker1: string = '';
  startDate1: string = '';
  endDate1: string = '';

  ticker2: string = '';
  startDate2: string = '';
  endDate2: string = '';

  graph1: any = {
    data: [
      { x: [], y: [], type: 'scatter', mode: 'lines+markers', marker: {color: 'blue'} },
    ],
    layout: {title: 'Stock Price 1'}
  };

  graph2: any = {
    data: [
      { x: [], y: [], type: 'scatter', mode: 'lines+markers', marker: {color: 'blue'} },
    ],
    layout: {title: 'Stock Price 2'}
  };
  constructor(private stockService: StockService) {}
  loadStockData1() {
    this.stockService.getStockData(this.ticker1, this.startDate1, this.endDate1).subscribe((data: StockData[]) => {
      this.graph1.data = [{
        x: data.map(d => d.Date),
        y: data.map(d => d.Close),
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'blue' }
      }];
      this.graph1.layout.title = `Closing Price of ${this.ticker1}`;
      this.updateComparison();
    });
  }
  loadStockData2() {
    this.stockService.getStockData(this.ticker2, this.startDate2, this.endDate2).subscribe((data: StockData[]) => {
      this.graph2.data = [{
        x: data.map(d => d.Date),
        y: data.map(d => d.Close),
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'blue' }
      }];
      this.graph2.layout.title = `Closing Price of ${this.ticker2}`;
      this.updateComparison();
    });
  }

  updateComparison() {
    if (this.graph1.data[0].x.length && this.graph2.data[0].x.length) {
      const prices1 = this.graph1.data[0].y;
      const prices2 = this.graph2.data[0].y;
      const dates = this.graph1.data[0].x;
      const newPrices1 = [];
      const newPrices2 = [];
      const newMarkers1 = [];
      const newMarkers2 = [];
      for (let i = 0; i < prices1.length; i++) {
        if (prices1[i] > prices2[i]) {
          newMarkers1.push('green');
          newMarkers2.push('red');
        } else {
          newMarkers1.push('red');
          newMarkers2.push('green');
        }
        newPrices1.push(prices1[i]);
        newPrices2.push(prices2[i]);
      }
      this.graph1.data = [{
        x: dates,
        y: newPrices1,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: newMarkers1 }
      }];
      this.graph2.data = [{
        x: dates,
        y: newPrices2,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: newMarkers2 }
      }];
    }
  }


  selectedTicker = '';

  ngOnInit(): void {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000); // Update every minute
  }
  protected readonly formatDate = formatDate;
  logout(): void {
    console.log("logout");
  }
  currentDateTime: string = '';
  updateDateTime(): void {
    const now = new Date();
    const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const day = daysOfWeek[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    this.currentDateTime = `${day}, ${date} ${month} ${year} ${hours}:${minutes}:${seconds}`;
  }
}
