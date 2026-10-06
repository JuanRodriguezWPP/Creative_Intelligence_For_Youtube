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

  it('renders the four catalog formats in the documented order', () => {
    const cards = fixture.nativeElement.querySelectorAll('.v2-service-card');
    const titles = Array.from(fixture.nativeElement.querySelectorAll('.v2-service-title'))
      .map((element: unknown) => (element as HTMLElement).textContent?.trim());

    expect(cards.length).toBe(4);
    expect(titles).toEqual(['Branded Bar', 'Video Card', 'Canvas', 'QR Code']);
    expect(fixture.nativeElement.textContent).toContain('LOCAL MOCK DATA');
  });

  it('selects a format when invoked', () => {
    spyOn(component.formatSelected, 'emit');
    component.selectFormat(CREATIVE_SERVICES_MOCK.formats[0]);

    expect(component.selectedFormatId).toBe('branded_bar');
    expect(component.formatSelected.emit).toHaveBeenCalledWith(CREATIVE_SERVICES_MOCK.formats[0]);
  });

  it('shows an honest empty state', () => {
    component.section = { state: 'empty', source: 'none', data: null, issues: [] };
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Creative Services pendiente');
  });
});
