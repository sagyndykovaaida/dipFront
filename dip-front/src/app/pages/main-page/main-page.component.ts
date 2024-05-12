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
// import {FormsModule} from "@angular/forms";
import { NzButtonModule } from 'ng-zorro-antd/button';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StockService } from "../../services/stock.service";
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {MatIcon} from "@angular/material/icon";
import { NzModalModule } from 'ng-zorro-antd/modal';
import Plotly from 'plotly.js/dist/plotly.js';
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
  stocks = [
    { name: 'Apple', ticker: 'AAPL', logo: 'https://logo.clearbit.com/apple.com' },
    { name: 'Microsoft', ticker: 'MSFT', logo: 'https://logo.clearbit.com/microsoft.com' },
    { name: 'Google', ticker: 'GOOGL', logo: 'https://logo.clearbit.com/google.com' },
    { name: 'Amazon', ticker: 'AMZN', logo: 'https://logo.clearbit.com/amazon.com' },
    { name: 'Facebook', ticker: 'FB', logo: 'https://logo.clearbit.com/facebook.com' },
    { name: 'Tesla', ticker: 'TSLA', logo: 'https://logo.clearbit.com/tesla.com' },
    { name: 'Berkshire Hathaway', ticker: 'BRK.A', logo: 'https://logo.clearbit.com/berkshirehathaway.com' },
    { name: 'Visa', ticker: 'V', logo: 'https://logo.clearbit.com/visa.com' },
    { name: 'Walmart', ticker: 'WMT', logo: 'https://logo.clearbit.com/walmart.com' },
    { name: 'Procter & Gamble', ticker: 'PG', logo: 'https://logo.clearbit.com/pg.com' },
    { name: 'Nvidia', ticker: 'NVDA', logo: 'https://logo.clearbit.com/nvidia.com' },
    { name: 'MasterCard', ticker: 'MA', logo: 'https://logo.clearbit.com/mastercard.com' },
    { name: 'Home Depot', ticker: 'HD', logo: 'https://logo.clearbit.com/homedepot.com' },
    { name: 'UnitedHealth', ticker: 'UNH', logo: 'https://logo.clearbit.com/unitedhealthgroup.com' },
    { name: 'Verizon', ticker: 'VZ', logo: 'https://logo.clearbit.com/verizon.com' },
    { name: 'Disney', ticker: 'DIS', logo: 'https://logo.clearbit.com/disney.com' },
    { name: 'Adobe', ticker: 'ADBE', logo: 'https://logo.clearbit.com/adobe.com' },
    { name: 'PayPal', ticker: 'PYPL', logo: 'https://logo.clearbit.com/paypal.com' },
    { name: 'Comcast', ticker: 'CMCSA', logo: 'https://logo.clearbit.com/comcast.com' },
    { name: 'Netflix', ticker: 'NFLX', logo: 'https://logo.clearbit.com/netflix.com' },
    { name: 'Cisco Systems', ticker: 'CSCO', logo: 'https://logo.clearbit.com/cisco.com' },
    { name: 'Intel', ticker: 'INTC', logo: 'https://logo.clearbit.com/intel.com' },
    { name: 'PepsiCo', ticker: 'PEP', logo: 'https://logo.clearbit.com/pepsico.com' },
    { name: 'Coca-Cola', ticker: 'KO', logo: 'https://logo.clearbit.com/coca-cola.com' },
    { name: 'Oracle', ticker: 'ORCL', logo: 'https://logo.clearbit.com/oracle.com' },
    { name: 'Nike', ticker: 'NKE', logo: 'https://logo.clearbit.com/nike.com' },
    { name: 'ExxonMobil', ticker: 'XOM', logo: 'https://logo.clearbit.com/exxonmobil.com' },
    { name: 'Pfizer', ticker: 'PFE', logo: 'https://logo.clearbit.com/pfizer.com' },
    { name: 'Chevron', ticker: 'CVX', logo: 'https://logo.clearbit.com/chevron.com' },
    { name: 'AT&T', ticker: 'T', logo: 'https://logo.clearbit.com/att.com' },
    { name: 'Abbott Laboratories', ticker: 'ABT', logo: 'https://logo.clearbit.com/abbott.com' },
    { name: 'McDonald’s', ticker: 'MCD', logo: 'https://logo.clearbit.com/mcdonalds.com' },
    { name: 'Merck', ticker: 'MRK', logo: 'https://logo.clearbit.com/merck.com' },
    { name: 'Qualcomm', ticker: 'QCOM', logo: 'https://logo.clearbit.com/qualcomm.com' },
    { name: 'Salesforce', ticker: 'CRM', logo: 'https://logo.clearbit.com/salesforce.com' },
    { name: 'Medtronic', ticker: 'MDT', logo: 'https://logo.clearbit.com/medtronic.com' }
];


    ticker: string = '';
  startDate: string = '';
  endDate: string = '';

  graph: any = {
    data: [
      { x: [], y: [], type: 'scatter', mode: 'lines+markers', marker: {color: 'blue'} },
    ],
    layout: {title: 'Stock Price'}
  };

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

  }


  // loadStockData() {
  //   const ticker = this.ticker;
  //   const startDate = this.startDate ? formatDate(this.startDate, 'yyyy-MM-dd', 'en-US') : null;
  //   const endDate = this.endDate ? formatDate(this.endDate, 'yyyy-MM-dd', 'en-US') : null;
  //
  //   this.stockService.getStockData(ticker, startDate, endDate).subscribe({
  //     next: (data: StockData[]) => {
  //       const preparedData = this.prepareDynamicData(data);
  //       this.graph.data = preparedData;
  //       this.graph.layout = {
  //         title: `Closing Price of ${ticker}`,
  //         xaxis: { type: 'date', title: 'Date' },
  //         yaxis: { title: 'Price' },
  //         paper_bgcolor: 'rgba(0,0,0,0)',
  //         plot_bgcolor: 'rgba(0,0,0,0)',
  //         // showlegend: false
  //       };
  //     },
  //     error: (error) => {
  //       console.error('Error loading stock data:', error);
  //     }
  //   });
  // }


  // prepareDynamicData(data: StockData[]) {
  //   const traces = [];
  //   let currentTrace = {
  //     x: [data[0].Date],
  //     y: [data[0].Close],
  //     type: 'scatter',
  //     mode: 'lines+markers',
  //     line: {
  //       color: 'green',  // Начальный цвет линии
  //       width: 2
  //     },
  //     fill: 'tozeroy',
  //     fillcolor: 'rgba(0, 255, 0, 0.3)'  // Начальный цвет заливки
  //   };
  //
  //   for (let i = 1; i < data.length; i++) {
  //     const increase = data[i].Close > data[i - 1].Close;
  //     const color = increase ? 'green' : 'red';
  //     const fillcolor = `rgba(${increase ? '0, 255, 0' : '255, 0, 0'}, 0.3)`; // Цвет заливки в зависимости от тенденции
  //
  //     if (currentTrace.line.color !== color) {
  //       traces.push(currentTrace);  // Заканчиваем текущий сегмент и добавляем его в массив
  //       currentTrace = {            // Начинаем новый сегмент
  //         x: [data[i].Date],
  //         y: [data[i].Close],
  //         type: 'scatter',
  //         mode: 'lines+markers',
  //         line: {
  //           color: color,
  //           width: 2
  //         },
  //         fill: 'tozeroy',
  //         fillcolor: fillcolor  // Устанавливаем цвет заливки для нового сегмента
  //       };
  //     } else {
  //       // Продолжаем добавлять данные в текущий сегмент
  //       currentTrace.x.push(data[i].Date);
  //       currentTrace.y.push(data[i].Close);
  //     }
  //   }
  //
  //   // Добавляем последний сегмент в массив, если он не был добавлен
  //   traces.push(currentTrace);
  //
  //   return traces;  // Возвращаем массив сегментов для отображения на графике
  // }

  prepareDynamicData(data: StockData[]) {
    const traces = [];
    let currentTrace = {
      x: [] as string[],  // Указание, что x - это массив строк
      y: [] as number[],  // Указание, что y - это массив чисел
      type: 'scatter',
      mode: 'lines+markers',
      marker: {
        color: 'green',
        width: 2
      },
      fill: 'tozeroy',
      fillcolor: 'rgba(54,246,58,0.3)'
    };


    // Просто добавляем все данные в текущий trace
    data.forEach(point => {
      currentTrace.x.push(point.Date);
      currentTrace.y.push(point.Close);
    });

    traces.push(currentTrace); // Добавляем полный trace в массив traces

    return traces;  // Возвращаем массив traces для отображения на графике
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
