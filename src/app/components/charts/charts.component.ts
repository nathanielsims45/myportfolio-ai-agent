import { Component, AfterViewInit } from '@angular/core';
import { SectionHeaderComponent } from '../shared/section-header.component';

@Component({
  selector: 'app-charts',
  imports: [SectionHeaderComponent],
  template: `
    <section id="charts" class="section-pad relative">
      <div class="container-x">
        <app-section-header eyebrow="Charts" title="Enterprise analytics"
          subtitle="Premium animated visualizations built with ApexCharts." />

        <div class="grid lg:grid-cols-2 gap-6">
          @for (chart of charts; track chart.title; let i = $index) {
            <div class="reveal glass glass-hover rounded-2xl p-5" [class.lg:col-span-2]="chart.full">
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-semibold text-text">{{ chart.title }}</h3>
                <span class="eyebrow">{{ chart.tag }}</span>
              </div>
              <div [id]="'chart-' + i" class="w-full"></div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ChartsComponent implements AfterViewInit {
  readonly charts: { title: string; tag: string; full?: boolean; options: any }[] = [];

  constructor() {
    this.charts = [
      {
        title: 'Angular Experience Timeline', tag: 'area',
        options: {
          chart: { type: 'area', height: 280, background: 'transparent', animations: { enabled: true, speed: 800 } },
          theme: { mode: 'dark' },
          colors: ['#7c5cff', '#38bdf8'],
          series: [
            { name: 'Projects shipped', data: [8, 18, 35, 60, 95, 130, 150] },
          ],
          xaxis: { categories: ['2005', '2008', '2012', '2015', '2018', '2021', '2024'] },
          stroke: { curve: 'smooth', width: 3 },
          dataLabels: { enabled: false },
          grid: { borderColor: 'rgba(124,92,255,0.12)' },
          fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.05 } },
        },
      },
      {
        title: 'Technology Usage', tag: 'bar',
        options: {
          chart: { type: 'bar', height: 280, background: 'transparent' },
          theme: { mode: 'dark' },
          colors: ['#7c5cff'],
          series: [{ name: 'Years', data: [20, 18, 16, 14, 12, 10, 8, 6, 5] }],
          xaxis: { categories: ['Angular', '.NET', 'Azure', 'C#', 'RxJS', 'TypeScript', 'Node', 'Python', 'Power BI'] },
          plotOptions: { bar: { borderRadius: 6, columnWidth: '55%' } },
          grid: { borderColor: 'rgba(124,92,255,0.12)' },
        },
      },
      {
        title: 'Azure Cloud Distribution', tag: 'donut',
        options: {
          chart: { type: 'donut', height: 280, background: 'transparent' },
          theme: { mode: 'dark' },
          colors: ['#7c5cff', '#38bdf8', '#34d399', '#fbbf24', '#f87171'],
          series: [35, 25, 15, 15, 10],
          labels: ['App Services', 'Functions', 'OpenAI', 'SQL', 'Storage'],
          legend: { position: 'bottom' },
          stroke: { width: 0 },
        },
      },
      {
        title: 'Monthly API Requests', tag: 'area',
        options: {
          chart: { type: 'area', height: 280, background: 'transparent' },
          theme: { mode: 'dark' },
          colors: ['#38bdf8', '#7c5cff'],
          series: [
            { name: 'Reads', data: [120, 190, 230, 280, 310, 360, 420] },
            { name: 'Writes', data: [60, 80, 110, 140, 160, 200, 240] },
          ],
          xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] },
          stroke: { curve: 'smooth', width: 2 },
          dataLabels: { enabled: false },
          grid: { borderColor: 'rgba(124,92,255,0.12)' },
          fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.05 } },
        },
      },
      {
        title: 'Performance Benchmarks', tag: 'radial',
        full: true,
        options: {
          chart: { type: 'radialBar', height: 300, background: 'transparent' },
          theme: { mode: 'dark' },
          colors: ['#7c5cff', '#38bdf8', '#34d399', '#fbbf24'],
          series: [98, 95, 92, 88],
          labels: ['Lighthouse', 'A11y', 'Best Practices', 'SEO'],
          plotOptions: { radialBar: { hollow: { size: '40%' }, track: { background: 'rgba(255,255,255,0.05)' } } },
          legend: { position: 'bottom' },
        },
      },
      {
        title: 'Enterprise Adoption', tag: 'heatmap',
        options: {
          chart: { type: 'heatmap', height: 280, background: 'transparent' },
          theme: { mode: 'dark' },
          colors: ['#7c5cff'],
          dataLabels: { enabled: false },
          series: [
            { name: 'Healthcare', data: this.heat(7) },
            { name: 'FinTech', data: this.heat(7) },
            { name: 'Government', data: this.heat(7) },
            { name: 'SaaS', data: this.heat(7) },
          ],
          xaxis: { categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'] },
          plotOptions: { heatmap: { radius: 4, colorScale: { ranges: [{ from: 0, to: 50, color: '#161a32' }, { from: 51, to: 100, color: '#7c5cff' }] } } },
        },
      },
      {
        title: 'Healthcare Analytics', tag: 'bar',
        options: {
          chart: { type: 'bar', height: 280, background: 'transparent', stacked: true },
          theme: { mode: 'dark' },
          colors: ['#7c5cff', '#38bdf8'],
          series: [
            { name: 'Admitted', data: [30, 40, 35, 50, 49, 60, 70] },
            { name: 'Discharged', data: [23, 32, 27, 38, 41, 48, 55] },
          ],
          xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
          plotOptions: { bar: { borderRadius: 4 } },
          grid: { borderColor: 'rgba(124,92,255,0.12)' },
        },
      },
      {
        title: 'Financial Dashboard', tag: 'line',
        options: {
          chart: { type: 'line', height: 280, background: 'transparent' },
          theme: { mode: 'dark' },
          colors: ['#34d399', '#f87171'],
          series: [
            { name: 'Revenue', data: [2.1, 2.4, 2.8, 3.2, 3.9, 4.6, 5.4] },
            { name: 'Costs', data: [1.4, 1.5, 1.7, 1.9, 2.1, 2.3, 2.5] },
          ],
          xaxis: { categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'] },
          stroke: { curve: 'smooth', width: 3 },
          markers: { size: 4 },
          grid: { borderColor: 'rgba(124,92,255,0.12)' },
        },
      },
    ];
  }

  private heat(n: number) {
    return Array.from({ length: n }, () => Math.round(Math.random() * 100));
  }

  ngAfterViewInit(): void {
    import('apexcharts').then(({ default: ApexCharts }) => {
      this.charts.forEach((c, i) => {
        const el = document.getElementById('chart-' + i);
        if (el) new ApexCharts(el, c.options).render();
      });
    });
  }
}
