enum Todo_status {
  progress = 'progress',
  success = 'success',
  fail = 'fail',
}

export interface Todo {
  todo_id: string;
  todo_title: string;
  todo_text: string;
  todo_status: Todo_status;
  todo_created_at: Date;
}
