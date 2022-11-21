import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpModule} from '@pichincha/angular-sdk/http';
import {CustomCommonModule} from '../../common/components/common.module';
import {MessageBarService} from '@services/message-bar.service';
import {PersonService} from '@services/person.service';
import {ActivatedRoute, Router} from "@angular/router";

import {PersonComponent} from './person.component';
import {of} from "rxjs";
import {DialogService} from "@modal/dialog.service";

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;
  let mockedDialogService = {
    addDialog: jest.fn()
  };
  let mockedPersonService = {
    updatePerson: jest.fn(),
    getPeopleSearchPaged: jest.fn().mockImplementation(() => Promise.resolve())
  };
  let router: Router;
  let activateRoute: ActivatedRoute;
  let mockedMessageService = {
    showMessage: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({api_url:''}),
        CustomCommonModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [PersonComponent],
      providers: [
        {provide: DialogService, useValue: mockedDialogService},
        {provide: PersonService, useValue: mockedPersonService},
        {provide: MessageBarService, useValue: mockedMessageService}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router)
    activateRoute = TestBed.inject(ActivatedRoute)
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should called "addDialog" when delete person', () => {
    const dataDelete = {
      name: 'Freddy',
      lastName: 'Calahorrano'
    }

    mockedDialogService.addDialog
      .mockImplementation(() =>
        of({
          confirm: true, date: '2022-10-10'
        })
      )

    mockedPersonService.updatePerson
      .mockImplementation(() => Promise.resolve({}))

    component.onDeletePersonClick(dataDelete)

    expect(
      mockedDialogService.addDialog
    ).toBeCalled()

    expect(
      mockedPersonService.updatePerson
    ).toBeCalled()
  });

  xit('should navigate to the specified route with the specified id', () => {
    const idMock = 1
    const navigateSpy = jest.spyOn(router, 'navigate')
      .mockImplementation(() => Promise.resolve(true))

    component.onEditPersonClick(idMock)
    expect(navigateSpy).toHaveBeenCalledWith([`editar`, idMock], activateRoute)
  });

  it('should called method "next" from [dataReport$] when call setupPagination', () => {
    const spyNextSubject = jest.spyOn(component.dataPaginationPerson$, 'next')
    component.setupPagination({sizePage: 5, currentPage: 1, start: 0, end: 0})
    expect(
      spyNextSubject
    ).toBeCalled()
  })

  it('should call the messageBar service', () => {
    const message: any = {
      status: "error",
      text: "ERROR"
    }
    const spyMessage = jest.spyOn(mockedMessageService, 'showMessage')
    component.setupMessageBar(message)
    expect(spyMessage).toBeCalled()
  })

});
