async function fetchTasks() {
  const res = await fetch('/api/todos');
  return await res.json();
}

async function addTask(text) {
  const res = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return await res.json();
}

async function updateTask(id, completed) {
  await fetch(`/api/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed })
  });
}

async function deleteTask(id) {
  await fetch(`/api/todos/${id}`, { method: 'DELETE' });
}

function renderTasks(tasks) {
  const list = document.getElementById('task-list');
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');
    li.style.animationDelay = `${index * 0.05}s`;

    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', async () => {
      await updateTask(task.id, checkbox.checked);
      loadTasks();
    });
    label.appendChild(checkbox);
    label.append(' ' + task.text);
    li.appendChild(label);

    const del = document.createElement('button');
    del.className = 'delete-btn';
    const img = document.createElement('img');
    img.src = '/static/trash.png';
    img.alt = '削除';
    del.appendChild(img);
    del.addEventListener('click', async () => {
      li.classList.add('delete-animation');
      await new Promise(resolve => li.addEventListener('animationend', resolve, { once: true }));
      await deleteTask(task.id);
      loadTasks();
    });
    li.appendChild(del);

    list.appendChild(li);
  });
  document.getElementById('remaining-count').textContent =
    tasks.filter(t => !t.completed).length + ' 件のタスク';
}

async function loadTasks() {
  const tasks = await fetchTasks();
  renderTasks(tasks);
}

document.getElementById('new-task-form').addEventListener('submit', async e => {
  e.preventDefault();
  const input = document.getElementById('new-task');
  const text = input.value.trim();
  if (text) {
    await addTask(text);
    input.value = '';
    loadTasks();
  }
});

loadTasks();
