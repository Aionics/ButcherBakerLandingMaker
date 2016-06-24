function Customer(name, image){
    this.name = name;
    this.image = image;
    this.consist = 'new';
}

function viewModel() {
    var self = this;
    self.customers = ko.observableArray();

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
    self.changeCustomerConsist = function() {
        this.consist = 'in-progress';
        self.refreshArray();
    }
};
ko.applyBindings(new viewModel());
