import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  ViewContainerRef,
  inject,
} from "@angular/core";
import { provideComponentStore } from "@ngrx/component-store";
import { TodosStore } from "./store/todos.store";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { TodoFormComponent } from "./todo-form/todo-form.component";

@Component({
  selector: "app-todos",
  standalone: true,
  templateUrl: "./todos.component.html",
  imports: [MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(TodosStore)],
})
export default class TodosComponent {
  #dialog = inject(MatDialog);
  #vcr = inject(ViewContainerRef);
  readonly vm = inject(TodosStore).vm;

  addTodo() {
    this.#dialog.open(TodoFormComponent, {
      viewContainerRef: this.#vcr,
    });
  }
}
