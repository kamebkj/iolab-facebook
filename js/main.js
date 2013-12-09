
// Set svg size and margin
var margin = {top: 100, right: 80, bottom: 80, left: 80},
    width = 960 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;
var distance_radius = 250;

// Initial variables for storing categories
var arrayTime = ["2013-Q1","2013-Q2","2013-Q3", "2013-Q4"];
var currentCategory = "relationship-like";
var currentTime = "2013-Q1";

// Add a slider 
var select = $( "#timerange" );
var slider = $( "<div id='slider'></div>" ).insertAfter( select ).slider({
  min: 0,
  max: 3,
  range: "min",
  value: 0,
  slide: function( event, ui ) {
    // select[ 0 ].selectedIndex = ui.value - 1;
    // console.log(ui.value);
    updateTime(arrayTime[ui.value]);
  }
});

// $( "#minbeds" ).change(function() {
//   slider.slider( "value", this.selectedIndex + 1 );
// });


// Start drawing
var svg = d3.select("#viz-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var feed = [];
var feedScale;
var user_feed = [];
var user_circle;
var friend_circle_g;
var friend_circle;
var friend_name;

var color = d3.scale.ordinal()
    .range(["#5790BE","#CA5D59"]) 
    .domain(["male","female"]);

// Add event listener
// $(".timerange").on("click", function(){
//   updateTime(this.id);
// });

$(".category").on("click", function(){
  updateCategory(this.id);
});

// First time loading
// firstTimeGraph();

// Update Functions
function updateTime(time_num) {
  // ex. currentTime = "2012-Q1";
  currentTime = time_num;
  updateGraph();
}

function updateCategory(category_num) {
  // ex. currentCategory = "relationship-like";
  currentCategory = category_num;
  updateGraph();
}


function firstTimeGraph() {

  // Normalize feed count to draw radius
  // Use feedScale() to normalize 
  feed = [];
  for (var i=0; i<arrayTime.length; i++) {
    // push user feedCount
    feed.push(all_data[currentCategory][arrayTime[i]]["user"].feedCount);
    // push friend feedCount
    for (var k=0; k<all_data[currentCategory][arrayTime[i]]["friends"].length; k++) {
      feed.push(all_data[currentCategory][arrayTime[i]]["friends"][k].feedCount);
    }
  }
  feedScale = d3.scale.linear()
    .domain([d3.min(feed), d3.max(feed)])
    .range([5,15]);

  // Create User circle data
  user_feed = [];
  user_feed.push(all_data[currentCategory][currentTime]["user"].feedCount);

  // Create Friend circle data
  // Normalize the size and distance of the circles
  // var friend_feed = [];
  // var friend_like = [];
  // var friend_comment = [];

  // for (var i=0; i<data[currentCategory][currentTime]["friend"].length; i++) {
  //   friend_feed.push(data[currentCategory][currentTime]["friend"][i].feedCount);
  //   friend_like.push(data[currentCategory][currentTime]["friend"][i].likeCount);
  //   friend_comment.push(data[currentCategory][currentTime]["friend"][i].commentCount);
  // };
  // friend_feed.push(data[currentCategory][currentTime]["user"].feedCount);

  // var feedScale = d3.scale.linear()
  //   .domain([d3.min(friend_feed), d3.max(friend_feed)])
  //   .range([5,20]);
  // var friendLikeScale = d3.scale.linear()
  //   .domain([d3.min(friend_like), d3.max(friend_like)])
  //   .range([150,300]);
  // var friendCommentScale = d3.scale.linear()
  //   .domain([d3.min(friend_comment), d3.max(friend_comment)])
  //   .range([150,300]);

  // Draw the circles
  // User circle
  user_circle = svg.selectAll("user_circle")
    .data(user_feed)
    .enter().append("circle")
    .attr({
      "cx": width/2,
      "cy": height/2,
      "r": function(d,i) {
        return feedScale(d);
      },
      "fill": function(d,i) {
        if (typeof all_data["user"].gender!=="undefined") return color(all_data["user"].gender);
        else return "#ccc";
      }
    });

  // Friend circles
  // currently use like only

  friend_circle_g = svg.selectAll("friend_circle_g")
    .data(all_data[currentCategory][currentTime]["friends"])
    .enter().append("g")
    // .attr("text-anchor", "middle")
    .attr({
      "transform": function(d,i) {
        var x = (distance_radius*(1-d.likeCount/user_feed[0])+2*feedScale(user_feed[0]))*Math.cos((Math.PI*2)/all_data[currentCategory][currentTime]["friends"].length*(i)) + width/2;
        var y = (distance_radius*(1-d.likeCount/user_feed[0])+2*feedScale(user_feed[0]))*Math.sin((Math.PI*2)/all_data[currentCategory][currentTime]["friends"].length*(i)) + height/2;
        var rotation = 360/all_data[currentCategory][currentTime]["friends"].length*(i);
        if (rotation>90 && rotation<270) {
          rotation = rotation+180;
          d3.select(this).style("text-anchor", "end");
        }
        return "translate("+x+","+y+") rotate("+rotation+")";
      }
    });
    // .on("mouseover", function(d,i) {
    //     d3.select(this).style("opacity",0.8);
    //     // console.log(d.name);
    // });
  friend_circle = friend_circle_g.append("circle")
    .attr({
      "cx": 0,
      "cy": 0,
      "r": function(d,i) {
        return feedScale(d.feedCount);
      },
      "fill": function(d,i) {
        if (typeof d.gender!=="undefined") return color(d.gender);
        else return "#ccc";
      }
    });

  friend_name = friend_circle_g.append("text")
    .attr({
      "x": function(d,i) {
        var rotation = 360/all_data[currentCategory][currentTime]["friends"].length*(i);
        if (rotation>90 && rotation<270) return -25;
        else return 25;
      },
      "y": 5,
      "fill": "#000",
    })
    .text(function(d,i) {
      return d.name;
    });
}


function updateGraph() {
  feed = [];
  for (var i=0; i<arrayTime.length; i++) {
    // push user feedCount
    feed.push(all_data[currentCategory][arrayTime[i]]["user"].feedCount);
    // push friend feedCount
    for (var k=0; k<all_data[currentCategory][arrayTime[i]]["friends"].length; k++) {
      feed.push(all_data[currentCategory][arrayTime[i]]["friends"][k].feedCount);
    }
  }
  feedScale = d3.scale.linear()
    .domain([d3.min(feed), d3.max(feed)])
    .range([5,20]);

  // Create User circle data
  user_feed = [];
  user_feed.push(all_data[currentCategory][currentTime]["user"].feedCount);


  // Draw the circles
  // User circle
  user_circle.data(user_feed)
    .enter().append("circle")
    .attr({
      "cx": width/2,
      "cy": height/2,
      "r": function(d,i) {
        return feedScale(d);
      },
      "fill": function(d,i) {
        if (typeof all_data["user"].gender!=="undefined") return color(all_data["user"].gender);
        else return "#ccc";
      }
    });

  user_circle.transition()
    .duration(400)
    .attr({
      "cx": width/2,
      "cy": height/2,
      "r": function(d,i) {
        return feedScale(d);
      }
    });

  // Friend circles
  // currently use like only

  friend_circle_g.data(all_data[currentCategory][currentTime]["friends"])
    .enter().append("g")
    .attr({
      "transform": function(d,i) {
        var x = (distance_radius*(1-d.likeCount/user_feed[0])+2*feedScale(user_feed[0]))*Math.cos((Math.PI*2)/all_data[currentCategory][currentTime]["friends"].length*(i)) + width/2;
        var y = (distance_radius*(1-d.likeCount/user_feed[0])+2*feedScale(user_feed[0]))*Math.sin((Math.PI*2)/all_data[currentCategory][currentTime]["friends"].length*(i)) + height/2;
        var rotation = 360/all_data[currentCategory][currentTime]["friends"].length*(i);
        if (rotation>90 && rotation<270) {
          rotation = rotation+180;
          d3.select(this).style("text-anchor", "end");
        }
        return "translate("+x+","+y+") rotate("+rotation+")";
      }
    });
    // .on("mouseover", function(d,i) {
    //     d3.select(this).style("opacity",0.8);
    //     // console.log(d.name);
    // });

  friend_circle = friend_circle_g.selectAll("circle")
    .data(function(d,i) { return d; });
  friend_circle.exit().transition(400)
    .attr("r",0)
    .remove();
  friend_circle = friend_circle_g.append("circle");
  friend_circle.attr({
    "fill": function(d,i) {
      if (typeof d.gender!=="undefined") return color(d.gender);
      else return "#ccc";
    }
  });
  friend_circle.transition()
    .duration(400)
    .attr({
      "cx": 0,
      "cy": 0,
      "r": function(d,i) {
        return feedScale(d.feedCount);
      }
    });


  // Transition
  friend_circle_g.transition()
    .duration(400)
    .attr({
      "transform": function(d,i) {
        var x = (distance_radius*(1-d.likeCount/user_feed[0])+2*feedScale(user_feed[0]))*Math.cos((Math.PI*2)/all_data[currentCategory][currentTime]["friends"].length*(i)) + width/2;
        var y = (distance_radius*(1-d.likeCount/user_feed[0])+2*feedScale(user_feed[0]))*Math.sin((Math.PI*2)/all_data[currentCategory][currentTime]["friends"].length*(i)) + height/2;
        var rotation = 360/all_data[currentCategory][currentTime]["friends"].length*(i);
        if (rotation>90 && rotation<270) {
          rotation = rotation+180;
          d3.select(this).style("text-anchor", "end");
        }
        return "translate("+x+","+y+") rotate("+rotation+")";
      }
    });

}
