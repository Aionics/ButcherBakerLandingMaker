function Customer(name, image){
    var self = this;

    self.name = ko.observable(name);
    self.image = ko.observable(image);
    self.state = ko.observable('new');
    self.deadline = ko.observable(100);
    self.deadlineSpeed = randomInt(1,20)/20;

}