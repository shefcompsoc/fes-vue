const todoItem = Vue.extend({
  props: ['todo'],
  data: {
    checked: 'todo.done',
  },
  template: `
    <div>
      <label>
        {{ todo.text }}
        <input type="checkbox" :checked="todo.done" @click="markAs">
      </label>
    </div>
  `,
  methods: {
    markAs: function (event) {
      this.todo.done = event.target.checked
    }
  }
})

const todoList = Vue.extend({
props: ['todos'],
  template: `
    <div>
      <todo-item
        v-for="todo in todos"
        :todo="todo"
        :key="todo.id"
      ></todo-item>
    </div>
  `
})

Vue.component('todo-item', todoItem)
Vue.component('todo-list', todoList)

const app = new Vue({
  el: '#app',
  data: {
    title: 'Front-end Showdown',
    filter: 'none',
    todos: [
      {id: 1, text: 'explain vue', done: true},
      {id: 2, text: 'write todo app', done: false},
      {id: 3, text: 'go to cavendish', done: false}
    ]
  },
  computed: {
    filteredTodos: function () {
      if (this.filter === 'complete') {
        return this.todos.filter(x => x.done);
      } else if (this.filter === 'incomplete') {
        return this.todos.filter(x => !x.done);
      } else {
        // no filter
        return this.todos;
      }
    }
  },
  methods: {}
})
