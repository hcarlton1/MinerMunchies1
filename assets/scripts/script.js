function selCategory(itemCat){
    if(itemCat == 1){
        $('.item1').show();
        $('.item2').hide();
        $('.item3').hide();
        $('.item4').hide();
        $('.item5').hide();
        $('.item6').hide();
    }else if(itemCat == 2){
        $('.item1').hide();
        $('.item2').show();
        $('.item3').hide();
        $('.item4').hide();
        $('.item5').hide();
        $('.item6').hide();
    }else if(itemCat == 3){
        $('.item1').hide();
        $('.item2').hide();
        $('.item3').show();
        $('.item4').hide();
        $('.item5').hide();
        $('.item6').hide();
    }else if(itemCat == 4){
        $('.item1').hide();
        $('.item2').hide();
        $('.item3').hide();
        $('.item4').show();
        $('.item5').hide();
        $('.item6').hide();
    }else if(itemCat == 5){
        $('.item1').hide();
        $('.item2').hide();
        $('.item3').hide();
        $('.item4').hide();
        $('.item5').show();
        $('.item6').hide();
    }else if(itemCat == 6){
        $('.item1').hide();
        $('.item2').hide();
        $('.item3').hide();
        $('.item4').hide();
        $('.item5').hide();
        $('.item6').show();
    }else{
        $('.item1').show();
        $('.item2').show();
        $('.item3').show();
        $('.item4').show();
        $('.item5').show();
        $('.item6').show();
    }
}
$(document).ready(function(){
    $("button").click(function(){
        $("").remove();
    });
});
