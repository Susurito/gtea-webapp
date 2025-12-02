import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../partials/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf, DecimalPipe } from '@angular/common'; // Asegurar DecimalPipe y NgFor/NgIf
import { ReportsService, Kpi, OrganizerStats, ReporteData } from '../../services/reports.service';

@Component({
  selector: 'app-reports-screen',
  // Asegúrate de incluir DecimalPipe aquí para que funcione el 'number' pipe en el HTML
  imports: [SidebarComponent, FormsModule, CommonModule, DecimalPipe],
  standalone: true, // Asumiendo standalone
  templateUrl: './reports-screen.component.html',
  styleUrl: './reports-screen.component.scss'
})
export class ReportsScreenComponent implements OnInit {

  // --- Datos Dinámicos (Inicializados en vacío, llenados por la API) ---
  public kpis: Kpi[] = [];
  public topOrganizers: OrganizerStats[] = [];
  public categoryDistribution: { name: string; value: number; color: string; }[] = [];

  // --- Filtros (Opciones y Valores Seleccionados) ---
  public categories: string[] = ['Todas']; // Se llena con la API
  public organizers: string[] = ['Todos']; // Se llena con la API

  // Valores seleccionados en los inputs
  public fechaInicio: string = '';
  public fechaFin: string = '';
  public selectedCategory: string = 'Todas';
  public selectedOrganizer: string = 'Todos';


  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
    // 1. Cargar las opciones de filtros
    this.cargarOpcionesFiltros();

    // 2. Generar el reporte inicial (con filtros vacíos o por defecto)
    this.generarReporte();
  }

  // --- LÓGICA DE CARGA DE FILTROS ---

  private cargarOpcionesFiltros(): void {
    // Cargar Categorías
    this.reportsService.obtenerFiltroCategorias().subscribe({
        next: (cats) => this.categories = ['Todas', ...cats],
        error: (err) => console.error('Error al cargar categorías de filtro', err)
    });

    // Cargar Organizadores
    this.reportsService.obtenerFiltroOrganizadores().subscribe({
        next: (orgs) => this.organizers = ['Todos', ...orgs],
        error: (err) => console.error('Error al cargar organizadores de filtro', err)
    });
  }

  // --- LÓGICA DE GENERACIÓN DE REPORTE ---

  public generarReporte(): void {
    const filtros = {
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      categoria: this.selectedCategory === 'Todas' ? '' : this.selectedCategory,
      organizador: this.selectedOrganizer === 'Todos' ? '' : this.selectedOrganizer,
    };

    console.log('Generando reporte con filtros:', filtros);

    this.reportsService.generarReporte(filtros).subscribe({
      next: (data: ReporteData) => {
        // Mapear la respuesta del API a las propiedades del componente
        this.kpis = data.kpis;
        this.topOrganizers = data.topOrganizers.sort((a, b) => b.events - a.events); // Asegurar orden
        this.categoryDistribution = data.categoryDistribution;

        // Si los datos de categoría cambian, el estilo cónico se actualizará automáticamente
      },
      error: (err) => {
        console.error('Error al obtener datos del reporte', err);
        // Opcional: limpiar los datos y mostrar un mensaje de error en el dashboard
        this.kpis = [];
        this.topOrganizers = [];
      }
    });
  }

  // --- LÓGICA DE EXPORTACIÓN ---

  public exportarCSV(): void {
    const filtros = {
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      categoria: this.selectedCategory === 'Todas' ? '' : this.selectedCategory,
      organizador: this.selectedOrganizer === 'Todos' ? '' : this.selectedOrganizer,
    };

    this.reportsService.exportarCSV(filtros).subscribe({
      next: (blob: Blob) => {
        // Lógica estándar para descargar un blob como archivo
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte_eventos_${new Date().toISOString()}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        console.log('CSV exportado con éxito.');
      },
      error: (err) => {
        console.error('Error al exportar CSV', err);
        alert('No se pudo exportar el reporte. Inténtalo de nuevo.');
      }
    });
  }


  // --- LÓGICA DE UI (Gráfico Circular) ---

  public get conicGradientStyle(): string {
    const totalValue = this.categoryDistribution.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;

    if (totalValue === 0) return 'conic-gradient(#ccc 0% 100%)';

    const gradientParts = this.categoryDistribution.map(item => {
      const percentage = item.value / totalValue;
      const startAngle = currentAngle;
      const endAngle = currentAngle + (percentage * 360);
      currentAngle = endAngle;

      // Genera la parte del gradiente: color inicio-ángulo fin-ángulo
      return `${item.color} ${startAngle}deg ${endAngle}deg`;
    });

    // Asegura que el último ángulo cierre el círculo (360deg)
    return `conic-gradient(${gradientParts.join(', ')}, ${this.categoryDistribution[this.categoryDistribution.length - 1]?.color || '#000'} 360deg)`;
  }
}
