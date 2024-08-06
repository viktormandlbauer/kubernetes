document.addEventListener('DOMContentLoaded', () => {
    fetch('/todos')
        .then(response => response.json())
        .then(todos => {
            const todoList = document.getElementById('todo-list');
            todos.forEach(todo => {
                console.info(todo);
                const li = document.createElement('li');
                li.textContent = todo['title'];
                todoList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching todos:', error);
        });

    const form = document.getElementById('todo-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        console.log('Form submitted');
        const title = document.getElementById('todo-input').value;

        const todoData = {
            title: title,
            status: 'open'
        };

        fetch('/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todoData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Optionally handle the response data
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
});