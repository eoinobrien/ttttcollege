var json = (function() {
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "assets/data.json",
    'dataType': "json",
    'success': function (data) {
      json = data;
      console.log("Got JSON");
    }
  });
  return json;
})();

var transforms = {
  "mainList" : [
  {"tag":"div","class":"item col-lg-3 col-md-4 col-sm-6 col-xs-12","children":[
  {"tag":"div","class":"panel panel-default","children":[
  {"tag":"div","class":"panel-heading","html":"${title}"},
  {"tag":"ul","class":"list-group","children":function() {return(json2html.transform(this.items,transforms.itemsList))}
}
]}
]}
],

"itemsList" : [
{"tag":"li","class":"list-group-item","children":[
{"tag":"label","class":"list-label", "html":"<input type='checkbox' class='list-check'> <span>${title}</span>"}
]}
]
};

$('#list').json2html(json, transforms.mainList);

var $container = $('#list');
// initialize
$container.masonry({
  itemSelector: '.item'
});

var numItems = $('.list-check').size();
console.log("num Items" + numItems);

$('input.list-check').click(function() {
  var numItemsChecked = $(":checkbox:checked").length;
  console.log("num Items Checked" + numItemsChecked);
  var progress = 100 - (numItemsChecked/numItems * 100);
  console.log("progress" + progress);
  $("#progress").css({ right: progress + "%"});
  if (this.checked) {
    //alert('Checked');
    $(this).next("span").addClass('label-strike');
  } else {
    //alert('Unchecked');
    $(this).next("span").removeClass('label-strike');
  }
});

var numItemsChecked = $('.list-check :checked').size();
