import {INTERCEPTOR_CONFIG_STORAGE, setAuthorization,} from '@pichincha/bb-commons/interceptor';

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ExternalAssetsModule} from '@pichincha/angular-sdk/external-assets';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
/**
 * Components
 */
import {AppComponent} from './app.component';
import {BaseComponent} from './components/base/base.component';
import {InputValueAcessorDirective} from './common/directives/input-value-accessor.directive';
import {MsalRedirectComponent} from '@azure/msal-angular';
import {BootstrapModalModule} from "@modal/bootstrap-modal.module";
import {FilterSkillPipe} from "./pipes/filter-skill.pipe";

import {ConfirmModalComponent} from "./common/components/confirm-modal/confirm-modal.component";
import {PaginationComponent} from "./common/components/pagination/pagination.component";
import {AsignacionesTribusComponent} from "./components/asignaciones/asignaciones-tribus/asignaciones-tribus.component";
import {
  AsignacionesCelulasComponent
} from "./components/asignaciones/asignaciones-celulas/asignaciones-celulas.component";
import {
  FormAsignacionesTribusComponent
} from "./components/asignaciones/asignaciones-tribus/form-asignaciones-tribus/form-asignaciones-tribus.component";

import {
  FormAsignacionesCelulasComponent
} from "./components/asignaciones/asignaciones-celulas/form-asignaciones-celulas/form-asignaciones-celulas.component";
import {
  FormAsignacionesModalComponent
} from "./components/asignaciones/form-asignaciones-modal/form-asignaciones-modal.component";
import {ListCeluasResolver, PersonCelulaResolver} from "./resolvers/person-celula.resolver";
import {PersonTribuResolver, TipoRolTribuLiderResolver, TribuResolver} from "./resolvers/person-tribu.resolver";
import {PageErrorComponent} from './components/page-error/page-error.component';
import {PersonComponent} from "./components/person/person.component";
import {CelulasComponent} from './components/catalogs/celulas/celulas.component';
import {FormCelulasModalComponent} from './components/catalogs/celulas/form-celulas-modal/form-celulas-modal.component';
import {FormSkillsModalComponent} from './components/catalogs/skills/form-skills-modal/form-skills-modal.component';
import {FormTribusModalComponent} from './components/catalogs/tribus/form-tribus-modal/form-tribus-modal.component';
import {SkillsComponent} from './components/catalogs/skills/skills.component';
import {TribusComponent} from './components/catalogs/tribus/tribus.component';
import {PersonSkillsComponent} from "./components/person/person-skills/person-skills.component";
import {
  FormPersonSkillsModalComponent
} from "./components/person/person-skills/form-person-skills-modal/form-person-skills-modal.component";
import {CustomCommonModule} from "./common/components/common.module";
import {ConfirmModalDateComponent} from "./components/asignaciones/confirm-modal-date/confirm-modal-date.component";
/**
 * Services
 */
import {
  AsignacionesCelulasService,
  AsignacionesTribusService,
  CelulaService,
  ChapterService,
  CountryService,
  MessageBarService,
  PersonService,
  ProfilesService,
  ProvidersService,
  RolesService,
  SeniorityService,
  SkillsService,
  TribuService,
  UtilitaryService
} from "@services/index";
//
import {BreadcrumbModule, BreadcrumbService} from 'xng-breadcrumb';
import {HttpInterceptorRequest} from "@pichincha/angular-sdk/http";
import {EStorageType} from '@pichincha/typescript-sdk';
import {environment} from "@environments/environment";
import {StorageModule} from "@pichincha/angular-sdk/storage";
import {PersonResolver} from "./resolvers/person.resolver";
import {PersonEditComponent} from './components/person/person-edit/person-edit.component';

export const ConfigStorage = {storageType: EStorageType.SESSION, secretKey: environment.storage.key};

const pipes = [
  FilterSkillPipe,
]

const resolvers = [
  PersonResolver,
  TipoRolTribuLiderResolver,
  PersonTribuResolver,
  PersonCelulaResolver,
  TribuResolver,
  ListCeluasResolver,
]

const modals = [
  ConfirmModalDateComponent,
  FormAsignacionesModalComponent,
  FormPersonSkillsModalComponent,
  FormCelulasModalComponent,
  FormTribusModalComponent,
  FormSkillsModalComponent,
  ConfirmModalComponent,
]

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    InputValueAcessorDirective,
    ...pipes,
    ...modals,
    PageErrorComponent,
    PersonComponent,
    PersonSkillsComponent,
    TribusComponent,
    CelulasComponent,
    SkillsComponent,
    PaginationComponent,
    AsignacionesTribusComponent,
    AsignacionesCelulasComponent,
    FormAsignacionesCelulasComponent,
    FormAsignacionesTribusComponent,
    PersonEditComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ExternalAssetsModule,
    FormsModule,
    ReactiveFormsModule,
    CustomCommonModule,
    BootstrapModalModule,
    BreadcrumbModule,
    StorageModule.forRoot(ConfigStorage),
  ],
  providers: [
    {
      provide: HttpInterceptorRequest,
      useValue: setAuthorization
    },
    {
      provide: INTERCEPTOR_CONFIG_STORAGE,
      useValue: ConfigStorage
    },
    MessageBarService,
    TribuService,
    CelulaService,
    ChapterService,
    CountryService,
    PersonService,
    ProfilesService,
    ProvidersService,
    RolesService,
    SkillsService,
    SkillsService,
    UtilitaryService,
    AsignacionesCelulasService,
    AsignacionesTribusService,
    SeniorityService,
    ...resolvers
  ],
  exports: [AppComponent, BaseComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [MsalRedirectComponent],
})
export class SharedModule {
  constructor(private breadcrumbService: BreadcrumbService) {}
}
