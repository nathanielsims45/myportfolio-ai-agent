import { Component, AfterViewInit } from '@angular/core';
import { SectionHeaderComponent } from '../shared/section-header.component';
import { TiltDirective } from '../shared/tilt.directive';

const GRID = { borderColor: 'rgba(124,92,255,0.12)', strokeDashArray: 4, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } };
const TOOLTIP = { theme: 'dark', style: { fontFamily: 'JetBrains Mono, monospace' } };
const XAXIS_LABELS = { style: { colors: '#9aa0c3', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px' } };
const YAXIS_LABELS = { style: { colors: '#9aa0c3', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px' } };

@Component({
  selector: 'app-charts',
  imports: [SectionHeaderComponent, TiltDirective],
  template: `
    <section id="charts" class="section-pad relative">
      <div class="container-x">
        <app-section-header eyebrow="Charts" title="Enterprise analytics"
          subtitle="Premium animated visualizations built with ApexCharts." />

        <div class="grid lg:grid-cols-2 gap-6">
          @for (chart of charts; track chart.title; let i = $index) {
            <div appTilt class="reveal glass glass-hover rounded-2xl p-5" [class.lg:col-span-2]="chart.full">
              <div class="flex items-center justify-between mb-3">
                <div>
                  <h3 class="font-semibold text-text">{{ chart.title }}</h3>
                  @if (chart.subtitle) {
                    <p class="text-xs text-text-muted mt-0.5">{{ chart.subtitle }}</p>
                  }
                </div>
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
  readonly charts: { title: string; subtitle?: string; tag: string; full?: boolean; options: any }[] = [];

  constructor() {
    this.charts = [
      {
        title: 'Angular Experience Timeline', subtitle: 'Projects shipped per year · 2005–2024', tag: 'area',
        options: {
          chart: { type: 'area', height: 300, background: 'transparent', animations: { enabled: true, easing: 'easeinout', speed: 900, dynamicAnimation: { enabled: true, speed: 400 } } },
          theme: { mode: 'dark' },
          colors: ['#7c5cff', '#38bdf8'],
          series: [
            { name: 'Projects shipped', data: [3, 8, 14, 22, 35, 48, 62, 80, 95, 120, 135, 150] },
            { name: 'Cumulative impact', data: [2, 6, 12, 20, 32, 45, 58, 75, 90, 115, 130, 148] },
          ],
          xaxis: { categories: ['2005','2007','2009','2011','2013','2015','2017','2019','2020','2021','2022','2024'], labels: XAXIS_LABELS },
          yaxis: { labels: YAXIS_LABELS },
          stroke: { curve: 'smooth', width: [3, 2], dashArray: [0, 4] },
          dataLabels: { enabled: false },
          grid: GRID,
          fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: [0.55, 0.25], opacityTo: [0.05, 0.02], gradientToColors: ['#38bdf8', '#7c5cff'] } },
          markers: { size: 0, hover: { size: 5 } },
          tooltip: { ...TOOLTIP, shared: true, intersect: false },
          legend: { labels: { colors: '#9aa0c3' }, markers: { width: 12, height: 12 } },
        },
      },
      {
        title: 'Technology Usage', subtitle: 'Years of production experience', tag: 'bar',
        options: {
          chart: { type: 'bar', height: 300, background: 'transparent', animations: { enabled: true, easing: 'easeinout', speed: 800 } },
          theme: { mode: 'dark' },
          colors: ['#7c5cff'],
          series: [{ name: 'Years', data: [20, 18, 16, 14, 12, 10, 8, 6, 5] }],
          xaxis: { categories: ['Angular', '.NET', 'Azure', 'C#', 'RxJS', 'TypeScript', 'Node', 'Python', 'Power BI'], labels: XAXIS_LABELS },
          yaxis: { labels: YAXIS_LABELS },
          plotOptions: { bar: { borderRadius: 8, columnWidth: '58%', distributed: true } },
          grid: GRID,
          fill: { type: 'gradient', gradient: { shade: 'dark', type: 'vertical', shadeIntensity: 0.4, gradientToColors: ['#38bdf8'], opacityFrom: 1, opacityTo: 0.85, stops: [0, 100] } },
          dataLabels: { enabled: true, style: { colors: ['#fff'], fontSize: '10px', fontFamily: 'JetBrains Mono, monospace' }, offsetY: -18 },
          tooltip: TOOLTIP,
        },
      },
      {
        title: 'Azure Cloud Distribution', subtitle: 'Service spend allocation', tag: 'donut',
        options: {
          chart: { type: 'donut', height: 300, background: 'transparent', animations: { enabled: true, speed: 900, animateGradually: { enabled: true, delay: 80 } } },
          theme: { mode: 'dark' },
          colors: ['#7c5cff', '#38bdf8', '#34d399', '#fbbf24', '#f87171'],
          series: [35, 25, 15, 15, 10],
          labels: ['App Services', 'Functions', 'OpenAI', 'SQL', 'Storage'],
          legend: { position: 'bottom', labels: { colors: '#9aa0c3' } },
          stroke: { width: 2, colors: ['rgba(5,6,15,0.6)'] },
          plotOptions: { pie: { donut: { size: '68%', labels: { show: true, total: { show: true, label: 'Total', color: '#9aa0c3' }, value: { color: '#fff', fontSize: '22px', fontFamily: 'JetBrains Mono, monospace' } } } } },
          dataLabels: { enabled: true, style: { colors: ['#fff'], fontSize: '10px' } },
          tooltip: TOOLTIP,
        },
      },
      {
        title: 'Monthly API Requests', subtitle: 'Reads vs writes · millions', tag: 'area',
        options: {
          chart: { type: 'area', height: 300, background: 'transparent', animations: { enabled: true, easing: 'easeinout', speed: 800 } },
          theme: { mode: 'dark' },
          colors: ['#38bdf8', '#7c5cff'],
          series: [
            { name: 'Reads', data: [12.1, 19.4, 23.2, 28.7, 31.3, 36.8, 42.4, 45.1, 49.8, 53.2, 58.9, 62.4] },
            { name: 'Writes', data: [6.2, 8.1, 11.4, 14.2, 16.5, 20.3, 24.6, 27.1, 30.4, 33.2, 36.8, 39.9] },
          ],
          xaxis: { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], labels: XAXIS_LABELS },
          yaxis: { labels: YAXIS_LABELS },
          stroke: { curve: 'smooth', width: 3 },
          dataLabels: { enabled: false },
          grid: GRID,
          fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.05 } },
          markers: { size: 0, hover: { size: 6 } },
          tooltip: { ...TOOLTIP, shared: true, intersect: false },
          legend: { labels: { colors: '#9aa0c3' } },
        },
      },
      {
        title: 'Performance Benchmarks', subtitle: 'Lighthouse + Core Web Vitals · production builds', tag: 'radial', full: true,
        options: {
          chart: { type: 'radialBar', height: 340, background: 'transparent', animations: { enabled: true, speed: 900, animateGradually: { enabled: true, delay: 100 } } },
          theme: { mode: 'dark' },
          colors: ['#7c5cff', '#38bdf8', '#34d399', '#fbbf24'],
          series: [98, 95, 92, 88],
          labels: ['Lighthouse', 'A11y', 'Best Practices', 'SEO'],
          plotOptions: { radialBar: { hollow: { size: '38%' }, track: { background: 'rgba(255,255,255,0.06)', strokeWidth: '100%' }, dataLabels: { value: { color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: '14px' }, name: { color: '#9aa0c3', fontFamily: 'JetBrains Mono, monospace' } } } },
          legend: { position: 'bottom', labels: { colors: '#9aa0c3' } },
          stroke: { lineCap: 'round' },
        },
      },
      {
        title: 'Enterprise Adoption', subtitle: 'Feature adoption by industry · quarterly', tag: 'heatmap',
        options: {
          chart: { type: 'heatmap', height: 300, background: 'transparent', animations: { enabled: true, speed: 600 } },
          theme: { mode: 'dark' },
          colors: ['#7c5cff'],
          dataLabels: { enabled: false },
          series: [
            { name: 'Healthcare', data: [42, 58, 71, 88, 95, 91, 98] },
            { name: 'FinTech', data: [35, 49, 63, 78, 84, 90, 96] },
            { name: 'Government', data: [22, 31, 44, 52, 61, 70, 79] },
            { name: 'SaaS', data: [51, 67, 78, 85, 92, 97, 99] },
          ],
          xaxis: { categories: ['Q1','Q2','Q3','Q4','Q5','Q6','Q7'], labels: XAXIS_LABELS },
          yaxis: { labels: YAXIS_LABELS },
          plotOptions: { heatmap: { radius: 6, enableShades: false, colorScale: { ranges: [{ from: 0, to: 33, color: '#161a32', name: 'low' }, { from: 34, to: 66, color: '#4f3dc4', name: 'mid' }, { from: 67, to: 100, color: '#7c5cff', name: 'high' }] } } },
          grid: { padding: { right: 20 } },
          tooltip: TOOLTIP,
        },
      },
      {
        title: 'Healthcare Analytics', subtitle: 'Patient flow · weekly admissions', tag: 'bar',
        options: {
          chart: { type: 'bar', height: 300, background: 'transparent', stacked: true, animations: { enabled: true, easing: 'easeinout', speed: 800 } },
          theme: { mode: 'dark' },
          colors: ['#7c5cff', '#38bdf8', '#34d399'],
          series: [
            { name: 'Admitted', data: [30, 40, 35, 50, 49, 60, 70] },
            { name: 'Discharged', data: [23, 32, 27, 38, 41, 48, 55] },
            { name: 'Transfers', data: [8, 12, 10, 14, 11, 9, 13] },
          ],
          xaxis: { categories: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], labels: XAXIS_LABELS },
          yaxis: { labels: YAXIS_LABELS },
          plotOptions: { bar: { borderRadius: 6, columnWidth: '45%' } },
          grid: GRID,
          fill: { type: 'gradient', gradient: { shade: 'dark', type: 'vertical', shadeIntensity: 0.3, opacityFrom: 0.95, opacityTo: 0.75, stops: [0, 100] } },
          legend: { labels: { colors: '#9aa0c3' } },
          tooltip: TOOLTIP,
        },
      },
      {
        title: 'Financial Dashboard', subtitle: 'Revenue vs costs · millions USD', tag: 'line',
        options: {
          chart: { type: 'line', height: 300, background: 'transparent', animations: { enabled: true, easing: 'easeinout', speed: 900 } },
          theme: { mode: 'dark' },
          colors: ['#34d399', '#f87171'],
          series: [
            { name: 'Revenue', data: [2.1, 2.4, 2.8, 3.2, 3.9, 4.6, 5.4, 6.1, 6.8, 7.4, 8.1, 8.9] },
            { name: 'Costs', data: [1.4, 1.5, 1.7, 1.9, 2.1, 2.3, 2.5, 2.7, 2.9, 3.0, 3.2, 3.4] },
          ],
          xaxis: { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], labels: XAXIS_LABELS },
          yaxis: { labels: YAXIS_LABELS },
          stroke: { curve: 'smooth', width: 3 },
          markers: { size: 4, hover: { size: 7 } },
          grid: GRID,
          dataLabels: { enabled: false },
          fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.2, opacityTo: 0, stops: [0, 100] } },
          legend: { labels: { colors: '#9aa0c3' } },
          tooltip: { ...TOOLTIP, shared: true, intersect: false },
        },
      },
    ];
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
