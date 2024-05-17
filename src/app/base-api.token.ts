import { InjectionToken } from "@angular/core";

export const API_BASE_PATH = new InjectionToken<string>("api.base", {
  factory: () => "https://jsonplaceholder.typicode.com",
});
