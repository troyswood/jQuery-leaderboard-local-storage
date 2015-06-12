
var $$ = {
  storeData: function() {
    localStorage["karma.data"] = JSON.stringify(this.data);
  },
  readData: function() {
    this.data = JSON.parse(localStorage["karma.data"]);
  },
  leaderboard: function() {
    return this.data.sort(this.compare);
  },
  compare: function(a, b) {
    return b.points - a.points;
  },
  // modifyPointsFor(0, 2);
  modifyPointsFor: function(indexInArray, newPoints) {
    this.data[indexInArray].points = newPoints;
    this.storeData();
    this.cloner();
  },
  cloner: function() {
    $("#ppl").empty();
    var sorted = $$.leaderboard();
    var $template = $(".person:first"),
      $clonedLi;
    var ppl = sorted.map(function(p, i) {
      $clonedLi = $template.clone().show();
      $clonedLi.data("order", i);
      $clonedLi.find(".name").text(p.name);
      $clonedLi.find(".points").text(p.points);
      $clonedLi.find("input").val(p.points);
      return $clonedLi;
    });

    $("#ppl").append(ppl);

  },
  eventHandler: function() {
    $("#ppl").on("dblclick", ".points", function(event) {
      $(this).hide();
      $(this).parent(".person").find(".input").show(); //problem
    }).on("keyup", "input", function(event) {
      if (event.which === 13) {
        var person = $(this).parents(".person");
        var personIndex = person.data("order"); //problem
        var newVal = $(this).val();
        $$.modifyPointsFor(personIndex, newVal);
        $(this).parent().prev(".points").text(newVal); //problem
        $(this).parent().hide(); //problem
        $(".points").show();

      }
    });

  },

  data: []
}

$(document).ready(function() {
  $$.readData();
  $$.cloner();
  $$.eventHandler();
})