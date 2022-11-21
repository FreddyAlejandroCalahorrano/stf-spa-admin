import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonEditComponent} from './person-edit.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {CountryService} from "@services/country.service";
import {RolesService} from "@services/roles.service";
import {ProvidersService} from "@services/providers.service";
import {SeniorityService} from "@services/seniority.service";
import {PersonService} from "@services/person.service";
import {ProfilesService} from "@services/profiles.service";
import {ChapterService} from "@services/chapter.service";
import {MessageBarService} from "@services/message-bar.service";
import {DialogService} from "@modal/dialog.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@pichincha/angular-sdk/http";
import {RouterTestingModule} from "@angular/router/testing";
import {InputValueAcessorDirective} from "../../../common/directives/input-value-accessor.directive";
import {SkillsService} from "@services/skills.service";
import {Router} from "@angular/router";
import {of} from "rxjs";

describe('PersonEditComponent', () => {
  let component: PersonEditComponent;
  let fixture: ComponentFixture<PersonEditComponent>;
  let router: Router;

  //#region MockService
  let mockedMessageService = {
    showMessage: jest.fn()
  }

  let mockedDialogService = {
    addDialog: jest.fn()
  }

  let mockedProfileService = {
    getProfiles: jest.fn()
  }

  let mockedChapterService = {
    getChapters: jest.fn()
  }

  let mockedPersonService = {
    addPerson: jest.fn(),
    updatePerson: jest.fn(),
    validateEmailPerson: jest.fn().mockImplementation(() => Promise.resolve(null))
  }
  //#endregion

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonEditComponent, InputValueAcessorDirective],
      imports: [
        HttpModule.forRoot({api_url: ''}),
        RouterTestingModule.withRoutes([]),
        FormsModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        CountryService,
        RolesService,
        ProvidersService,
        SeniorityService,
        SkillsService,
        {provide: PersonService, useValue: mockedPersonService},
        {provide: ProfilesService, useValue: mockedProfileService},
        {provide: ChapterService, useValue: mockedChapterService},
        {provide: MessageBarService, useValue: mockedMessageService},
        {provide: DialogService, useValue: mockedDialogService},
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
    router.initialNavigation()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should called navigate router when called method [redirectTo]', () => {
    const spyRoute = jest.spyOn(router, 'navigate')
      .mockImplementation(() => Promise.resolve(true))
    component.redirectTo(false)
    expect(spyRoute).toBeCalled()
  })

  it('should called showMessage when called method [redirectTo]', () => {
    jest.spyOn(router, 'navigate')
      .mockImplementation(() => Promise.resolve(true))

    const spyShowMessage = jest.spyOn(mockedMessageService, 'showMessage')
    component.redirectTo(false)
    expect(spyShowMessage).toBeCalled()
  })

  it('should defined controls', () => {
    expect(component.bornDay).toBeDefined()
    expect(component.bornMonth).toBeDefined()
    expect(component.name).toBeDefined()
    expect(component.lastName).toBeDefined()
    expect(component.email).toBeDefined()
    expect(component.role).toBeDefined()
    expect(component.phoneNumber).toBeDefined()
    expect(component.codeCountry).toBeDefined()
    expect(component.providerTo).toBeDefined()
    expect(component.skills).toBeDefined()
  })

  it('should called methods(addDialog, addPerson) when onSubmit', () => {
    component.personFormGroup.patchValue(
      {
        "name": " KONDRAMUTLA",
        "lastName": "ADITYA",
        "email": "akondram@pichincha.com",
        "role": "Staff",
        "phoneNumber": "0981565680",
        "bankEntryDate": null,
        "user": "luischi",
        "state": "ACTIVO",
        "ultimatix": 534040,
        "codeCountry": "ECU",
        "idProvider": 2,
        "idSeniority": 4,
        "idProfile": 2,
        "idChapter": 1,
        "bornMonth": null,
        "bornDay": null
      }
    )
    mockedDialogService.addDialog
      .mockImplementation(() => of(true))

    mockedPersonService.addPerson
      .mockImplementation(() => Promise.resolve())

    jest.spyOn(router, 'navigate')
      .mockImplementation(() => Promise.resolve(true))

    component.onSubmitForm()

    expect(
      mockedDialogService.addDialog
    ).toBeCalled()

    expect(
      mockedPersonService.addPerson
    ).toBeCalled()

  })

});
