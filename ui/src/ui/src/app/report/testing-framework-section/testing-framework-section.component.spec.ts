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

  it('renders the 4 transversal methodology steps (CREATE, TEST, MEASURE, LEARN)', () => {
    const badges = Array.from(fixture.nativeElement.querySelectorAll('.v2-methodology-badge'))
      .map((element: unknown) => (element as HTMLElement).textContent?.trim());

    expect(badges).toEqual(['01 — CREATE', '02 — TEST', '03 — MEASURE', '04 — LEARN']);
    expect(fixture.nativeElement.textContent).toContain('De la decisión al aprendizaje.');
    expect(fixture.nativeElement.textContent).not.toContain('T01');
  });

  it('renders the illustrative A/B experiment example and NEXT ITERATION flow', () => {
    expect(fixture.nativeElement.textContent).toContain('ASSET ORIGINAL');
    expect(fixture.nativeElement.textContent).toContain('VARIANTE ILUSTRATIVA');
    expect(fixture.nativeElement.textContent).toContain('HIPÓTESIS');
    expect(fixture.nativeElement.textContent).toContain('QUÉ MEDIMOS');
    expect(fixture.nativeElement.textContent).toContain('NEXT ITERATION');
    expect(fixture.nativeElement.textContent).toContain('Ejemplo metodológico ilustrativo');
  });
});
