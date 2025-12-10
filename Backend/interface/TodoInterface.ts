export interface createTodoRequestBody {
  title: string;
  content: string;
  startDate: Date;
  dueDate: Date;
}

export interface listTodoQuery {
  page?: number | string;
  limit?: number | string;
  status?: string;
}
