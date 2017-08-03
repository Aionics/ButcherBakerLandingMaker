var img_url = '';

function guid() {
    var s4 = function () {
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
    self.selectedTool = ko.observable(null);
    self.isInGame = ko.observable(false);


    self.createNewCustomer = function () {
        var name = dictionary.customersNames[randomInt(0, dictionary.customersNames.length - 1)];
        var image = img_url;
        var newCustomer = new Customer({
            name: name,
            image: image
        });
        LM.customers.push(newCustomer);
    }
    self.selectCustomer = function () {
        if (LM.selectedTool() == null && LM.isInGame() == false) {
            this.state('in-progress');
            LM.activeCustomer(this);
        }
    }
    self.selectTool = function () {
        LM.selectedTool(this);
    }
    self.startGame = function (cell, event) {
        if (LM.selectedTool() != null) {
            LM.isInGame(true);
            LM.selectedTool().game(cell, event);
            LM.selectedTool(null);
        }
    }
    self.calculateSatisfy = function () {
        var satisfy = 0;
        var toolsUsed = [];
        LM.activeCustomer().landing().forEach(function (cell) {
            cell.applied().forEach(function (tool) {
                // if(toolsUsed.indexOf(tool) === -1){
                toolsUsed.push(tool);
                // }
            })
        })

        LM.activeCustomer().wishes.forEach(function (wish) {
            var val = 0;
            var _tool = null;

            toolsUsed.forEach(function (tool) {
                if (wish.satisfy[tool]) {
                    if (val < wish.satisfy[tool]) {
                        val = wish.satisfy[tool];
                        _tool = tool;
                    }
                }
            })

            toolsUsed.splice(toolsUsed.indexOf(_tool), 1);
            satisfy += val;
        })
        LM.activeCustomer().satisfy(satisfy);
    }

};
var LM = new LM();
ko.applyBindings(LM);


function deadlineCounter() {
    LM.customers().forEach(function (customer) {
        if (customer.deadline() > 0 && customer.state() === 'in-progress') {
            customer.deadline(customer.deadline() - 1);
        }
    });
}

function ready() {
    initTools();
}

document.addEventListener("DOMContentLoaded", ready);
setInterval(deadlineCounter, 100)
