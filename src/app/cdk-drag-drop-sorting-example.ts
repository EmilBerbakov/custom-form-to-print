import { Component, inject, Injector, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';

/**
 * @title Drag&Drop sorting
 */
@Component({
  selector: 'cdk-drag-drop-sorting-example',
  templateUrl: 'cdk-drag-drop-sorting-example.html',
  styleUrls: ['cdk-drag-drop-sorting-example.css'],
})
export class CdkDragDropSortingExample implements OnInit {
  fb = inject(FormBuilder);
  inj = inject(Injector);
  formGroup: FormGroup;
  formFields: FormArray = new FormArray([]);
  formFieldName: number = 0;

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.fb.group({ formArray: this.formFields });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInFormArray(
      this.formFields,
      event.previousIndex,
      event.currentIndex
    );
  }

  print() {
    window.print();
  }

  addField() {
    this.formFields.push(new FormControl(''));
  }

  deleteField(index: number) {
    this.formFields.removeAt(index);
  }

  editTitle(index: number): void {
    //! Actually, you'd probably want to use a model for the value of the input that changes the name of the input added, and then use that in the template
    //TODO - get the div we're in, grab the innerText of the mat-label within the div, change the innerText
    // The form in the menu will have a generated name of formFieldEdit${index}, so we'll either subscribe to the valueChanges of the form and change the label in real time,
    // or we'll grab the input value when they close the menu
  const labelElement = document.getElementById(`formFieldLabel${index}`).getElementsByTagName('mat-label')[0] as HTMLElement;
  const label = labelElement.innerText;
  console.log(label)
  //document[divBlock].getEl
  //console.log(label);
  }
}

function moveItemInFormArray(
  formArray: FormArray,
  fromIndex: number,
  toIndex: number
): void {
  const dir = toIndex > fromIndex ? 1 : -1;

  const item = formArray.at(fromIndex);
  for (let i = fromIndex; i * dir < toIndex * dir; i = i + dir) {
    const current = formArray.at(i + dir);
    formArray.setControl(i, current);
  }
  formArray.setControl(toIndex, item);
}
