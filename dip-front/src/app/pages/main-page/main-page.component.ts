import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { formatDate } from '@angular/common';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutComponent, NzHeaderComponent, NzSiderComponent, NzContentComponent } from 'ng-zorro-antd/layout';
import { NzBreadCrumbComponent, NzBreadCrumbItemComponent } from 'ng-zorro-antd/breadcrumb';
import { NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent } from 'ng-zorro-antd/menu';
import { NzRowDirective, NzColDirective, NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatIconButton } from '@angular/material/button';
import { NgForOf, NgClass, PercentPipe, CurrencyPipe } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {Stock, stocks} from "../companies";
PlotlyModule.plotlyjs = PlotlyJS;

interface StockData {
  Date: string;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume:number;
}

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
    NzButtonModule,
    PlotlyModule,
    NzDatePickerModule,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    ReactiveFormsModule,
    MatIcon,
    NzModalModule,
    MatIconModule,
    NzSwitchComponent,
    MatMenuTrigger,
    MatMenu,
    MatSlideToggle,
    MatMenuItem,
    MatIconButton,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  stocks: Stock[][] = this.groupStocks(stocks);

  private groupStocks(stocks: Stock[]): Stock[][] {
    const groupedStocks: Stock[][] = [];
    for (let i = 0; i < stocks.length; i += 6) {
      groupedStocks.push(stocks.slice(i, i + 6));
    }
    return groupedStocks;
  }
  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  date = null;
  ticker: string = '';
  startDate: string = '';
  endDate: string = '';

  graph: any = {
    data: [],
    layout: {
      title: '',
      xaxis: {
        type: 'date'
      },
      yaxis: {
        autorange: true,
        type: 'linear'
      }
    }
  };

  @ViewChild('plotElement') plotElement!: ElementRef;
  selectedTicker = '';

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000); // Update every minute
  }

  loadStockData(): void {
    this.stockService.getStockData(this.ticker, this.startDate, this.endDate).subscribe(data => {
      if (data && data.length > 0) {
        const dates = data.map((d: StockData) => d.Date);
        const volumes = data.map((d: StockData) => d.Volume);

        const candlestickTrace = {
          x: dates,
          close: data.map((d: StockData) => d.Close),
          decreasing: { line: { color: 'red' } },
          high: data.map((d: StockData) => d.High),
          increasing: { line: { color: 'green' } },
          low: data.map((d: StockData) => d.Low),
          open: data.map((d: StockData) => d.Open),
          type: 'candlestick',
          xaxis: 'x',
          yaxis: 'y'
        };

        const volumeTrace = {
          x: dates,
          y: volumes,
          type: 'bar',
          name: 'Volume',
          marker: {
            color: 'rgba(100, 100, 100, 0.5)'
          },
          yaxis: 'y2'
        };

        const layout = {
          title: `${this.ticker.toUpperCase()} Stock Price`,
          xaxis: {
            rangeslider: { visible: false },
            type: 'date'
          },
          yaxis: {
            title: 'Price',
            autorange: true
          },
          yaxis2: {
            title: 'Volume',
            overlaying: 'y',
            side: 'right'
          },
          shapes: [
            {
              type: 'line',
              x0: dates[0],
              y0: this.calculateTrendLine(data)[0],
              x1: dates[dates.length - 1],
              y1: this.calculateTrendLine(data)[1],
              line: {
                color: 'blue',
                width: 1
              }
            }
          ]
        };

        this.graph = {
          data: [candlestickTrace, volumeTrace],
          layout: layout
        };
      } else {
        console.error('No data received from API');
      }
    }, error => {
      console.error('Error loading stock data:', error);
    });
  }
  calculateTrendLine(data: StockData[]): [number, number] {
    const n = data.length;
    const sumX = data.reduce((acc, val, idx) => acc + idx, 0);
    const sumY = data.reduce((acc, val) => acc + val.Close, 0);
    const sumXY = data.reduce((acc, val, idx) => acc + idx * val.Close, 0);
    const sumX2 = data.reduce((acc, val, idx) => acc + idx * idx, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const startY = intercept;
    const endY = slope * (n - 1) + intercept;

    return [startY, endY];
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

  loadData(ticker: string, timeframe: string): void {
    const timeframeMap: { [key: string]: string } = {
      '1D': 'day',
      '1W': 'week',
      '1M': 'month',
      '1Y': 'year'
    };

    this.stockService.getDataForTimeframe(ticker, timeframeMap[timeframe]).subscribe({
      next: (data: any[]) => {
        console.log('Data received:', data); // Log the data
        this.graph.data = [{
          x: data.map(d => d.Date),
          y: data.map(d => d.Close),
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'green' }
        }];
        this.graph.layout.title = `Closing Price of ${ticker}`;
      },
      error: (error: any) => console.error('Error loading stock data:', error)
    });
  }

}
