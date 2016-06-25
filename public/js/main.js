var arrayCustomers = [];

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function Customer(name, image){
    this.name = dictionary.customersNames[randomInt(0, dictionary.customersNames.length-1)];
    this.image = image;
    this.consist = 'new';
    this.deadline = randomInt(500,1000);
}

function viewModel() {
    var self = this;
    self.customers = ko.observableArray(arrayCustomers);
    self.activeCustomer = ko.observableArray();

    self.refreshArray = function(){
        var data = self.customers().slice(0);
        self.customers([]);
        self.customers(data);
    };
    self.createNewCustomer = function() {
        console.log(1);
        var newCustomer = new Customer('Vasya', 1);
        self.customers.push(newCustomer);
    }
    self.selectCustomer = function(){
        this.consist = 'in-progress';
        self.activeCustomer = this;
        self.refreshArray();
    }
};
ko.applyBindings(new viewModel());

function deadlineCounter() {
    arrayCustomers.forEach(function(value, key, arr) {
        if (value.deadline > 0 && value.consist == 'in-progress')
            arr[key].deadline = value.deadline - 1;
    });
}
setInterval( deadlineCounter , 100)
