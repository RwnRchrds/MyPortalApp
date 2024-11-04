export interface CalendarEventModel {
  id: string;
  groupId: string;
  allDay: boolean;
  start: Date;
  end: Date;
  title: string;
  url: string;
  classNames: string[];
  resourceIds: string[];
  editable: boolean;
  overlap: boolean;
  display: string;
  color: string;
  textColor: string;
  extendedProps: any;
}
