import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReportSectionViewModel, TestingFrameworkSection } from '../report.models';

@Component({
  selector: 'app-testing-framework-section',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './testing-framework-section.component.html',
  styleUrl: './testing-framework-section.component.css',
})
export class TestingFrameworkSectionComponent {
  @Input({ required: true }) section!: ReportSectionViewModel<TestingFrameworkSection>;

  failedPreviews = new Set<string>();

  markPreviewAsFailed(key: string): void {
    this.failedPreviews.add(key);
  }
}
