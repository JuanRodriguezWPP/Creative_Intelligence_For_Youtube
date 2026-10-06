import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  CreativeServiceFormat,
  CreativeServicesSection,
  ReportSectionViewModel,
} from '../report.models';

export const CREATIVE_FORMAT_GIF_MAP: Record<string, string> = {
  branded_bar: 'assets/formats/Formats Gifs/BrandedBar.gif',
  video_card: 'assets/formats/Formats Gifs/VideoCard.gif',
  canvas: 'assets/formats/Formats Gifs/Canvas.gif',
  qr_code: 'assets/formats/Formats Gifs/QR_Code.gif',
};

@Component({
  selector: 'app-creative-services-section',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './creative-services-section.component.html',
  styleUrl: './creative-services-section.component.css',
})
export class CreativeServicesSectionComponent {
  @Input({ required: true }) section!: ReportSectionViewModel<CreativeServicesSection>;
  @Output() formatSelected = new EventEmitter<CreativeServiceFormat>();
  @ViewChild('formatTrack') private formatTrack?: ElementRef<HTMLElement>;

  selectedFormatId: string | null = null;
  failedPreviewIds = new Set<string>();

  getFormatPreviewUrl(format: CreativeServiceFormat): string {
    return format.preview?.url || CREATIVE_FORMAT_GIF_MAP[format.id] || `assets/formats/Formats Gifs/${format.id}.gif`;
  }

  scrollFormats(direction: -1 | 1): void {
    const track = this.formatTrack?.nativeElement;
    if (!track) return;
    const firstCard = track.querySelector<HTMLElement>('.v2-service-card');
    const distance = (firstCard?.offsetWidth ?? 280) + 20;
    track.scrollBy({ left: distance * direction, behavior: 'smooth' });
  }

  selectFormat(format: CreativeServiceFormat): void {
    if (!format.available) return;
    this.selectedFormatId = format.id;
    this.formatSelected.emit(format);
  }

  markPreviewAsFailed(formatId: string): void {
    this.failedPreviewIds.add(formatId);
  }

  onTrackKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.scrollFormats(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.scrollFormats(1);
    }
  }
}
