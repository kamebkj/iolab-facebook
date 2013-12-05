
// Set svg size and margin
var margin = {top: 20, right: 80, bottom: 80, left: 80},
    width = 960 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

// Initial variables for storing categories
var arrayTime = ["2012-Q1", "2012-Q2"];
var currentCategory = "relationship-like";
var currentTime = "2012-Q1";

// Start drawing
var svg = d3.select("#viz-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// First time loading
updateGraph();


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


function updateGraph() {

  // Normalize feed count to draw radius
  // Use feedScale() to normalize 
  var feed = [];
  for (var i=0; i<arrayTime.length; i++) {
    // push user feedCount
    feed.push(data[currentCategory][arrayTime[i]]["user"].feedCount);
    // push friend feedCount
    for (var k=0; k<data[currentCategory][arrayTime[i]]["friend"].length; k++) {
      feed.push(data[currentCategory][arrayTime[i]]["friend"][k].feedCount);
    }
  }
  var feedScale = d3.scale.linear()
    .domain([d3.min(feed), d3.max(feed)])
    .range([5,20]);

  // Create User circle data
  var user_feed = [];
  user_feed.push(data[currentCategory][currentTime]["user"].feedCount);

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
  var user_circle = svg.selectAll("user_circle")
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
  var friend_circle = svg.selectAll("friend_circle")
    .data(data[currentCategory][currentTime]["friend"])
    .enter().append("circle")
    .attr({
      "cx": function(d,i) {
        return (200*(1-d.likeCount/user_feed[0])+2*feedScale(user_feed[0]))*Math.cos((Math.PI*2)/data[currentCategory][currentTime]["friend"].length*(i)) + width/2;
      },
      "cy": function(d,i) {
        return (200*(1-d.likeCount/user_feed[0])+2*feedScale(user_feed[0]))*Math.sin((Math.PI*2)/data[currentCategory][currentTime]["friend"].length*(i)) + height/2;
      },
      "r": function(d,i) {
        return feedScale(d.feedCount);
      },
      "fill": "#000"
    });

  // if 5 data:
  // 360/5 -> (Math.PI*2)/5
}


