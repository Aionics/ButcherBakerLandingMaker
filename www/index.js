var img_url = '';

function guid() {
    var s4 = function() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + '-' + s4() + s4();
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function LM() {
    var self = this;
    self.customers = ko.observableArray();
    self.activeCustomer = ko.observable();
    self.landingSize = ko.observable(2);
    self.tools = ko.observableArray()
    self.selectedTool = ko.observable('none');


    self.createNewCustomer = function() {
        var name = dictionary.customersNames[randomInt(0, dictionary.customersNames.length - 1)];
        var image = img_url;
        var newCustomer = new Customer({
            name: name,
            image: image
        });
        LM.customers.push(newCustomer);
    }
    self.selectCustomer = function() {
        this.state('in-progress');
        LM.activeCustomer(this);
    }
    self.selectTool = function() {
        LM.selectedTool(this);
    }
    self.startGame = function(cell, event) {
        if (LM.selectedTool() != 'none') {
            LM.selectedTool().game(cell, event);
            LM.selectedTool('none');
        }
    }

};
var LM = new LM();
ko.applyBindings(LM);


function deadlineCounter() {
    LM.customers().forEach(function(customer) {
        if (customer.deadline() > 0 && customer.state() === 'in-progress') {
            customer.deadline(customer.deadline() - customer.deadlineSpeed);
        }
    });
}

function ready() {
    initTools();
}

document.addEventListener("DOMContentLoaded", ready);
setInterval(deadlineCounter, 100)
