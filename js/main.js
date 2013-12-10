
// Set svg size and margin
var margin = {top: 100, right: 80, bottom: 80, left: 80},
    width = 960 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var distance_radius = 250;
var background_radius = [50,100,150,200,250];
var instance_radius_min = 5;
var instance_radius_max = 15;

// Initial variables for storing categories
var arrayTime = ["2013-Q1","2013-Q2","2013-Q3", "2013-Q4"];
var currentCategory = "relationship-like";
var currentTime = 0;

// Add a slider
var select = $( "#timerange" );
var slider = $( "<div id='slider' style='display:none;'></div>" ).insertAfter( select ).slider({
  min: 0,
  max: 3,
  // range: "min",
  value: 0,
  slide: function( event, ui ) {
    updateTime(ui.value);
  }
});


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
var friend_history_circle_g;
var friend_history_circle;
var friend_circle_g;
var friend_circle;
var friend_name;

var color = d3.scale.ordinal()
    .range(["#5790BE","#CA5D59"])
    .domain(["male","female"]);

var colorStroke = d3.scale.ordinal()
    .range(["#1C507C","#83201D"]) 
    .domain(["male","female"]);

// Create tooltips for hover use
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Add event listener
// $(".timerange").on("click", function(){
//   updateTime(this.id);
// });
// $(".category").on("click", function(){
//   updateCategory(this.id);
// });

// First time loading
// initialize();
// drawHistoryCircles();
// firstTimeGraph();



// Update Functions
function updateTimeForArray(time_num) {
  // console.log($(this));
  return function() {
    // console.log("bkj");
    // console.log(time_num);
    updateTime(time_num);
    slider.slider("value",time_num);
  }
}

function updateTime(time_num) {
  currentTime = time_num;
  updateGraph();
}

function updateCategory(category_num) {
  currentCategory = category_num;
  updateGraph();
}


// Drawing functions

function initialize() {

  // Add radar background
  background_circle = svg.selectAll("background_circle")
    .data(background_radius)
    .enter().append("circle")
    .attr({
      "cx": width/2,
      "cy": height/2,
      "r": function(d,i) {
        return d;
      },
      "stroke": "#ccc",
      "fill": "none"
    });


  // Normalize feed count to draw radius
  // Create function feedScale() to Normalize
  for (var i=0; i<arrayTime.length; i++) {
    user_feed.push(all_data[currentCategory][arrayTime[i]]["user"].feedCount);
    // push user feedCount
    feed.push(all_data[currentCategory][arrayTime[i]]["user"].feedCount);
    // push friend feedCount
    for (var k=0; k<all_data[currentCategory][arrayTime[i]]["friends"].length; k++) {
      feed.push(all_data[currentCategory][arrayTime[i]]["friends"][k].feedCount);
    }
  }
  feedScale = d3.scale.linear()
    .domain([d3.min(feed), d3.max(feed)])
    .range([instance_radius_min,instance_radius_max]);
}

function drawHistoryCircles() {
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
        return "#eee";
      }
    });

  // Friend circle
  for (var k=0; k<arrayTime.length; k++) {
    friend_history_circle_g = svg.selectAll("friend_history_circle_g")
      .data(all_data[currentCategory][arrayTime[k]]["friends"])
      .enter().append("g")
      .attr({
        "transform": function(d,i) {
          var x = (distance_radius*(1-d.likeCount/user_feed[k]))*Math.cos((Math.PI*2)/all_data[currentCategory][arrayTime[k]]["friends"].length*(i)) + width/2;
          var y = (distance_radius*(1-d.likeCount/user_feed[k]))*Math.sin((Math.PI*2)/all_data[currentCategory][arrayTime[k]]["friends"].length*(i)) + height/2;
          var rotation = 360/all_data[currentCategory][arrayTime[k]]["friends"].length*(i);
          if (rotation>90 && rotation<270) {
            rotation = rotation+180;
            d3.select(this).style("text-anchor", "end");
          }
          return "translate("+x+","+y+") rotate("+rotation+")";
        }
      });
    // console.log(friend_history_circle_g)
    friend_history_circle = friend_history_circle_g.append("circle")
      .attr({
        "cx": 0,
        "cy": 0,
        "r": function(d,i) {
          return feedScale(d.feedCount);
        },
        "fill": function(d,i) {
          return "#eee";
        }
      })
      .on("click", updateTimeForArray(k))
      .on("mouseover", function(d,i) {
        d3.select(this).style("opacity",0.4);
        d3.select(this).style("cursor", "pointer");
      })
      .on("mouseout", function(d,i) {
        d3.select(this).style("opacity",1.0);
      });
  }
}

function firstTimeGraph() {

  // Draw the circles
  // User circle
  user_circle = svg.selectAll("user_circle")
    .data([user_feed[currentTime]])
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
      },
      "stroke": function(d,i) {
        if (typeof all_data["user"].gender!=="undefined") return colorStroke(all_data["user"].gender);
        else return "#ccc";
      },
      "stroke-width": "2px"
    })
    .on("mouseover", function(d,i) {
      d3.select(this).style("opacity",0.6);
      d3.select(this).style("cursor", "pointer");
      tooltip.transition()
        .duration(200)
        .style("opacity", 0.95);
      tooltip.html(all_data["user"].name+"<br/>"+"Feed: "+d)
        .style("left", (d3.event.pageX)+"px")
        .style("top", (d3.event.pageY - 20)+"px")
    })
    .on("mouseout", function(d,i) {
      d3.select(this).style("opacity",1.0);
      tooltip.transition()
        .duration(200)
        .style("opacity", 0);
    });

  // Friend circles, currently use like only
  friend_circle_g = svg.selectAll("friend_circle_g")
    .data(all_data[currentCategory][arrayTime[currentTime]]["friends"])
    .enter().append("g")
    .attr({
      "transform": function(d,i) {
        var x = (distance_radius*(1-d.likeCount/user_feed[currentTime]))*Math.cos((Math.PI*2)/all_data[currentCategory][arrayTime[currentTime]]["friends"].length*(i)) + width/2;
        var y = (distance_radius*(1-d.likeCount/user_feed[currentTime]))*Math.sin((Math.PI*2)/all_data[currentCategory][arrayTime[currentTime]]["friends"].length*(i)) + height/2;

        // var x = (distance_radius*(1-d.likeCount/user_feed[currentTime])+2*feedScale(user_feed[currentTime]))*Math.cos((Math.PI*2)/all_data[currentCategory][arrayTime[currentTime]]["friends"].length*(i)) + width/2;
        // var y = (distance_radius*(1-d.likeCount/user_feed[currentTime])+2*feedScale(user_feed[currentTime]))*Math.sin((Math.PI*2)/all_data[currentCategory][arrayTime[currentTime]]["friends"].length*(i)) + height/2;
        var rotation = 360/all_data[currentCategory][arrayTime[currentTime]]["friends"].length*(i);
        if (rotation>90 && rotation<270) {
          rotation = rotation+180;
          d3.select(this).style("text-anchor", "end");
        }
        return "translate("+x+","+y+") rotate("+rotation+")";
      }
    });

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
    })
    .on("mouseover", function(d,i) {
      d3.select(this).style("opacity",0.6);
      d3.select(this).style("cursor", "pointer");
      tooltip.transition()
        .duration(200)
        .style("opacity", 0.95);
      tooltip.html(d.name+"<br/>"+"Like: "+d.likeCount+" / "+user_feed[currentTime]+"<br/>"+"Comment: "+d.commentCount+" / "+user_feed[currentTime]+"<br/>"+"Feed: "+d.feedCount)
        .style("left", (d3.event.pageX)+"px")
        .style("top", (d3.event.pageY - 20)+"px")
    })
    .on("mouseout", function(d,i) {
      d3.select(this).style("opacity",1.0);
      tooltip.transition()
        .duration(200)
        .style("opacity", 0);
    });

  friend_name = friend_circle_g.append("text")
    .attr({
      "x": function(d,i) {
        var rotation = 360/all_data[currentCategory][arrayTime[currentTime]]["friends"].length*(i);
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

  // Draw the circles
  // User circle
  user_circle.data([user_feed[currentTime]])
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
    })
    .on("mouseover", function(d,i) {
      d3.select(this).style("opacity",0.6);
      d3.select(this).style("cursor", "pointer");
      tooltip.transition()
        .duration(200)
        .style("opacity", 0.95);
      tooltip.html(all_data["user"].name+"<br/>"+"Feed: "+d)
        .style("left", (d3.event.pageX)+"px")
        .style("top", (d3.event.pageY - 20)+"px")
    })
    .on("mouseout", function(d,i) {
      d3.select(this).style("opacity",1.0);
      tooltip.transition()
        .duration(200)
        .style("opacity", 0);
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

  // Friend circles, currently use like only
  friend_circle_g.data(all_data[currentCategory][arrayTime[currentTime]]["friends"])
    .enter().append("g")
    .attr({
      "transform": function(d,i) {
        var x = (distance_radius*(1-d.likeCount/user_feed[currentTime]))*Math.cos((Math.PI*2)/all_data[currentCategory][arrayTime[currentTime]]["friends"].length*(i)) + width/2;
        var y = (distance_radius*(1-d.likeCount/user_feed[currentTime]))*Math.sin((Math.PI*2)/all_data[currentCategory][arrayTime[currentTime]]["friends"].length*(i)) + height/2;
        var rotation = 360/all_data[currentCategory][arrayTime[currentTime]]["friends"].length*(i);
        if (rotation>90 && rotation<270) {
          rotation = rotation+180;
          d3.select(this).style("text-anchor", "end");
        }
        return "translate("+x+","+y+") rotate("+rotation+")";
      }
    });

  friend_circle = friend_circle_g.selectAll("circle")
    .data(function(d,i) { return d; });
  friend_circle.exit().transition(400)
    .attr({
      "cx": 0,
      "cy": 0,
      "r": "0"
    })
    .remove();
  friend_circle = friend_circle_g.append("circle");
  friend_circle.attr({
    "fill": function(d,i) {
      if (typeof d.gender!=="undefined") return color(d.gender);
      else return "#ccc";
    }
  })
  .on("mouseover", function(d,i) {
      d3.select(this).style("opacity",0.6);
      d3.select(this).style("cursor", "pointer");
      tooltip.transition()
        .duration(200)
        .style("opacity", 0.95);
      tooltip.html(d.name+"<br/>"+"Like: "+d.likeCount+" / "+user_feed[currentTime]+"<br/>"+"Comment: "+d.commentCount+" / "+user_feed[currentTime]+"<br/>"+"Feed: "+d.feedCount)
        .style("left", (d3.event.pageX)+"px")
        .style("top", (d3.event.pageY - 20)+"px")
    })
    .on("mouseout", function(d,i) {
      d3.select(this).style("opacity",1.0);
      tooltip.transition()
        .duration(200)
        .style("opacity", 0);
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
        var x = (distance_radius*(1-d.likeCount/user_feed[currentTime]))*Math.cos((Math.PI*2)/all_data[currentCategory][arrayTime[currentTime]]["friends"].length*(i)) + width/2;
        var y = (distance_radius*(1-d.likeCount/user_feed[currentTime]))*Math.sin((Math.PI*2)/all_data[currentCategory][arrayTime[currentTime]]["friends"].length*(i)) + height/2;
        var rotation = 360/all_data[currentCategory][arrayTime[currentTime]]["friends"].length*(i);
        if (rotation>90 && rotation<270) {
          rotation = rotation+180;
          d3.select(this).style("text-anchor", "end");
        }
        return "translate("+x+","+y+") rotate("+rotation+")";
      }
    });

}
