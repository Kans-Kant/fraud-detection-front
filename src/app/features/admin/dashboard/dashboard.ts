import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DashboardService } from '../../../core/services/dashboard.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatCardModule, MatIconModule, NgChartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  totalTransactions: number = 0;
  clientCount: number = 0;
  fraudCount: number = 0;
  cardCount: number = 0;
  bankCount: number = 0;

  stats: any;

  // LINE CHART
  lineChartData: any[] = [];
  lineChartLabels: string[] = [];

  // DOUGHNUT CHART
  doughnutChartData: any[] = [];
  doughnutChartLabels: string[] = [];

  // PIE CHART
  pieChartData: any[] = [];
  pieChartLabels: string[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.fetchCountsData();
    this.loadFraudStats();
  }

  fetchCountsData() {
    this.dashboardService.getCounts().subscribe({
      next: (data: any) => {
        this.totalTransactions = data.transactions;
        this.fraudCount = data.frauds;
        this.clientCount = data.clients;
        this.cardCount = data.cards;
        this.bankCount = data.banks;
      },
      error: (err: any) => { console.log(err); }
    });
  }

  loadFraudStats() {
    this.dashboardService.getFraudStats().subscribe({
      next: (data: any) => {
        this.stats = data;

        this.prepareLineChart();
        this.prepareDoughnutChart();
        this.preparePieChart();
      },
      error: (err: any) => console.error(err)
    });
  }

  prepareLineChart() {
    this.lineChartLabels = this.stats.dailyFrauds.map((d: any) => d.date);
    this.lineChartData = [
      {
        data: this.stats.dailyFrauds.map((d: any) => d.frauds),
        label: 'Fraudes par jour',
        borderColor: '#ff3b30',
        backgroundColor: 'rgba(255,59,48,0.2)',
        fill: true,
      }
    ];
  }

  prepareDoughnutChart() {
    const fraud = this.stats.fraudulentTransactions;
    const nonFraud = this.stats.totalTransactions - fraud;

    this.doughnutChartLabels = ['Fraude', 'Non Fraude'];
    this.doughnutChartData = [{ data: [fraud, nonFraud], label: 'Transactions' }];
  }

  preparePieChart() {
    this.pieChartLabels = this.stats.typeCounts.map((t: any) => t.type);
    this.pieChartData = [
  { data: this.stats.typeCounts.map((t: any) => t.count), label: 'Types de transactions' }
];
  }

}
