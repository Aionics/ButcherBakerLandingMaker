function Customer(name, image){
    var self = this;

    self.name = ko.observable(name);
    self.image = ko.observable(image);
    self.state = ko.observable('new');
    self.deadline = ko.observable(100);
    self.deadlineSpeed = randomInt(1,20)/20;

    var Arr = [];
    for(var i = 0; i < LM.landingSize(); i++) {
        Arr[i] = new Landing_cell();
    }
    self.landing = ko.observableArray(Arr);

}
