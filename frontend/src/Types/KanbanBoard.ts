export interface Column {
  id: string;
  title: string;
}
export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  columnId: string;
  content: string;
}
