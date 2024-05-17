import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TodoFormService } from "./todo.form.service";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { DialogRef } from "@angular/cdk/dialog";
import { TodosStore } from "../store/todos.store";

@Component({
  selector: "app-todo-form",
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule],
  templateUrl: "./todo-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoFormService],
})
export class TodoFormComponent {
  #dialogRef = inject(DialogRef<TodoFormComponent>);
  #todosStore = inject(TodosStore);
  readonly todoForm = inject(TodoFormService).todoForm;

  submit() {
    if (!this.todoForm.invalid) {
      this.#todosStore.addTodo(this.todoForm.getRawValue());
      this.#dialogRef.close();
    }
  }
}
