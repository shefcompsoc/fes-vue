const byId = (a, b) => {
  return a.id < b.id ? -1 : 1
}

const todoItem = Vue.extend({
  props: ['todo'],
  template: `
    <div class="todo-item" :class="{ done: todo.done }">
      <label>
        {{ todo.text }}
        <input type="checkbox" :checked="todo.done" @click="markAs">
      </label>
    </div>
  `,
  methods: {
    markAs: function(event) {
      this.$emit('mark', { id: this.todo.id, done: event.target.checked })
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
        @mark="markAs"
      ></todo-item>
    </div>
  `,
  methods: {
    markAs: function (todo) {
      this.$emit('mark', todo)
    }
  }
})

Vue.component('todo-item', todoItem)
Vue.component('todo-list', todoList)

const app = new Vue({
  el: '#app',
  data: {
    title: 'Front-end Showdown',
    filter: 'none',
    todos: [
      { id: 1, text: 'explain vue', done: true },
      { id: 2, text: 'write todo app', done: false },
      { id: 3, text: 'go to cavendish', done: false }
    ]
  },
  computed: {
    filteredTodos: function() {
      if (this.filter === 'complete') {
        return this.todos.filter(x => x.done).sort(byId)
      } else if (this.filter === 'incomplete') {
        return this.todos.filter(x => !x.done).sort(byId)
      } else {
        // no filter
        return this.todos.sort(byId)
      }
    }
  },
  methods: {
    markAs: function (todo) {
      this.todos.find(x => x.id === todo.id).done = todo.done
    },
    setFilter: function (filter) {
      this.filter = filter
    },
    addTodo: function (event) {
      event.preventDefault()
      const $form = event.target
      const $text = $form.querySelector('input[type="text"]')
      
      this.todos.push({
        id: this.todos.length + 1,
        text: $text.value,
        done: false
      })
      
      $text.value = ""
    }
  }
})
