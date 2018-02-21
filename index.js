const todoItem = Vue.extend({
  props: ['todo'],
  template: `
    <div>
      <label>
        {{ todo.text }}
        <input type="checkbox">
      </label>
    </div>
  `
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
    todos: [
      {id: 1, text: 'explain vue', done: true},
      {id: 2, text: 'write todo app', done: false},
      {id: 3, text: 'go to cavendish', done: false}
    ]
  }
})
