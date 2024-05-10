import { Component } from '@angular/core';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import { FormsModule } from '@angular/forms';
import { StockService } from "../../services/stock.service";
PlotlyModule.plotlyjs = PlotlyJS;
interface StockData {
  Date: string;
  Close: number;
}

@Component({
  selector: 'app-stock-dashboard',
  standalone: true,
  imports: [
    // PlotlyModule.forRoot({ plotly: PlotlyJS }),
    FormsModule,
    PlotlyModule,
  ],
  templateUrl: './stock-dashboard.component.html',
  styleUrls: ['./stock-dashboard.component.scss']
})
export class StockDashboardComponent {
  ticker: string = '';
  startDate: string = '';
  endDate: string = '';
  graph: any = {
    data: [
      { x: [], y: [], type: 'scatter', mode: 'lines+markers', marker: {color: 'blue'} },
    ],
    layout: {title: 'Stock Price'}
  };

  constructor(private stockService: StockService) {}

  loadStockData() {
    this.stockService.getStockData(this.ticker, this.startDate, this.endDate).subscribe((data: StockData[]) => {
      this.graph.data = [{
        x: data.map(d => d.Date),
        y: data.map(d => d.Close),
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'blue' }
      }];
      this.graph.layout.title = `Closing Price of ${this.ticker}`;
    });
  }
}
