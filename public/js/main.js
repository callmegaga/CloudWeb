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
})