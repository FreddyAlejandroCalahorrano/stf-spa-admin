import {FilterSkillPipe} from '../../../pipes/filter-skill.pipe';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PersonSkillsComponent} from './person-skills.component';
import {SkillsService} from '@services/skills.service';
import {BootstrapModalModule} from '@modal/bootstrap-modal.module';
import {MessageBarService} from "@services/message-bar.service";
import {DialogService} from "@modal/dialog.service";

describe('SkillsPersonasComponent', () => {
  let component: PersonSkillsComponent;
  let fixture: ComponentFixture<PersonSkillsComponent>;
  let mockedMessageService = {
    showMessage: jest.fn()
  }
  let mockedDialogService = {
    addDialog: jest.fn()
  }
  let mockedSkillService = {
    deletePersonSkill: jest.fn(),
    getSkillsByProfileId: jest.fn(),
    getSkillsByPersonId: jest.fn(),
    getTypeSkills: jest.fn()
      .mockImplementation(() => Promise.resolve(["DevBack", "DevFront", "QA"]))
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // HttpModule.forRoot({api_url:''}),
        BootstrapModalModule,
      ],
      declarations: [PersonSkillsComponent, FilterSkillPipe],
      providers: [
        {provide: SkillsService, useValue: mockedSkillService},
        {provide: MessageBarService, useValue: mockedMessageService},
        {provide: DialogService, useValue: mockedDialogService}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
