import { Injectable, inject } from "@angular/core";
import { ComponentStore, OnStateInit } from "@ngrx/component-store";
import { TodoModel } from "../../../todo.model";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { pipe } from "rxjs";
import { TodosService } from "../../../todo.service";
import { tapResponse } from "@ngrx/operators";

interface TodoDetailsStateModel {
  todo: TodoModel | null;
  isLoading: boolean;
}

@Injectable()
export class TodoDetailsStore
  extends ComponentStore<TodoDetailsStateModel>
  implements OnStateInit
{
  #todoService = inject(TodosService);
  #todoId = inject(ActivatedRoute).params.pipe(map(({ id }) => id));
  constructor() {
    super({
      todo: null,
      isLoading: false,
    });
  }

  ngrxOnStateInit() {
    this.getTodo();
  }

  readonly vm = this.selectSignal((store) => store);

  readonly getTodo = this.effect<void>(
    pipe(
      tap(() => this.patchState({ isLoading: true })),
      withLatestFrom(this.#todoId),
      switchMap(([, todoId]) =>
        this.#todoService.getTodo(todoId).pipe(
          tapResponse({
            next: (todo) => this.patchState({ todo }),
            error: (error) => console.log(error),
            finalize: () => this.patchState({ isLoading: false }),
          }),
        ),
      ),
    ),
  );
}
