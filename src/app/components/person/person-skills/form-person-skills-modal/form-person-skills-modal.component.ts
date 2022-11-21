import {Component, OnInit} from '@angular/core';
import {DialogComponent} from "@modal/dialog.component";
import {DialogService} from "@modal/dialog.service";
import {Skill} from "@interfaces/skill";
import {SkillsService} from "@services/skills.service";
import {SelectionModel} from "@angular/cdk/collections";

export interface ModelDialog {
  title: string,
  profileId: number,
}

export interface ResponseDialog {
  status: string,
  text: string,
  selections: Skill[],
}

@Component({
  selector: 'app-form-person-skills-modal',
  templateUrl: './form-person-skills-modal.component.html',
  styleUrls: ['./form-person-skills-modal.component.scss']
})
export class FormPersonSkillsModalComponent extends DialogComponent<ModelDialog, ResponseDialog> implements OnInit {

  title: string;
  profileId: number
  skillsCatalog: Skill[]

  selections = new SelectionModel(true);

  searchNameSkill: string = ""

  columns: any[]

  constructor(
    dialogService: DialogService,
    private _skillService: SkillsService,
  ) {
    super(dialogService)
    this.setConfigTable()
  }

  async ngOnInit() {
    this.skillsCatalog = await this._skillService.getSkillsByProfileId(this.profileId)
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

  onClickCheckbox(event: any) {
    const {value} = event.detail

    this.selections.toggle(value)
  }

  onAddSkills() {

    if (this.selections.selected.length == 0) return

    this.result = {
      status: "success",
      text: "Habilidades agregadas.",
      selections: [
        ...this.skillsCatalog
          .filter(skill => this.selections.selected.includes(skill.id.toString()))
      ]
    }
    this.close()

  }

}
