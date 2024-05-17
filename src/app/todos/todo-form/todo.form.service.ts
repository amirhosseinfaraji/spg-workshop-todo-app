import { Injectable, inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Injectable()
export class TodoFormService {
  #form = inject(FormBuilder).nonNullable.group({
    title: [""],
  });

  get todoForm(): FormGroup {
    return this.#form;
  }
}
