
// Set svg size and margin
var margin = {top: 20, right: 80, bottom: 80, left: 80},
    width = 960 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// Initial variables for storing categories
var arrayTime = ["2013-Q3", "2013-Q4"];
var currentCategory = "relationship-like";
var currentTime = "2013-Q3";

// Start drawing
var svg = d3.select("#viz-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// First time loading
// updateGraph();
firstTimeGraph();

var feed = [];
var feedScale;
var user_feed = [];
var user_circle;
var friend_circle_g;
var friend_circle;
var friend_name;

// Add event listener
$(".timerange").on("click", function(){
  updateTime(this.id);
});

$(".category").on("click", function(){
  updateCategory(this.id);
});


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
    .range([5,20]);

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
      "fill": "#f00"
    });

  // Friend circles
  // currently use like only

  friend_circle_g = svg.selectAll("friend_circle_g")
    .data(all_data[currentCategory][currentTime]["friends"])
    .enter().append("g")
    // .attr("text-anchor", "middle")
    .attr({
      "transform": function(d,i) {
        var x = (200*(1-d.likeCount/user_feed[0])+2*feedScale(user_feed[0]))*Math.cos((Math.PI*2)/all_data[currentCategory][currentTime]["friends"].length*(i)) + width/2;
        var y = (200*(1-d.likeCount/user_feed[0])+2*feedScale(user_feed[0]))*Math.sin((Math.PI*2)/all_data[currentCategory][currentTime]["friends"].length*(i)) + height/2;
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
      "fill": "#000"
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
      "fill": "#f00"
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
        var x = (200*(1-d.likeCount/user_feed[0])+2*feedScale(user_feed[0]))*Math.cos((Math.PI*2)/all_data[currentCategory][currentTime]["friends"].length*(i)) + width/2;
        var y = (200*(1-d.likeCount/user_feed[0])+2*feedScale(user_feed[0]))*Math.sin((Math.PI*2)/all_data[currentCategory][currentTime]["friends"].length*(i)) + height/2;
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

  friend_circle = friend_circle_g.append("circle").transition()
    .duration(400)
    .attr({
      "cx": 0,
      "cy": 0,
      "r": function(d,i) {
        return feedScale(d.feedCount);
      },
      "fill": "#000"
    });


  // Transition
  friend_circle_g.transition()
    .duration(400)
    .attr({
      "transform": function(d,i) {
        var x = (200*(1-d.likeCount/user_feed[0])+2*feedScale(user_feed[0]))*Math.cos((Math.PI*2)/all_data[currentCategory][currentTime]["friends"].length*(i)) + width/2;
        var y = (200*(1-d.likeCount/user_feed[0])+2*feedScale(user_feed[0]))*Math.sin((Math.PI*2)/all_data[currentCategory][currentTime]["friends"].length*(i)) + height/2;
        var rotation = 360/all_data[currentCategory][currentTime]["friends"].length*(i);
        if (rotation>90 && rotation<270) {
          rotation = rotation+180;
          d3.select(this).style("text-anchor", "end");
        }
        return "translate("+x+","+y+") rotate("+rotation+")";
      }
    });

}
