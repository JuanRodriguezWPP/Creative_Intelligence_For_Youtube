import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TESTING_FRAMEWORK_MOCK } from '../mocks/testing-framework.mock';
import { TestingFrameworkSectionComponent } from './testing-framework-section.component';

describe('TestingFrameworkSectionComponent', () => {
  let fixture: ComponentFixture<TestingFrameworkSectionComponent>;
  let component: TestingFrameworkSectionComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestingFrameworkSectionComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestingFrameworkSectionComponent);
    component = fixture.componentInstance;
    component.section = { state: 'mock', source: 'mock', data: TESTING_FRAMEWORK_MOCK, issues: [] };
    fixture.detectChanges();
  });

  it('renders the documented four-step flow', () => {
    const titles = Array.from(fixture.nativeElement.querySelectorAll('.v2-testing-title'))
      .map((element: unknown) => (element as HTMLElement).textContent?.trim());

    expect(titles).toEqual(['Recomendación', 'Original vs. Variante', 'Hipótesis', 'Métrica de éxito']);
    expect(fixture.nativeElement.textContent).toContain('ADAPT');
    expect(fixture.nativeElement.textContent).toContain('Pendiente de medición');
  });

  it('labels success metrics as targets rather than measured results', () => {
    expect(fixture.nativeElement.textContent).toContain('KPIs objetivo');
    expect(fixture.nativeElement.textContent).toContain('Brand Lift');
  });

  it('shows an incomplete state without fabricating cards', () => {
    component.section = {
      state: 'incomplete',
      source: 'none',
      data: null,
      issues: ['successMetrics es obligatorio.'],
    };
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.v2-testing-card').length).toBe(0);
    expect(fixture.nativeElement.textContent).toContain('Framework incompleto');
  });
});
