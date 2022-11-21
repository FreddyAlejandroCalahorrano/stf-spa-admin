import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Person} from "@interfaces/person";
import {Chapter} from "@interfaces/chapter";
import {Profile} from "@interfaces/profile";
import {PersonService} from "@services/person.service";
import {CountryService} from "@services/country.service";
import {RolesService} from "@services/roles.service";
import {ProvidersService} from "@services/providers.service";
import {DialogService} from "@modal/dialog.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SeniorityService} from "@services/seniority.service";
import {ProfilesService} from "@services/profiles.service";
import {ChapterService} from "@services/chapter.service";
import {MessageBarService} from "@services/message-bar.service";
import {ValidateDatePerson, ValidatorsPEmail} from "../../../validators/validators";
import {getMessageError, getToday, MONTHS} from "../../../common/utils/fn";
import {filter, map, switchMap, tap} from "rxjs/operators";
import {ConfirmModalComponent} from "../../../common/components/confirm-modal/confirm-modal.component";
import {SkillsService} from "@services/skills.service";
import {from, Observable, of} from "rxjs";

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {

  showSpinner: boolean = false

  @Input() isEdit: boolean
  personEdit: Person

  personFormGroup: FormGroup

  msgError: boolean = false
  private numPattern: any = /^[0-9]*$/;
  private alphanumeric: any = /^[0-9A-Za-z]*$/

  listCountry$: Promise<any[]>
  listRole$: Promise<string[]>
  listProviders$: Promise<any[]>
  listSeniority$: Promise<any[]>
  listChapter$: Promise<Chapter[]>
  listProfile$: Promise<Profile[]>

  listBornDay: any[] = []

  listBornMonth: { value: number, maxDay: number, label: string }[] = [...MONTHS]


  personSkills$: Observable<any[]>

  constructor(private personService: PersonService,
              private countryService: CountryService,
              private roleService: RolesService,
              private providerService: ProvidersService,
              private modalBsService: DialogService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private seniorityService: SeniorityService,
              private profilesService: ProfilesService,
              private chapterService: ChapterService,
              private skillsService: SkillsService,
              private messageBarService: MessageBarService,) {
    // Catalogs
    this.listCountry$ = this.countryService.getCountry()
    this.listProviders$ = this.providerService.getProviders()
    this.listSeniority$ = this.seniorityService.getSeniority()
    this.listRole$ = this.roleService.getRole()
    this.listProfile$ = this.profilesService.getProfiles()
    this.listChapter$ = this.chapterService.getChapters()
    // Routing Data
    this.setPersonEdit()
  }

  ngOnInit(): void {
    this.buildForm();
    this.editData();
  }

  setPersonEdit() {
    const {person} = this.activatedRoute.snapshot.data
    if (!person) return;

    this.isEdit = true
    this.personEdit = {...person}
  }

  editData() {
    if (!this.isEdit) return;

    this.personFormGroup?.patchValue({
      name: this.personEdit.name,
      lastName: this.personEdit.lastName,
      email: this.personEdit.email,
      role: this.personEdit.role || '',
      phoneNumber: this.personEdit.phoneNumber,
      bankEntryDate: this.personEdit.bankEntryDate,
      state: this.personEdit.state,
      ultimatix: this.personEdit.ultimatix,
      codeCountry: this.personEdit.codeCountry,
      idProvider: this.personEdit.idProvider,
      idSeniority: this.personEdit.idSeniority,
      idProfile: this.personEdit.idProfile,
      idChapter: this.personEdit.idChapter,
      bornDay: this.personEdit.bornDay,
      bornMonth: this.personEdit.bornMonth
    })
    this.personSkills$ = this.skillsService.getSkillsByPersonId(this.personEdit.id)
      .pipe(
        tap(results => this.skills.setValue(results))
      )
    this.personFormGroup.markAllAsTouched()
  }

  buildForm() {
    this.personSkills$ = of([])
    this.personFormGroup = this.formBuilder.group({
      name: ['', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      }],
      lastName: ['', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      }],
      email: ['', {
        validators: [
          Validators.required,
          Validators.email,
          Validators.maxLength(50),
        ],
        asyncValidators: [
          ValidatorsPEmail(this.personService, this.personEdit?.email)
        ],
        updateOn: 'blur'
      }],
      role: ['', {
        validators: [Validators.required],
      }],
      phoneNumber: ['', {
        validators: [
          Validators.pattern(this.numPattern),
          Validators.minLength(10),
          Validators.maxLength(15),
        ],
      }],
      bankEntryDate: [getToday(), [ValidateDatePerson()]],
      user: [{value: 'luischi', disabled: true}],
      state: [{value: 'ACTIVO', disabled: true}],
      ultimatix: ['', {
        validators: [
          Validators.maxLength(8),
          Validators.pattern(this.numPattern),
        ]
      }],
      codeCountry: [null, [Validators.required]],
      idProvider: [null, [Validators.required]],
      idSeniority: [null, [Validators.required]],
      idProfile: [null, [Validators.required]],
      idChapter: [null, [Validators.required]],
      bornMonth: [0, []],
      bornDay: [0, []],
      skills: [[], [Validators.required, Validators.min(1)]],
    })
    // this.registerEvents()
  }

  setSkills(skills: number[]) {
    this.skills.setValue([...skills])
  }

  registerEvents() {
    this.bornMonth
      .valueChanges
      .pipe(
        filter(value => value > 0),
        map(value =>
          this.listBornMonth.find(mes => mes.value == value)
        )
      ).subscribe(mes => {
      this.bornDay.setValue(null)
      this.listBornDay = Array.from({length: mes.maxDay},
        (x, i) => ({value: i + 1})
      )
    })
  }

  onSubmitForm() {
    this.personFormGroup.markAllAsTouched()
    if (this.personFormGroup.invalid) {
      scroll({
        top: 0,
        behavior: 'smooth'
      })
      this.msgError = true
      return
    }

    const dataForm = this.personFormGroup.getRawValue()

    const {
      name,
      lastName,
      phoneNumber,
      ultimatix,
      bankEntryDate,
      bornDay,
      bornMonth,
      skills
    } = dataForm
    const submittedPerson = {
      ...dataForm,
      ...({name: name.toUpperCase()}),
      ...({lastName: lastName.toUpperCase()}),
      ...(phoneNumber == "" ? null : {phoneNumber}),
      ...(ultimatix == "" || ultimatix == null ? null : {ultimatix: +ultimatix}),
      ...(bankEntryDate == "" ? null : {bankEntryDate}),
      ...(bornDay == "" ? 0 : {bornDay}),
      ...(bornMonth == "" ? 0 : {bornMonth}),
    }

    this.modalBsService.addDialog(
      ConfirmModalComponent,
      {
        title: this.isEdit ? '¿Está seguro que desea actualizar la información?'
          : '¿Está seguro que desea agregar el registro?'
      },
    ).subscribe((result: boolean) => {
      if (!result) return

      const promiseAddEdit = this.isEdit ? this.personService.updatePerson(submittedPerson, this.personEdit.id) :
        this.personService.addPerson(submittedPerson);

      from(promiseAddEdit)
        .pipe(
          switchMap((response) =>
            this.skillsService.updateSkillsByPerson(response.id, skills)
          )
        )
        .subscribe({
          next: () => this.redirectTo(false, this.isEdit),
          error: (err) => this.messageBarService.showMessage(
            getMessageError(err.response.data),
            "error"
          )
        })

    })
  }

  redirectTo(reset: boolean, edit?: boolean) {
    if (!reset)
      this.messageBarService.showMessage(
        edit ? "Persona actualizada con éxito"
          : "Persona creada con éxito",
        "success"
      )
    let route = edit ? ['../..'] : ['..']
    this.router.navigate(route, {relativeTo: this.activatedRoute,})
  }

  //#region Getters - Setters
  get skills() {
    return this.personFormGroup.get('skills') as FormControl;
  }

  get name() {
    return this.personFormGroup.get('name') as FormControl;
  }

  get lastName() {
    return this.personFormGroup.get('lastName') as FormControl;
  }

  get email() {
    return this.personFormGroup.get('email') as FormControl;
  }

  get bornDay() {
    return this.personFormGroup.get('bornDay') as FormControl;
  }

  get bornMonth() {
    return this.personFormGroup.get('bornMonth') as FormControl;
  }

  get role() {
    return this.personFormGroup.get('role') as FormControl;
  }

  get phoneNumber() {
    return this.personFormGroup.get('phoneNumber') as FormControl;
  }

  get codeCountry() {
    return this.personFormGroup.get('codeCountry') as FormControl;
  }

  get providerTo() {
    return this.personFormGroup.get('idProvider') as FormControl;
  }

  get seniorityTo() {
    return this.personFormGroup.get('idSeniority') as FormControl;
  }

  get profileTo() {
    return this.personFormGroup.get('idProfile') as FormControl;
  }

  get chapterTo() {
    return this.personFormGroup.get('idChapter') as FormControl;
  }

  get ultimatix() {
    return this.personFormGroup.get('ultimatix') as FormControl;
  }

  get bankEntryDate() {
    return this.personFormGroup.get('bankEntryDate') as FormControl;
  }

  //#endregion

}
