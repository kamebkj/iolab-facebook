
// Set svg size and margin
var margin = {top: 20, right: 80, bottom: 80, left: 80},
    width = 960 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

// Initial variables for storing categories
var currentCategory = "relationship-like";
var currentTime = "2012-Q1";

// Start drawing
var svg = d3.select("#viz-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Create User circle
var user_feed = [];
user_feed.push(data[currentCategory][currentTime]["user"].feedCount);

var user_circle = svg.selectAll("user_circle")
  .data(user_feed)
  .enter().append("circle")
  .attr({
    "cx": width/2,
    "cy": height/2,
    "r": function(d,i) {
      return d;
    },
    "fill": "#f00"
  });


// Create Friend Circles

// Normalize the size and distance of the circles
var friend_feed = [];
var friend_like = [];
var friend_comment = [];

for (var i=0; i<data[currentCategory][currentTime]["friend"].length; i++) {
  friend_feed.push(data[currentCategory][currentTime]["friend"][i].feedCount);
  friend_like.push(data[currentCategory][currentTime]["friend"][i].likeCount);
  friend_comment.push(data[currentCategory][currentTime]["friend"][i].commentCount);
};
friend_feed.push(data[currentCategory][currentTime]["user"].feedCount);

var friendFeedScale = d3.scale.linear()
  .domain([d3.min(friend_feed), d3.max(friend_feed)])
  .range([10,80]);
var friendLikeScale = d3.scale.linear()
  .domain([d3.min(friend_like), d3.max(friend_like)])
  .range([150,300]);
var friendCommentScale = d3.scale.linear()
  .domain([d3.min(friend_comment), d3.max(friend_comment)])
  .range([10,80]);

// Draw the circles
// currently use like only
var friend_circle = svg.selectAll("friend_circle")
  .data(data[currentCategory][currentTime]["friend"])
  .enter().append("circle")
  .attr({
    "cx": function(d,i) {
      return friendLikeScale(d.likeCount)*Math.cos((Math.PI*2)/data[currentCategory][currentTime]["friend"].length*(i)) + width/2;
    },
    "cy": function(d,i) {
      return friendLikeScale(d.likeCount)*Math.sin((Math.PI*2)/data[currentCategory][currentTime]["friend"].length*(i)) + height/2;
    },
    "r": function(d,i) {
      return friendFeedScale(d.feedCount);
    },
    "fill": "#000"
  });

// if 5 data:
// 360/5 -> (Math.PI*2)/5



// Add event listener
$(".timerange").on("click", function(){
  updateTime(this.id);
});


// Functions
function updateTime(time_num) {
  console.log(time_num);
}

function updateCategory(category_num) {

}


// // Initial variables for storing categories
// var originalCategory = ["Comedians", "Directors", "Gurus", "Musicians", "Reporters", "Sponsors"];
// var selectedCategory = [1,1,1,1,1,1];
// var categoryTotal = [];
// var originalNumbergroup = ["NumOfTotalVideoViewCount", "NumOfViewsInChannel", "NumOfVideosInChannel", "NumOfComments", "NumOfSubscriber"];
// var selectedNumbergroup = "NumOfTotalVideoViewCount";
// var subtitleDic = {
//   "NumOfTotalVideoViewCount": "Total number of views for all videos in Top-8 channel (% in Country)",
//   "NumOfViewsInChannel": "Total number of times that the Top-8 channel's channel pages have been viewed (% in Country)",
//   "NumOfVideosInChannel": "Total number of videos uploaded to Top-8 channel (% in Country)",
//   "NumOfComments": "Total number of comments that user submitted on Top-8 channels (% in Country)",
//   "NumOfSubscriber": "Total number of users who have subscribed to Top-8 channels (% in Country)"
// }
// var numberFormat = d3.format(",.3");
// var numberFormat2 = d3.format(",.3s");


// // Initial variables for drawing svg
// var x = d3.scale.ordinal()
//     .rangeRoundBands([0, width], .1)
//     .domain(data.map(function(d, i) {
//       return d.Country;
//     }));

// var y = d3.scale.linear()
//     .rangeRound([height, 0]);

// var color = d3.scale.ordinal() //8a89a6
//     .range(["#98abc5", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]) 
//     .domain(originalCategory);

// var xAxis = d3.svg.axis()
//     .scale(x)
//     .orient("bottom");

// var yAxis = d3.svg.axis()
//     .scale(y)
//     .orient("left")
//     .tickFormat(d3.format(".0%"));


// // Start drawing
// var svg = d3.select("#chart").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// svg.append("g")
//     .attr("class", "x axis")
//     .attr("transform", "translate(0," + height + ")")
//     .call(xAxis);

// svg.append("g")
//     .attr("class", "y axis")
//     .call(yAxis);

// // Add axis text
// var legendGroup = svg.append("g")
//   .attr("transform", "translate(-60,250)")
//   .attr("width", 50);

// legendGroup.append("text")
//   .attr("transform", "rotate(-90)")
//   .attr({
//     "x": 10,
//     "y": 10,
//     "font-size": 14,
//     "fill": "#888"
//   })
//   .text("percentage");

// legendGroup.append("text")
//   .attr({
//     "x": 875,
//     "y": 210,
//     "font-size": 14,
//     "fill": "#888"
//   })
//   .text("country");

// //
// // svg.append("text")
// //   .attr({
// //     "x":400,
// //     "y":height+60,
// //     "font-size": 12
// //   })
// //   .text("This is a visualization of the Top 8 channels on YouTube in each category per country.");
// // svg.append("text")
// //   .attr({
// //     "x":271,
// //     "y":height+75,
// //     "font-size": 12,
// //   })
// //   .text("\"All channels\" refers to only the pool of channels aggregated from the top 8 channels per category per country.");

// // Add category rect for each country
// var country = svg.selectAll(".country")
//     .data(data)
//   .enter().append("g")
//     .attr("class", "country")
//     .attr("transform", function(d) { return "translate(" + x(d.Country) + ",0)"; });


// // Add category rects
// var y0 = 0;
// data.forEach(function(d, i) {
//   y0 = 0;
//   d.categories = color.domain().map(function(name, k) { 
//     return {
//       name: name, 
//       y0: y0, 
//       y1: y0 += d.Category[k]["NumOfTotalVideoViewCount"],
//       rawNumber: d.Category[k]["NumOfTotalVideoViewCount"],
//       channels: d.Category[k]["Channels"]
//     }; 
//   });
//   categoryTotal[i] = y0;

//   d.categories.forEach(function(d) { 
//     d.y0 /= categoryTotal[i]; 
//     d.y1 /= categoryTotal[i]; 
//   });
// });

// // console.log("prev"+data);
// // data.sort(function(a, b) { console.log(a.categories.y0,b); return (b.y1-b.y0) - (a.y1-a.y0); });
// // console.log("after"+data);

// // Create tooltips for hover use
// var tooltip = d3.select("body").append("div") 
//     .attr("class", "tooltip")       
//     .style("opacity", 0);

// var rect = country.selectAll("rect")
//     .data(function(d) { return d.categories; })
//   .enter().append("rect")
//     .attr("width", x.rangeBand())
//     .attr("y", function(d) { return y(d.y1); })
//     .attr("height", function(d) { return y(d.y0) - y(d.y1); })
//     .style("fill", function(d) { return color(d.name); })
//     .on("mouseover", function(d,i) {
//       d3.select(this).style("opacity",0.8);

//       // Display d.rawNumber in tooltip popup
//       tooltip.transition()
//         .duration(200)
//         .style("opacity", 0.8);
//       tooltip.html(((d.y1-d.y0)*100).toFixed(2) + "%<br/>" + numberFormat(d.rawNumber) + "<br/>" + numberFormat2(d.rawNumber))
//         .style("left", (d3.event.pageX)+"px")
//         .style("top", (d3.event.pageY - 20)+"px")
//     })
//     .on("mouseout", function(d,i) {
//       d3.select(this).style("opacity",1);
//       tooltip.transition()
//         .duration(200)
//         .style("opacity", 0);
//     })
//     .on("click", function(d,i) {
//       // $("div#channel-container").css("height", "280px");
//       $("#channel-inner-container").empty();
//       for (var c=0; c<d.channels.length; c++) {
//         $("#channel-inner-container").append('<div class="thumbnail"><iframe scrolling="no" marginheight="0" frameborder="0" width="150" src="https://ytchannelembed.com/gallery.php?vids=1&amp;user='+d.channels[c]+'&amp;row=1&amp;width=150&amp;hd=1&amp;margin_right=15&amp;desc=100&amp;desc_color=9E9E9E&amp;title=30&amp;title_color=000000&amp;views=1&amp;likes=1&amp;dislikes=1&amp;fav=1&amp;playlist=" style="height: 339px;"></iframe></div>');
//       }
//     });


// // Add button event listener
// for (var c=0; c<originalCategory.length; c++) {
//   $("li#"+originalCategory[c]).click(setSelectedCategory(c));
//   $("li#"+originalNumbergroup[c]).click(setSelectedNumbergroup(c));
// }

// function setSelectedNumbergroup(para) {
//   return function() {
//     selectedNumbergroup = this.id;
//     numbergroupChanged(selectedNumbergroup);
//   };
// }

// function setSelectedCategory(para) {
//   return function() {
//     if ($(this).hasClass("selected")) {
//      $(this).removeClass("selected").addClass("unselected");
//      $(this).children("span").removeClass("selected").addClass("unselected");
//     }
//     else {
//       $(this).removeClass("unselected").addClass("selected");
//       $(this).children("span").removeClass("unselected").addClass("selected");
//     }
//     selectedCategory[para] = selectedCategory[para]==1 ? 0 : 1;
//     categoryChanged(selectedNumbergroup);
//   };
// }


// // When choosing a different dataset to view, recalculate the total number for each category,
// // and redraw the rects and add transition
// function numbergroupChanged(ng) {

//   // Change subtitle
//   $("#viz-container h2").text(subtitleDic[ng]);

//   // Needs to recalculate categoryTotal
//   data.forEach(function(d, i) {
//     y0 = 0;
//     d.categories = color.domain().map(function(name, k) { 
//       return {
//         name: name, 
//         y0: y0, 
//         y1: y0 += d.Category[k][ng],
//         rawNumber: d.Category[k][ng],
//         channels: d.Category[k]["Channels"]
//       }; 
//     });
//     categoryTotal[i] = y0;

//     d.categories.forEach(function(d) { 
//       d.y0 /= categoryTotal[i]; 
//       d.y1 /= categoryTotal[i]; 
//     });
//   });

//   categoryChanged(selectedNumbergroup);
// }


// // When filtering the category, redraw the rects and add transition
// function categoryChanged(ng) {
//   console.log(ng);
//   data.forEach(function(d, i) {
//     y0 = 0;
//     d.categories = color.domain().map(function(name, k) { 
      
//       if (selectedCategory[k]==1) {
//         return {
//           name: name, 
//           y0: y0, 
//           y1: y0 += d.Category[k][ng],
//           rawNumber: d.Category[k][ng],
//           channels: d.Category[k]["Channels"]
//         }; 
//       }
//       else {
//         return {
//           name: name, 
//           y0: y0, 
//           y1: y0,
//           rawNumber: d.Category[k][ng],
//           channels: d.Category[k]["Channels"]
//         }
//       }
//     });

//     d.categories.forEach(function(d) { 
//       d.y0 /= categoryTotal[i]; 
//       d.y1 /= categoryTotal[i]; 
//     });
//   });

//   rect.data(function(d) { return d.categories; })
//     .enter().append("rect")
//     .attr("width", x.rangeBand())
//     .attr("y", function(d) { return y(d.y1); })
//     .attr("height", function(d) { return y(d.y0) - y(d.y1); })
//     .style("fill", function(d) { return color(d.name); });

//   rect.transition()
//     .duration(400)
//     .attr("y", function(d) { return y(d.y1); })
//     .attr("height", function(d) { return y(d.y0) - y(d.y1); });
// }

// // Main landing page

