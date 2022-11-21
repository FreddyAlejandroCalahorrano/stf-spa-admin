import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BootstrapModalModule} from '@modal/bootstrap-modal.module';
import {FilterSkillPipe} from '../../../../pipes/filter-skill.pipe';
import {SkillsService} from '@services/skills.service';
import {FormPersonSkillsModalComponent} from './form-person-skills-modal.component';

describe('FormSkillsPersonasModalComponent', () => {
  let component: FormPersonSkillsModalComponent;
  let fixture: ComponentFixture<FormPersonSkillsModalComponent>;

  let mockedSkillsService = {
    addPersonSkills: jest.fn()
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BootstrapModalModule,
      ],
      declarations: [FormPersonSkillsModalComponent, FilterSkillPipe],
      providers: [
        {provide: SkillsService, useValue: mockedSkillsService}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPersonSkillsModalComponent);
    component = fixture.componentInstance;
    component.skillsCatalog = []
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
