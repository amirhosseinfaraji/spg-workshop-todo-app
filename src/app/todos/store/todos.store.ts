import { Injectable, inject } from "@angular/core";
import { TodoModel } from "../../todo.model";
import { ComponentStore, OnStateInit } from "@ngrx/component-store";
import { TodosService } from "../../todo.service";
import { pipe, switchMap, tap } from "rxjs";
import { tapResponse } from "@ngrx/operators";
import { HttpErrorResponse } from "@angular/common/http";

interface TodoStateModel {
  todos: TodoModel[];
  isLoading: boolean;
  error?: Error | null;
}

@Injectable()
export class TodosStore
  extends ComponentStore<TodoStateModel>
  implements OnStateInit
{
  #todoService = inject(TodosService);
  constructor() {
    super({
      todos: [],
      isLoading: false,
    });
  }

  ngrxOnStateInit() {
    this.getTodos();
  }

  readonly vm = this.selectSignal((store) => store);

  readonly addTodo = this.updater((store, todo: TodoModel) => {
    return {
      ...store,
      todos: [...store.todos, todo],
    };
  });

  readonly getTodos = this.effect<void>(
    pipe(
      tap(() => this.patchState({ isLoading: true, error: null })),
      switchMap(() =>
        this.#todoService.getTodos().pipe(
          tapResponse({
            next: (todos) => this.patchState({ todos }),
            error: (error: HttpErrorResponse) => this.patchState({ error }),
            finalize: () => this.patchState({ isLoading: false }),
          }),
        ),
      ),
    ),
  );
}
