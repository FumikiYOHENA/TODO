from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

tasks = []
next_id = 1

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/todos', methods=['GET', 'POST'])
def todos():
    global tasks, next_id
    if request.method == 'POST':
        data = request.get_json()
        task = {
            'id': next_id,
            'text': data.get('text', ''),
            'completed': False
        }
        tasks.append(task)
        next_id += 1
        return jsonify(task), 201
    else:
        return jsonify(tasks)

@app.route('/api/todos/<int:task_id>', methods=['PATCH', 'DELETE'])
def todo_detail(task_id):
    global tasks
    task = next((t for t in tasks if t['id'] == task_id), None)
    if not task:
        return jsonify({'error': 'Not found'}), 404
    if request.method == 'PATCH':
        data = request.get_json()
        task['completed'] = data.get('completed', task['completed'])
        return jsonify(task)
    else:
        tasks = [t for t in tasks if t['id'] != task_id]
        return '', 204

if __name__ == '__main__':
    app.run(debug=True)
