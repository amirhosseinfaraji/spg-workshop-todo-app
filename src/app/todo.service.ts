import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { TodoModel } from "./todo.model";
import { Observable, map } from "rxjs";
import { API_BASE_PATH } from "./base-api.token";

@Injectable({ providedIn: "root" })
export class TodosService {
  #http = inject(HttpClient);
  #baePath = inject(API_BASE_PATH);

  getTodos(): Observable<TodoModel[]> {
    return this.#http
      .get<TodoModel[]>(`${this.#baePath}/todos`)
      .pipe(map((todos) => todos.slice(0, 5)));
  }

  getTodo(id: string): Observable<TodoModel> {
    return this.#http.get<TodoModel>(`${this.#baePath}/todos/${id}`);
  }
}
