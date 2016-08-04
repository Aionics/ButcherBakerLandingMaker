function Tool(name, image){
    var self = this;

    self.name = ko.observable(name);
    self.image = ko.observable(image);

}
