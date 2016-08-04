var img_url = '';

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function LM() {
    var self = this;
    self.customers = ko.observableArray();
    self.activeCustomer = ko.observable();
    self.landingSize = ko.observable(2);

    self.createNewCustomer = function() {
        var name = dictionary.customersNames[randomInt(0, dictionary.customersNames.length-1)];
        var image = img_url;
        var newCustomer = new Customer(name, image);
        LM.customers.push(newCustomer);
    }
    self.selectCustomer = function(){
        this.state('in-progress');
        LM.activeCustomer(this);
    }

};
var LM = new LM();
ko.applyBindings(LM);


function deadlineCounter() {
    LM.customers().forEach(function(customer) {
        if(customer.deadline() > 0 && customer.state() === 'in-progress'){
            customer.deadline(customer.deadline() - customer.deadlineSpeed);
        }
    });
}
setInterval(deadlineCounter, 100)
