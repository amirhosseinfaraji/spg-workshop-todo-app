import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "todos",
    pathMatch: "full",
  },
  {
    path: "todos",
    loadComponent: async () => await import("../app/todos/todos.component"),
  },
  {
    path: "todos/:id",
    loadComponent: async () =>
      await import("../app/todos/todo-details/todo-details.component"),
  },
];
