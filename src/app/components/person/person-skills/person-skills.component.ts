import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Skill} from "@interfaces/skill";
import {DialogService} from "@modal/dialog.service";
import {SkillsService} from "@services/skills.service";
import {ConfirmModalComponent} from "../../../common/components/confirm-modal/confirm-modal.component";
import {FormPersonSkillsModalComponent} from "./form-person-skills-modal/form-person-skills-modal.component";
import {MessageBarService} from "@services/message-bar.service";
import {MessageBar} from "@interfaces/messageBar";

@Component({
  selector: 'app-person-skills',
  templateUrl: './person-skills.component.html',
  styleUrls: ['./person-skills.component.scss']
})
export class PersonSkillsComponent {

  @Input() profile: number
  @Input() personSkills: Skill[] = []

  @Output() changeSkills: EventEmitter<number[]> = new EventEmitter<number[]>()
  showMessageBar: boolean = false

  // FILTERS
  searchNameSkill: string = ""
  searchTypeSkills: string = ""

  showSpinner: boolean = false
  columns: any[]

  constructor(
    private skillService: SkillsService,
    private modalBsService: DialogService,
    private messageBarService: MessageBarService,) {
    this.setConfigTable()
  }

  setConfigTable() {
    this.columns = [
      {
        caption: 'Tipo de Habilidad',
      },
      {
        caption: 'Nombre',
      },
      {
        caption: 'Acciones',
      }
    ]
  }

  onDeletePersonSkill(itemSkill: Skill) {
    const title = `¿Está seguro que desea eliminar la skill ${itemSkill.nameSkill}?`
    this.modalBsService.addDialog(
      ConfirmModalComponent,
      {title},
    ).subscribe((result: boolean) => {
      if (!result) return

      this.personSkills = [
        ...this.personSkills.filter(skill => skill.id !== itemSkill.id)
      ]
      this.emitValue()
    })
  }

  onAddPersonSkill() {
    if (!this.profile) {
      this.showMessageBar = true
      setTimeout(() => {
        this.showMessageBar = false
      }, 3000)
      return
    }

    this.modalBsService.addDialog(
      FormPersonSkillsModalComponent,
      {
        title: 'Agregar Habilidades',
        profileId: this.profile,
      },
      {size: 'lg',}
    ).subscribe((result) => {
      if (!result) return

      this.personSkills = [
        ...this.personSkills,
        ...(
          result.selections.filter(
            skill => !this.personSkills.some(item => item.id == skill.id)
          )
        )
      ]
      this.emitValue()
    })
  }

  emitValue() {
    this.changeSkills.emit([
      ...this.personSkills.map(skill => skill.id)
    ])
  }

  setupMessageBar({text, status}: MessageBar) {
    this.messageBarService.showMessage(text, status)
  }

}
