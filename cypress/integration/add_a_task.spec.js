

describe('Todo App', () => {
    it('Test one - visit todo', () =>{
        cy.visit('/');
    });

    it('Test two- Checks all butttons and texts are available or not', () => {
        cy.contains('TodoMatic');
        cy.contains('What needs to be done?');
        cy.contains('Completed').click();
        cy.contains('Active').click();
        cy.contains('All').click();
    });

    it('Test three - check for default tasks',() => {
        cy.get('#todo-list-items li').should('have.length', 3);
        cy.get('#todo-list-items li').first().contains('Eat');
        cy.get('#todo-list-items li').contains('Sleep');
        cy.get('#todo-list-items li').last().contains('Repeat');


    });

    it('Test four - add a new task',() => {
        const taskToBeAdded = 'Neev training';
        //type the text into DOM element - new todo input
        cy.get('#new-todo-input').type(taskToBeAdded);
        cy.get('#btn-add').click();
        
    });

    it('Test five - update an existing task', () => {
        const btnEdit = cy.get('#btnEdit').first().click();
        const taskToBeEdited = cy.get('.todo-text').first();
        taskToBeEdited.type("Finish TDD");
        cy.get('#btnSave').first().click();

        //check if task updated or not
        cy.get('#todo-list-items li').should('have.length', 4);
        cy.get('#todo-list-items li').first().contains('Finish TDD');
        cy.contains('Eat').should('not.exist'); 

    });

    it('Test six - delete an existing task',() => {
        cy.get('.btn__danger').last().click();

        //check if deleted or not
        cy.get('#todo-list-items li').should('have.length', 3);
        cy.contains('Neev training').should('not.exist'); 
    });
    
    it('Test seven - check for cancel button functionality', () => {
        const btnEdit = cy.get('#btnEdit').first().click();
        const taskToBeEdited = cy.get('.todo-text').first();
        taskToBeEdited.type("Finish TDD React");
        cy.get('.todo-cancel').click();

        //check if everything same as previous
        cy.get('#todo-list-items li').should('have.length', 3);
        cy.contains('Finish TDD React').should('not.exist'); 
    });

    it('Test eight - check for all active tasks', () => {
        cy.contains('Active').click();
        cy.get('.c-cb').should('have.length',2);
        cy.get('.c-cb').first().should('contain','Sleep');
        cy.get('.c-cb').last().should('contain','Repeat');
        
    });

    it('Test nine - check for all completed tasks', () => {
        cy.contains('Completed').click();
        cy.get('.c-cb').should('have.length',1);
    });

    it('Test ten - task count in each filter', () => {
        cy.contains('All').click();
        cy.get('#list-heading').contains(3);

        cy.contains('Active').click();
        cy.get('#list-heading').contains(2);

        cy.contains('Completed').click();
        cy.get('#list-heading').contains(1);

    });

});