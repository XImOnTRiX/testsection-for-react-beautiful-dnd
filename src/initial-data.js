const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Firstname' },
    'task-2': { id: 'task-2', content: 'Lastname' },
    'task-3': { id: 'task-3', content: 'E-Mail' },
    'task-4': { id: 'task-4', content: 'phone' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Kontakt data',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
  },
  columnOrder: ['column-1'],
};

export default initialData;
