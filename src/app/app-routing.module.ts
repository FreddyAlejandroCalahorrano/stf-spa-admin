import {Routes} from '@angular/router';

import {BaseComponent} from './components/base/base.component';
import {PageErrorComponent} from "./components/page-error/page-error.component";
import {AsignacionesTribusComponent} from "./components/asignaciones/asignaciones-tribus/asignaciones-tribus.component";
import {
  AsignacionesCelulasComponent
} from "./components/asignaciones/asignaciones-celulas/asignaciones-celulas.component";
import {
  FormAsignacionesTribusComponent
} from "./components/asignaciones/asignaciones-tribus/form-asignaciones-tribus/form-asignaciones-tribus.component";
import {
  FormAsignacionesCelulasComponent
} from './components/asignaciones/asignaciones-celulas/form-asignaciones-celulas/form-asignaciones-celulas.component';
import {PersonTribuResolver, TipoRolTribuLiderResolver, TribuResolver} from "./resolvers/person-tribu.resolver";
import {PersonCelulaResolver} from './resolvers/person-celula.resolver';
import {PersonComponent} from "./components/person/person.component";
import {PersonResolver} from "./resolvers/person.resolver";
import {CelulasComponent} from './components/catalogs/celulas/celulas.component';
import {TribusComponent} from './components/catalogs/tribus/tribus.component';
import {SkillsComponent} from './components/catalogs/skills/skills.component';
import {PersonEditComponent} from "./components/person/person-edit/person-edit.component";

export let routes: Routes;
routes = [
  {
    path: '',
    component: BaseComponent,
    data: {breadcrumb: 'Home'},
    // canActivate: [LoggedGuard],
    children: [
      {
        path: 'personas',
        data: {breadcrumb: 'Personas'},
        children: [
          {
            path: '',
            component: PersonComponent,
          },
          {
            path: 'crear',
            component: PersonEditComponent,
            data: {breadcrumb: 'Agregar'},
          },
          {
            path: 'editar/:id',
            component: PersonEditComponent,
            resolve: {
              person: PersonResolver
            },
            data: {breadcrumb: 'Editar'},
          },
        ]
      },
      {
        path: 'catalogos',
        data: {breadcrumb: 'Catalogos'},
        children: [
          {
            path: '',
            redirectTo: 'tribus',
            pathMatch: 'full'
          },
          {
            path: 'tribus',
            component: TribusComponent,
            data: {breadcrumb: 'Tribus'},
          },
          {
            path: 'celulas',
            component: CelulasComponent,
            data: {breadcrumb: 'Celulas'},
          },
          {
            path: 'habilidades',
            component: SkillsComponent,
            data: {breadcrumb: 'Habilidades'},
          },
        ]
      },
      {
        path: 'asignaciones',
        data: {breadcrumb: 'Asignaciones'},
        children: [
          {
            path: '',
            redirectTo: 'tribus',
            pathMatch: 'full'
          },
          {
            path: 'tribus',
            data: {breadcrumb: 'Tribus'},
            children: [
              {
                path: '',
                component: AsignacionesTribusComponent,
              },
              {
                path: 'crear',
                component: FormAsignacionesTribusComponent,
                data: {breadcrumb: 'Crear Asignación'},
                resolve: {
                  tribus: TribuResolver,
                  tipoRol: TipoRolTribuLiderResolver
                }
              },
              {
                path: 'editar/:id',
                data: {breadcrumb: 'Editar Asignación'},
                component: FormAsignacionesTribusComponent,
                resolve: {
                  personTribu: PersonTribuResolver,
                  tribus: TribuResolver,
                  tipoRol: TipoRolTribuLiderResolver
                }
              },
            ]
          },
          {
            path: 'celulas',
            data: {breadcrumb: 'Celulas'},
            children: [
              {
                path: '',
                component: AsignacionesCelulasComponent,
              },
              {
                path: 'crear',
                data: {breadcrumb: 'Crear Asignación'},
                component: FormAsignacionesCelulasComponent,
              },
              {
                path: 'editar/:id',
                data: {breadcrumb: 'Editar Asignación'},
                component: FormAsignacionesCelulasComponent,
                resolve: {
                  personCelula: PersonCelulaResolver,
                }
              },
            ]
          },
        ]
      },
    ],
  },
  {
    path: 'pg-error',
    component: PageErrorComponent,
  },
  {
    path: '**',
    redirectTo: 'pg-error',
    pathMatch: 'full',
  },
];
