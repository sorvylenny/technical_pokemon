import { PokemonDashboard } from '@/app/core/interfaces/checkout/dashboard';
import { DashboardService } from '@/app/core/services/dashboard/checkout.service';
import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements AfterViewInit, OnDestroy {
  pokemonResponse = {} as PokemonDashboard;
  page: number = 1;
  limit: number = 5;

  constructor(private dashboardService: DashboardService) { }


  ngAfterViewInit() {
    this.pokemonSalesMore();
  }
  ngOnDestroy() {
  }

  async pokemonSalesMore() {
    this.pokemonResponse = await this.dashboardService.morePokemonSales({ page: this.page, limit: this.limit });
    const pokems = this.pokemonResponse.pokemonSales.pokemons.map(pokemon => pokemon.name)
    const salesCount = this.pokemonResponse.pokemonSales.salesCounts.map(pokemon => pokemon.salesCount)
    this.mostrarGrafico(pokems, salesCount);

  }

  mostrarGrafico(labelGrafico: any[], dataGrafico: any[]) {
    const chartBarras = new Chart('chartBarras', {
      type: 'bar',
      data: {
        labels: labelGrafico,
        datasets: [{
          label: 'Pokémons mas vendidos',
          data: dataGrafico,
          backgroundColor: "rgba(255, 206, 86, 1)",
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    })
  }
}

