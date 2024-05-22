import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent, NzSiderComponent} from "ng-zorro-antd/layout";
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from "ng-zorro-antd/breadcrumb";
import {NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent} from "ng-zorro-antd/menu";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import { NzGridModule } from 'ng-zorro-antd/grid';
import {NzIconModule} from "ng-zorro-antd/icon";
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import {CurrencyPipe, DecimalPipe, formatDate, NgClass, NgForOf, NgStyle, PercentPipe} from "@angular/common";
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import {NzRadioComponent, NzRadioGroupComponent} from "ng-zorro-antd/radio";
import { NzButtonModule } from 'ng-zorro-antd/button';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StockService } from "../../services/stock.service";
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {MatIcon} from "@angular/material/icon";
import { NzModalModule } from 'ng-zorro-antd/modal';
PlotlyModule.plotlyjs = PlotlyJS;
interface StockData {
  Date: string;
  Close: number;
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
    NzModalModule
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  date = null;
  timeRange: string = '1D';
  ticker: string = '';
  startDate: string = '';
  endDate: string = '';

  graph: any = {
    data: [
      { x: [], y: [], type: 'scatter', mode: 'lines+markers', marker: {color: 'blue'} },
    ],
    layout: {title: 'Stock Price'}
  };


  ticker1: string = '';
  ticker2: string = '';
  graphs: any[] = [];
  dataLoaded: { [key: string]: any } = {};  // To track data loading completion and store results

  loadDataAnalyze(ticker1: string, ticker2: string): void {
    this.loadStockDataAnalyze(ticker1);
    this.loadStockDataAnalyze(ticker2);
  }

  loadStockDataAnalyze(ticker: string): void {
    this.stockService.getDataForTimeframe(ticker, '1M').subscribe({
      next: (data: any[]) => {
        const averagePrice = data.reduce((acc, curr) => acc + curr.Close, 0) / data.length;
        this.dataLoaded[ticker] = {
          averagePrice: averagePrice,
          data: data,
          loaded: true
        };
        this.updateGraphs();
      },
      error: (error: any) => console.error('Error loading stock data for', ticker, ':', error)
    });
  }

  updateGraphs(): void {
    if (this.dataLoaded[this.ticker1]?.loaded && this.dataLoaded[this.ticker2]?.loaded) {
      [this.ticker1, this.ticker2].forEach((ticker: string) => {
        const otherTicker = ticker === this.ticker1 ? this.ticker2 : this.ticker1;
        const graph = {
          data: [{
            x: this.dataLoaded[ticker].data.map((d: StockData) => d.Date),
            y: this.dataLoaded[ticker].data.map((d: StockData) => d.Close),
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: this.dataLoaded[ticker].averagePrice >= this.dataLoaded[otherTicker].averagePrice ? 'green' : 'red' }
          }],
          layout: {
            title: `Monthly Closing Price of ${ticker}`,
            xaxis: { title: 'Date' },
            yaxis: { title: 'Closing Price' }
          }
        };
        this.graphs.push(graph);
      });
    }
  }


  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  constructor(private stockService: StockService) {}

  loadStockData() {
    const ticker = this.ticker;
    const startDate = this.startDate ? formatDate(this.startDate, 'yyyy-MM-dd', 'en-US') : null;
    const endDate = this.endDate ? formatDate(this.endDate, 'yyyy-MM-dd', 'en-US') : null;

    this.stockService.getStockData(ticker, startDate, endDate).subscribe({
      next: (data: StockData[]) => {
        this.graph.data = [{
          x: data.map(d => d.Date),
          y: data.map(d => d.Close),
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'blue' }
        }];
        this.graph.layout.title = `Closing Price of ${ticker}`;
      },
      error: (error) => {
        console.error('Error loading stock data:', error);
      }
    });
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 1000);

  }

  @ViewChild('plotElement') plotElement!: ElementRef;
  selectedTicker = '';

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

  protected readonly formatDate = formatDate;
}
