function Customer(initObj){
    var self = this;

    self.name = initObj.name;
    self.image = initObj.image;
    self.state = ko.observable('new');
    self.deadline = ko.observable(100);
    self.deadlineSpeed = randomInt(1,20)/20;

    var Arr = [];
    for(var i = 0; i < LM.landingSize(); i++) {
        Arr[i] = new Landing_cell();
    }
    self.landing = ko.observableArray(Arr);

}
