var arrayCustomers = [];
var varActiveCustomer;
var test = {};
test.name = '50%'

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function Customer(name, image){
    this.name = dictionary.customersNames[randomInt(0, dictionary.customersNames.length-1)];
    this.image = image;
    this.consist = 'new';
    this.deadline = randomInt(50,100);
}

function viewModel() {
    var self = this;
    self.customers = ko.observableArray(arrayCustomers);
    self.activeCustomer = ko.observable(new Customer('Vasya', 1)).extend({notify: 'always'});

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
        varActiveCustomer =this;
        self.activeCustomer(varActiveCustomer);
        console.log(this.deadline);
        self.refreshArray();
    }
};
var vm = new viewModel();
ko.applyBindings(vm);

function deadlineCounter() {
    arrayCustomers.forEach(function(value, key, arr) {
        if (value.deadline > 0 && value.consist == 'in-progress')
            arr[key].deadline = value.deadline - 0.1;
            if(value === vm.activeCustomer()){
                vm.activeCustomer(varActiveCustomer).deadline = value.deadline;
            }
    });
}
console.log('timer');
setInterval(deadlineCounter, 100)
