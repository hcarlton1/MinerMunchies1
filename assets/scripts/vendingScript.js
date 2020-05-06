function selCategory(itemCat){
  if(itemCat == 'All'){
    for(let x = 1; x <= 44; x++){
        var name = '.item' + x;
        $(name).show();
    }
  }
  else{
    for(let x = 1; x <= 44; x++){
      if(x==itemCat){
        var name = '.item' + x;
        $(name).show();
      }
      else{
      var name = '.item' + x;
      $(name).hide();
      }
    }
  }
}
$(document).ready(function(){
    $("button").click(function(){
        $("").remove();
    });
    selCategory(0);
});
