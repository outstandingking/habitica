import { shouldDo } from 'common/script/cron';

// Return all the tags belonging to an user task
export function getTagsFor (store) {
  return (task) => {
    return store.state.user.data.tags
      .filter(tag => task.tags && task.tags.indexOf(tag.id) !== -1)
      .map(tag => tag.name);
  };
}

function getTaskColor (task) {
  if (task.type === 'reward') return 'purple';

  const value = task.value;

  if (value < -20) {
    return 'worst';
  } else if (value < -10) {
    return 'worse';
  } else if (value < -1) {
    return 'bad';
  } else if (value < 1) {
    return 'neutral';
  } else if (value < 5) {
    return 'good';
  } else if (value < 10) {
    return 'better';
  } else {
    return 'best';
  }
}

export function canDelete () {
  return (task) => {
    let isUserChallenge = Boolean(task.userId);
    let activeChallenge = isUserChallenge && task.challenge && task.challenge.id && !task.challenge.broken;
    return !activeChallenge;
  };
}

export function getTaskClasses (store) {
  const userPreferences = store.state.user.data.preferences;

  // Purpose can be one of the following strings:
  // Edit Modal: edit-modal-bg, edit-modal-text, edit-modal-icon
  // Create Modal: create-modal-bg, create-modal-text, create-modal-icon
  // Control: 
  return (task, purpose, dueDate) => {
    if (!dueDate) dueDate = new Date();
    const type = task.type;

    switch (purpose) {
      case 'edit-modal-bg':
        return `task-${getTaskColor(task)}-modal-bg`;
      case 'edit-modal-text':
        return `task-${getTaskColor(task)}-modal-text`;
      case 'edit-modal-icon':
        return `task-${getTaskColor(task)}-modal-icon`;
      case 'create-modal-bg':
        return 'task-purple-modal-bg';
      case 'create-modal-text':
        return 'task-purple-modal-text';
      case 'create-modal-icon':
        return 'task-purple-modal-icon';
      default:
        return 'not a classe';
    }

    /*  
      case 'controlCreate':
        return {
          up: task.up ? 'task-purple' : 'task-habit-disabled',
          down: task.down ? 'task-purple' : 'task-habit-disabled',
        };
      case 'control':
        switch (type) {
          case 'daily':
            if (task.completed || !shouldDo(dueDate, task, userPreferences)) return 'task-daily-todo-disabled';
            return getTaskColorByValue(task.value);
          case 'todo':
            if (task.completed) return 'task-daily-todo-disabled';
            return getTaskColorByValue(task.value);
          case 'habit':
            return {
              up: task.up ? getTaskColorByValue(task.value) : 'task-habit-disabled',
              down: task.down ? getTaskColorByValue(task.value) : 'task-habit-disabled',
            };
          case 'reward':
            return 'task-reward';
        }
        break;
      case 'content':
        if (type === 'daily' && (task.completed || !shouldDo(dueDate, task, userPreferences)) || type === 'todo' && task.completed) {
          return 'task-daily-todo-content-disabled';
        }
        break;
    } */
  };
}
