import { CommonModule, JsonPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { provideComponentStore } from "@ngrx/component-store";
import { TodoDetailsStore } from "./store/todo-details.store";
import { TodosStore } from "../store/todos.store";

@Component({
  selector: "app-todo-details",
  standalone: true,
  imports: [JsonPipe],
  templateUrl: "./todo-details.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(TodoDetailsStore)],
})
export default class TodoDetailsComponent {
  readonly vm = inject(TodoDetailsStore).vm;
}
