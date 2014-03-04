var Schedule = Backbone.Model.extend({
   idAttribute:"Schedule_id"
});

var Schedules = Backbone.Collection.extend({
    model: Schedule,
    url: "/schedule/week/1/"
});

var tpl = 
    ["<div class='schedule' id='schedule_<%= Schedule_id %>'>",
        "<p><%= Game_Date %> <%= Game_Time %> <span><%= Status %></span></p>",
        "<div class='scoreTable'>",
            "<h2><%= HomeTeam._ %></h2>",
            "<h2 class='score'><%= HScore %></h2>",
            "<h2 class='score'><%= AScore %></h2>",
            "<h2 class='end'><%= AwayTeam._ %></h2>",
            "<div style='clear:both;'></div>",
        "</div>",
    "</div>"].join("\n");
var week = 0;
var scheduleRow = Backbone.View.extend({
   template: _.template(tpl),
   render: function() {
       var me = this
       if(week == 0){
           $("body").append("<h1 class='loading'>Loading</h1>");
       }else{
           $(".loading").hide();
           $("body").append("<h1>Week "+week+" NFL Scores</h1>");
           $.each(this.collection.models, function(key, value){
           var d = new Date(value.attributes.Game_Date);
           //this was the easiest way to date format without calling some jquery date formatting plugin
           value.attributes.Game_Date = d.toDateString();
          $("body").append(me.template(value.attributes));
       });
       }
       
       //this.$el.html(this.template(this.model.attributes));
       week++;
        return this;
   }
});

window.schedules = new Schedules;
window.view = new scheduleRow({collection: schedules});

scheduleRefresh();

setInterval(scheduleRefresh,5000);

//schedules.on("add", function(e){
  //setTimeout(scheduleRefresh,5000);
//});

function scheduleRefresh(){
    schedules.fetch();
    view.render();
    console.log("refreshed")
    console.log(schedules);
}
