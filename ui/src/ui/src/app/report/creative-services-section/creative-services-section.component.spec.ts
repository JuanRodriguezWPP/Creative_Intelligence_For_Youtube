import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CREATIVE_SERVICES_MOCK } from '../mocks/creative-services.mock';
import { CreativeServicesSectionComponent } from './creative-services-section.component';

describe('CreativeServicesSectionComponent', () => {
  let fixture: ComponentFixture<CreativeServicesSectionComponent>;
  let component: CreativeServicesSectionComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CreativeServicesSectionComponent] }).compileComponents();
    fixture = TestBed.createComponent(CreativeServicesSectionComponent);
    component = fixture.componentInstance;
    component.section = { state: 'mock', source: 'mock', data: CREATIVE_SERVICES_MOCK, issues: [] };
    fixture.detectChanges();
  });

  it('renders the five formats in the documented order', () => {
    const cards = fixture.nativeElement.querySelectorAll('.v2-service-card');
    const titles = Array.from(fixture.nativeElement.querySelectorAll('.v2-service-title'))
      .map((element: unknown) => (element as HTMLElement).textContent?.trim());

    expect(cards.length).toBe(5);
    expect(titles).toEqual(['InBanner Video', 'Hands-Free Carousel', 'Loopbook', 'QR Format', 'BrandLift']);
    expect(fixture.nativeElement.textContent).toContain('LOCAL MOCK DATA');
  });

  it('selects a format through its accessible CTA', () => {
    spyOn(component.formatSelected, 'emit');
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.v2-service-btn');
    button.click();

    expect(component.selectedFormatId).toBe('inbanner-video');
    expect(component.formatSelected.emit).toHaveBeenCalledWith(CREATIVE_SERVICES_MOCK.formats[0]);
  });

  it('shows an honest empty state', () => {
    component.section = { state: 'empty', source: 'none', data: null, issues: [] };
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Creative Services pendiente');
  });
});
