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
      editCard(card) {
        const newTitle = prompt('Введите новое название',   card.title);
        if (newTitle) {
            card.title = newTitle;
          }
    
          const newDescription = prompt('Введите новое описание', card.description);
          if (newDescription) {
            card.description = newDescription;
          }
    
          card.lastEdited = new Date().toLocaleString();
        },
        deleteCard(card) {
          const confirmDelete = confirm('Вы уверены, что хотите удалить карточку?');
          if (confirmDelete) {
            if (this.plannedTasks.includes(card)) {
              this.plannedTasks.splice(this.plannedTasks.indexOf(card), 1);
            } else if (this.inProgressTasks.includes(card)) {
              this.inProgressTasks.splice(this.inProgressTasks.indexOf(card), 1);
            } else if (this.testingTasks.includes(card)) {
              this.testingTasks.splice(this.testingTasks.indexOf(card), 1);
            } else if (this.completedTasks.includes(card)) {
              this.completedTasks.splice(this.completedTasks.indexOf(card), 1);
            }
          }
        },
        moveToInProgress(card) {
          this.plannedTasks.splice(this.plannedTasks.indexOf(card), 1);
          this.inProgressTasks.push(card);
        },
        moveToTesting(card) {
          this.inProgressTasks.splice(this.inProgressTasks.indexOf(card), 1);
          this.testingTasks.push(card);
        },
        moveToCompleted(card) {
          this.testingTasks.splice(this.testingTasks.indexOf(card), 1);
          this.completedTasks.push(card);
          card.completed = true;
        },
        returnToProgress(card) {
            const returnReason = prompt('Введите причину возврата', '');
            if (returnReason) {
              card.returnReason = returnReason;
              if (this.testingTasks.includes(card)) {
                this.testingTasks.splice(this.testingTasks.indexOf(card), 1);
              } else if (this.completedTasks.includes(card)) {
                this.completedTasks.splice(this.completedTasks.indexOf(card), 1);
              }
              this.inProgressTasks.push(card);
            }
          },
        isDeadlineExpired(date) {
          const deadline = new Date(date);
          const today = new Date();
          return deadline < today;
        },
        saveTasksToStorage() {
            const tasks = {
              plannedTasks: this.plannedTasks,
              inProgressTasks: this.inProgressTasks,
              testingTasks: this.testingTasks,
              completedTasks: this.completedTasks
            };
            localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
          },
          loadTasksFromStorage() {
            const tasks = JSON.parse(localStorage.getItem('kanbanTasks'));
            if (tasks) {
              this.plannedTasks = tasks.plannedTasks;
              this.inProgressTasks = tasks.inProgressTasks;
              this.testingTasks = tasks.testingTasks;
              this.completedTasks = tasks.completedTasks;
            }
          },
          clearForm() {
            this.newCardTitle = '';
            this.newCardDescription = '';
            this.newCardDeadline = '';
          }
        }
      });
