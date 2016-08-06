function generateWishes() {
    var amountWishes = 2;
    var _wishes = [];
    while (_wishes.length < amountWishes) {
        var wish = dictionary.wishes[randomInt(0, dictionary.wishes.length - 1)];
        var isInArray = false;
        _wishes.forEach(function(_wish){
            if(wish.id == _wish.id){
                isInArray = true;
            }
        })
        if (!isInArray) {
            _wishes.push(wish);
        }
    }
    return _wishes;
}

function Customer(initObj){
    var self = this;

    self.name = initObj.name;
    self.image = initObj.image;
    self.state = ko.observable('new');
    self.deadline = ko.observable(100);
    self.deadlineSpeed = randomInt(1,20)/20;

    self.wishes = generateWishes();
    self.satisfy = ko.observable(0);

    var Arr = [];
    for(var i = 0; i < LM.landingSize(); i++) {
        Arr[i] = new Landing_cell();
    }
    self.landing = ko.observableArray(Arr);

}
