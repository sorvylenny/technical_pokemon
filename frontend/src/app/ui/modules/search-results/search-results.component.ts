import { SharedComponentsImports } from '@/app/core/shared/shared.imports';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [...SharedComponentsImports, FormsModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {
  @Input() resultsCount: number = 0
  searchTerm: string = '';
  @Output() searchTermChange = new EventEmitter<string>();
  @Output() clearResults = new EventEmitter();

  onSearch(): void {
    this.searchTermChange.emit(this.searchTerm);
  }
  clearFilter(): void {
    this.searchTerm = '';
    this.clearResults.emit();
  }
}
