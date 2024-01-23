new Vue({
    el: '#app',
    data() {
      return {
        plannedTasks: [],
        inProgressTasks: [],
        testingTasks: [],
        completedTasks: [],
        newCardTitle: '',
        newCardDescription: '',
        newCardDeadline: ''
      };
    },
    mounted() {
      this.loadTasksFromStorage();
    },
    watch: {
      plannedTasks: { handler: 'saveTasksToStorage', deep: true },
      inProgressTasks: { handler: 'saveTasksToStorage', deep: true },
      testingTasks: { handler: 'saveTasksToStorage', deep: true },
      completedTasks: { handler: 'saveTasksToStorage', deep: true }
    },
    methods: {
      addCard() {
        const newCard = {
          id: Date.now(),
          title: this.newCardTitle,
          description: this.newCardDescription,
          deadline: this.newCardDeadline,
          lastEdited: new Date().toLocaleString(),
          returnReason: ''
        };
  
        this.plannedTasks.push(newCard);
        this.clearForm();
      },
      validateDate() {
        const dateInput = document.querySelector('input[type="date"]');
        const enteredDate = dateInput.value;
        
        if (isNaN(Date.parse(enteredDate))) {
          console.log('Ошибка! Неправильная дата.');
        }
      },
    }
})