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
    var src = 'data/tools/';
    var tool;

    tool = new Tool({
        name: 'copyWright',
        displayName: 'Копирайт',
        image: src + 'copywrite.png',
        avalibleAt: 1,
    });
    tool.game = function (cell, event) {
        console.log(event);
        var target = event.target;
        var id = guid();
        var text = dictionary.copyWright;
        var buffer = '';
        var increment = 0;

        $(target).append('<textarea class="copyWright ' + id + '"></textarea>')
        var textarea = $('.' + id)[0];
        $(textarea).focus();

        $(textarea).on("keypress", function (e) {
            e.preventDefault()
            buffer += text[increment];
            if (increment >= text.length - 1) {
                increment = 0;
            } else {
                increment++;
            }
        });
        $(textarea).on("keyup", function () {
            var val = $(textarea).val();
            val = val.substring(0, val.length - 1);
            var val = $(textarea).val(buffer);

            if (buffer.length > 20) {
                $(textarea).prop("disabled", true);
                $(textarea).append($(textarea).val());

                var landing = LM.activeCustomer().landing();
                landing.forEach(function (landing_cell, i, landing) {
                    if (landing_cell === cell) {
                        landing[i].applied.push('copyWright');
                        landing[i].DOM($(target)[0].innerHTML);
                    }
                })

                LM.isInGame(false);
            }
        });
    }
    LM.tools.push(tool);



    tool = new Tool({
        name: 'addImages',
        displayName: 'Добавить картинок',
        image: src + 'addimage.png',
        avalibleAt: 1,
    });
    tool.game = function (cell, event) {
        var target = event.target;
        var id = guid();
        var imgSrc = "data/img/rndmImages/"
        var imgNumber = 1;
        var spacePressed = false;
        var xCounter = 0;
        var X = 0;



        $(target).append('<div class="addImages ' + id + '"></div>')
        var div = $('.' + id)[0];
        $(div).append('<div class="left"><div class="left-conteiner"></div></div>');
        $(div).append('<div class="middle"><div class="middle-conteiner"></div></div>');
        $(div).append('<div class="right"><div class="right-conteiner"></div></div>');

        // var addImage = function (align) {
        //     console.log(align);
        //     if (img) {
        //         if (spacePressed) {
        //             img = null;
        //             spacePressed = false;
        //             return true;
        //         } else {
        //             xCounter += 0.2
        //             X = Math.sin(xCounter);
        //             $(img).css('left', X * 150);
        //             setTimeout(addImage, 50);
        //         }
        //     } else {
        //
        //     }
        // }
        let timer_mover

        function moveImage(img) {
            // console.log(img);
            if (spacePressed) {
                return
            }
            img.xPos = img.xPos >= 359 ? 0 : img.xPos + 0.2
            let X = Math.sin(img.xPos);
            $(img).css('left', X * 150);
            timer_mover = setTimeout(() => {moveImage(img)}, 50);
        }


        function addImage(align) {
            $('.' + id + ' .' + align + '-conteiner').append('<img class="target-img-' + align + '" src="' + imgSrc + randomInt(1, 8) + '.jpg' + '"></img>')
            img = $('.' + id + ' .target-img-' + align)[0];
            $(img).css('left', 0);
            img.xPos = 0
            img.accuracy = 0
            spacePressed = false
            timer_mover = setTimeout(() => {moveImage(img)}, 50);
            return new Promise((resolve, reject) => {
                $(window).bind("keypress", function (e) {
                    if (e.keyCode === 0 || e.keyCode === 32) {
                        img.accuracy = Math.abs(Math.sin(img.xPos))
                        console.log(img.accuracy);
                        e.preventDefault()
                        clearTimeout(timer_mover);
                        $(this).unbind(e);
                        resolve(img);
                    }
                });
            })
        }
        async function placeAllimages() {
            let leftImg = await addImage('left')
            let middleImg = await addImage('middle')
            let rightImg = await addImage('right')
            let satisfaction = (leftImg.accuracy + middleImg.accuracy + rightImg.accuracy) / 3
            console.log(satisfaction);
            LM.isInGame(false);
        }
        placeAllimages()

    }
    LM.tools.push(tool);
}
