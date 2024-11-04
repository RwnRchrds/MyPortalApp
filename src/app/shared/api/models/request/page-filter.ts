import {LazyLoadEvent} from "primeng/api";

export class PageFilter {
  skip: number;
  take: number;

  constructor(event: LazyLoadEvent) {
    this.skip = event.first ?? 0;
    this.take = event.rows ?? 0;
  }
}
