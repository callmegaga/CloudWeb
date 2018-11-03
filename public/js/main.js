$(".condition").on("click", ".select", function (e) {
    if($(e.target)[0].nodeName == "DIV"){
        if ($(this).children(".options").hasClass("hide")){
            $(".condition .options").addClass("hide");
            $(this).children(".options").removeClass("hide")
        }else {
            $(this).children(".options").addClass("hide")
        }
    }else if ($(e.target)[0].nodeName == "LI"){
        $(this).find("li").removeClass("active");
        $(e.target).addClass("active");
        $(this).children(".options").addClass("hide")
    }
});

$(".options-time").on("click", "li", function (e) {
    switch ($(this).data("value")) {
        case "last-30":

            break;
        case "last-90":

            break;
        case "last-180":

            break;
        case "last-365":

            break;
        case "custom":
            $(".custom-time-select").removeClass("hide");
            break;
    }
});
$(".options-city").on("click", "li", function (e) {

});
$(".options-type").on("click", "li", function (e) {

});
$(".options-light").on("click", "li", function (e) {

});
$(".options-show").on("click", "li", function (e) {

});

$(function () {
    $('.J-datepickerTime-range').datePicker({
        format: 'YYYY-MM-DD HH:mm',
        isRange: true,
        hasShortcut: true,
        shortcutOptions:  [{
            name: '最近一周',
            day: '-7,0'
        }, {
            name: '最近一个月',
            day: '-30,0'
        }, {
            name: '最近三个月',
            day: '-90, 0'
        }],
        hide:function () {
            console.info(this.$input.eq(0).val(), this.$input.eq(1).val())
        }
    });
});
