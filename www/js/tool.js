var src = 'data/tools/'

function Tool(initObj) {
    var self = this;

    self.name = initObj.name;
    self.displayName = initObj.displayName;
    self.image = initObj.image;
    self.avalibleAt = initObj.avalibleAt;

}

function saveGame() {

}

function initTools() {


    var tool = new Tool({
        name: 'copyWright',
        displayName: 'Копирайт',
        image: src + 'copywrite.png',
        avalibleAt: 1,
    });
    tool.game = function(cell, event) {
        console.log(event);
        var text = dictionary.copyWright;
        var target = event.target;
        var id = guid();
        var buffer = '';
        var increment = 0;

        $(target).append('<textarea class="copyWright ' + id + '"></textarea>')
        var textarea = $('.' + id)[0];
        $(textarea).focus();

        $(textarea).on("keypress", function() {
            buffer += text[increment];
            if (increment >= text.length - 1) {
                increment = 0;
            } else {
                increment++;
            }
            $(textarea).val(buffer);
        });
        $(textarea).on("keyup", function() {
            var val = $(textarea).val();
            val = val.substring(0, val.length - 1);
            var val = $(textarea).val(val);
        });

        var typing = function() {
            if ($(textarea).val().length > 20) {
                $(textarea).prop("disabled", true);

                $(textarea).append($(textarea).val());
                var customers = LM.customers()
                customers.forEach(function(customer) {
                    if (customer === LM.activeCustomer()) {
                        var landing = customer.landing();
                        landing.forEach(function(landing_cell, i, landing) {
                            if (landing_cell === cell) {
                                landing[i].applied.push('copyWright');
                                landing[i].DOM($(target)[0].innerHTML);
                            }
                        })
                    }
                })
                LM.isInGame(false);
                return true;
            } else {
                setTimeout(typing, 100);
            }
        }
        setTimeout(typing, 100);
    }
    LM.tools.push(tool);
}
