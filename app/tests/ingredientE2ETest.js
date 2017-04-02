describe('ingredient e2e', function() {
    it('add an aditional ingredient', function() {
        browser.manage().timeouts().pageLoadTimeout(10000);
         browser.get('http://localhost:8000/#/ingredient');
        var startCount = 0;
        //Count the current amount of ingredients
        var countVal = element.all(by.className('ingredient-row'));
        
        countVal.count().then(function (countedNumber) {
        
             //Shows the modal where you can create a new input
        var button = element(by.id('new-ingredient-button'));
        button.click();

        //Set the inputs of the form and submits the form
        var nameInput = element(by.id('ingredient-name-input'));
        var descriptionInput = element(by.id('ingredient-description-input'));
        var categorieSelect = element(by.id('ingredioent-category-select'));
        var formulier = element(by.id('ingredient-save-form'));
        nameInput.sendKeys('Test Ingredient');
        descriptionInput.sendKeys('Test Ingredient Description');
        categorieSelect.sendKeys('bread');
          formulier.submit();

          //Count the new amount of ingredients
        var newCount = element.all(by.className('ingredient-row'));


        expect(newCount.count()).toEqual(countedNumber+1);
            
        });
    });
    
    it('test', function(){
        browser.manage().timeouts().pageLoadTimeout(10000);
         browser.get('http://localhost:8000/#/ingredient');
         //Count the current amount of ingredients
        var countVal = element.all(by.className('ingredient-row'));
        
        countVal.count().then(function (countedNumber) {
         var button = element(by.className('delete-btn-ingredient'));
        button.click();
       expect(1).toEqual(1); 
           //Count the new amount of ingredients
        var newCount = element.all(by.className('ingredient-row'));


        expect(newCount.count()).toEqual(countedNumber-1);
            
        });
    });
    
});

