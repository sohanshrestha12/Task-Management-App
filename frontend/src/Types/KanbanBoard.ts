export interface Column{
    id: string ;
    title:string;
}
export interface Task {
    id:string;
  description:string;
  status:string;
  columnId: string;
  content: string;
}