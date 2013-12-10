
var user_likes_stack = [];
var user_comments_stack = [];
var user_feedcount_stack = [];
var my_profile;


var user_likes_stat = [];
var user_comments_stat = [];

var top50_user = [];
var user_profile = [];

var all_data;


function getFriend(Q_Y,i){
  var friend = {
    id: 0,
    name: 0,
    gender: 0,
    likeCount: 0,
    commentCount: 0,
    feedCount: 0 
  };
  console.log(Q_Y,i,user_profile[i]);
  friend["id"] = user_profile[i].id;
  friend["name"] = user_profile[i].name;
  friend["gender"] = user_profile[i].gender;
  if ((Q_Y+"_like") in user_profile[i]){
    friend["likeCount"] = user_profile[i][Q_Y+"_like"]; 
  }
  if ((Q_Y+"_comment") in user_profile[i]){
    friend["commentCount"] = user_profile[i][Q_Y+"_comment"];
  }  
  if ((Q_Y+"_feedcount") in user_profile[i]){
    friend["feedCount"] = user_profile[i][Q_Y+"_feedcount"];
  }
  return friend;
}


function OutputData(){
  console.log("OutputData() started.")
  var friends = [];
  var user_feed;
  var Q4_2013;
  var Q3_2013;
  var Q2_2013;
  var Q1_2013;
  /*
  var Q4_2012;
  var Q3_2012;
  var Q2_2012;
  var Q1_2012;
*/
  var relationship_like;
  var facebook_data;

  //Q4 2013
  for (var i=0; i < user_profile.length; i++){
    friends.push(getFriend("Q4_2013",i));
  }
  for (key in user_feedcount_stack){
    for (period in user_feedcount_stack[key]){
      if (period == "Q4_2013_user_feedcount"){
        user_feed = {
          feedCount: user_feedcount_stack[key][period]
        }
      }
    }
  }
  Q4_2013 = {
    "user": user_feed,
    "friends": friends 
  };
  friends = [];


  //Q3 2013
  for (var i=0; i < user_profile.length; i++){
    friends.push(getFriend("Q3_2013",i));
  }
  for (key in user_feedcount_stack){
    for (period in user_feedcount_stack[key]){
      if (period == "Q3_2013_user_feedcount"){
        user_feed = {
          feedCount: user_feedcount_stack[key][period]
        }
      }
    }
  }
  Q3_2013 = {
    "user": user_feed,
    "friends": friends 
  };   
  friends = [];

 //Q2 2013
  for (var i=0; i < user_profile.length; i++){
    friends.push(getFriend("Q2_2013",i));
  }
  for (key in user_feedcount_stack){
    for (period in user_feedcount_stack[key]){
      if (period == "Q2_2013_user_feedcount"){
        user_feed = {
          feedCount: user_feedcount_stack[key][period]
        }
      }
    }
  }
  Q2_2013 = {
    "user": user_feed,
    "friends": friends 
  };   
  friends = [];

 //Q1 2013
  for (var i=0; i < user_profile.length; i++){
    friends.push(getFriend("Q1_2013",i));
  }
  for (key in user_feedcount_stack){
    for (period in user_feedcount_stack[key]){
      if (period == "Q1_2013_user_feedcount"){
        user_feed = {
          feedCount: user_feedcount_stack[key][period]
        }
      }
    }
  }
  Q1_2013 = {
    "user": user_feed,
    "friends": friends 
  };   
  friends = [];
/*
 //Q4 2012
  for (var i=0; i < user_profile.length; i++){
    friends.push(getFriend("Q4_2012",i));
  }
  for (key in user_feedcount_stack){
    for (period in user_feedcount_stack[key]){
      if (period == "Q4_2012_user_feedcount"){
        user_feed = {
          feedCount: user_feedcount_stack[key][period]
        }
      }
    }
  }
  Q4_2012 = {
    "user": user_feed,
    "friends": friends 
  };   
  friends = [];
 //Q3 2012
  for (var i=0; i < user_profile.length; i++){
    friends.push(getFriend("Q3_2012",i));
  }
  for (key in user_feedcount_stack){
    for (period in user_feedcount_stack[key]){
      if (period == "Q3_2012_user_feedcount"){
        user_feed = {
          feedCount: user_feedcount_stack[key][period]
        }
      }
    }
  }
  Q3_2012 = {
    "user": user_feed,
    "friends": friends 
  };   
  friends = [];
 //Q2 2012
  for (var i=0; i < user_profile.length; i++){
    friends.push(getFriend("Q2_2012",i));
  }
  for (key in user_feedcount_stack){
    for (period in user_feedcount_stack[key]){
      if (period == "Q2_2012_user_feedcount"){
        user_feed = {
          feedCount: user_feedcount_stack[key][period]
        }
      }
    }
  }
  Q2_2012 = {
    "user": user_feed,
    "friends": friends 
  };   
  friends = [];
 //Q1 2012
  for (var i=0; i < user_profile.length; i++){
    friends.push(getFriend("Q1_2012",i));
  }
  for (key in user_feedcount_stack){
    for (period in user_feedcount_stack[key]){
      if (period == "Q1_2012_user_feedcount"){
        user_feed = {
          feedCount: user_feedcount_stack[key][period]
        }
      }
    }
  }
  Q1_2012 = {
    "user": user_feed,
    "friends": friends 
  };   
  friends = [];

*/
  //All
  relationship_like = {
    "2013-Q4": Q4_2013,
    "2013-Q3": Q3_2013,
    "2013-Q2": Q2_2013,
    "2013-Q1": Q1_2013/*,

    "2012-Q4": Q4_2012,
    "2012-Q3": Q3_2012,
    "2012-Q2": Q2_2012,
    "2012-Q1": Q1_2012  
    */
  };
  facebook_data = {
    "user": my_profile,
    "relationship-like": relationship_like
  };

  console.log(facebook_data);
  all_data = facebook_data;


  console.log("done");
  $("body").removeClass("loading"); 
  $("#slider").show();
  $("#timerange-label").show();
  // var s = JSON.stringify(all_data)
  // $("html").text(s);
  initialize();
  drawHistoryCircles();
  firstTimeGraph();
}


function GetUserProfile(){
  var task_completed_getuserprofile = 0;
  console.log("GetUserProfile() started.")

  for (var i =0; i<top50_user.length; i++){
    // 2013 Q4
    FB.api("/"+top50_user[i]+"/feed?fields=id,from&limit=1000&since=1 Oct 2013&until=31 Dec 2013",
      function(response){
        for (var j = 0; j < user_profile.length; j++){
          if (user_profile[j].id == response.data[0].from.id){
            user_profile[j].Q4_2013_feedcount = response.data.length;
          }
        }
//        console.log(user_profile);
        task_completed_getuserprofile += 1;
      }

    );
    //2013 Q3
    FB.api("/"+top50_user[i]+"/feed?fields=id,from&limit=1000&since=1 Jul 2013&until=30 Sep 2013",
      function(response){
        for (var j = 0; j < user_profile.length; j++){
          if (user_profile[j].id == response.data[0].from.id){
            user_profile[j].Q3_2013_feedcount = response.data.length;
          }
        }
        task_completed_getuserprofile += 1;
//        console.log(user_profile);
      }

    );
    //2013 Q2
    FB.api("/"+top50_user[i]+"/feed?fields=id,from&limit=1000&since=1 Apr 2013&until=30 Jun 2013",
      function(response){
        for (var j = 0; j < user_profile.length; j++){
          if (user_profile[j].id == response.data[0].from.id){
            user_profile[j].Q2_2013_feedcount = response.data.length;
          }
        }
        task_completed_getuserprofile += 1;
//        console.log(user_profile);
      }
    );
    //2013 Q1
    FB.api("/"+top50_user[i]+"/feed?fields=id,from&limit=1000&since=1 Jan 2013&until=31 Mar 2013",
      function(response){
        for (var j = 0; j < user_profile.length; j++){
          if (user_profile[j].id == response.data[0].from.id){
            user_profile[j].Q1_2013_feedcount = response.data.length;
          }
        }
        task_completed_getuserprofile += 1;
//        console.log(user_profile);
      }
    );
    /*
    //2012 Q4
    FB.api("/"+top50_user[i]+"/feed?fields=id,from&limit=1000&since=1 Oct 2012&until=31 Dec 2012",
      function(response){
        for (var j = 0; j < user_profile.length; j++){
          if (user_profile[j].id == response.data[0].from.id){
            user_profile[j].Q4_2012_feedcount = response.data.length;
          }
        }
        task_completed_getuserprofile += 1;
        console.log(user_profile);
      }
    );
    //2012 Q3
    FB.api("/"+top50_user[i]+"/feed?fields=id,from&limit=1000&since=1 Jul 2012&until=30 Sep 2012",
      function(response){
        for (var j = 0; j < user_profile.length; j++){
          if (user_profile[j].id == response.data[0].from.id){
            user_profile[j].Q3_2012_feedcount = response.data.length;
          }
        }
        task_completed_getuserprofile += 1;
        console.log(user_profile);
      }
    );
    //2012 Q2
    FB.api("/"+top50_user[i]+"/feed?fields=id,from&limit=1000&since=1 Apr 2012&until=30 Jun 2012",
      function(response){
        for (var j = 0; j < user_profile.length; j++){
          if (user_profile[j].id == response.data[0].from.id){
            user_profile[j].Q2_2012_feedcount = response.data.length;
          }
        }
        task_completed_getuserprofile += 1;
        console.log(user_profile);
      }
    );
    //2012 Q1
    FB.api("/"+top50_user[i]+"/feed?fields=id,from&limit=1000&since=1 Jan 2012&until=31 Mar 2012",
      function(response){
        for (var j = 0; j < user_profile.length; j++){
          if (user_profile[j].id == response.data[0].from.id){
            user_profile[j].Q1_2012_feedcount = response.data.length;
          }
        }
        task_completed_getuserprofile += 1;
        console.log(user_profile);
      }
    );
*/
    for (var j = 0; j<user_profile.length; j++){
      for (key in user_likes_stack){
        for (period in user_likes_stack[key]){
          for (userID in user_likes_stack[key][period]){
            if (user_profile[j].id == userID){
              user_profile[j][period] = user_likes_stack[key][period][userID];
            }
          }
        }
      } 
    }
    for (var j = 0; j<user_profile.length; j++){
      for (key in user_comments_stack){
        for (period in user_comments_stack[key]){
          for (userID in user_comments_stack[key][period]){
            if (user_profile[j].id == userID){
              user_profile[j][period] = user_comments_stack[key][period][userID];
            }
          }
        }
      } 
    }

  }
  setInterval(function()
  {
    //console.log("task_completed_getuserprofile",task_completed_getuserprofile);
    if (task_completed_getuserprofile > 197 && task_completed_getuserprofile <= 200){
      OutputData();
      task_completed_getuserprofile = 201;
    }
    console.log("task_completed:"+task_completed_getuserprofile/2 +"%");
  }
    ,3000);  
}


function GetTopUser(){
  var task_completed_gettopuser = 0;
  console.log("GetTopUser() started.")
  var key, period,userID;
  //console.log(user_likes_stack);
  for (key in user_likes_stack){
    //console.log(user_likes_stack[key]);
    for (period in user_likes_stack[key]){
      for (userID in user_likes_stack[key][period]){
        //console.log(userID);
        if (user_likes_stat.hasOwnProperty(userID))
        {
          user_likes_stat[userID] += user_likes_stack[key][period][userID];
//            console.log(period, userID, user_likes_stat[userID]);
        }
        else{
          user_likes_stat[userID] = user_likes_stack[key][period][userID];
//            console.log(period, userID, user_likes_stat[userID]);
        }
      }
    }
  }
  // get top50 user id from user_likes_stat
  var score_lists = [];
  for (userID in user_likes_stat){
    score_lists.push(user_likes_stat[userID]);
  }
  score_lists.sort(function(a,b){return b-a});
  //console.log(score_lists);
  var threshold = score_lists[49];


  for (userID in user_likes_stat){
    if (user_likes_stat[userID] >= threshold && top50_user.length < 50){
      top50_user.push(userID);
    }
  }
//    console.log(top50_user);

  for (var i =0; i<top50_user.length; i++){
    FB.api("/"+top50_user[i]+"/?fields=id,name,gender",
      function(response){
        user_profile.push({
          id: response.id,
          gender: response.gender,
          name: response.name
        });
//          console.log(user_profile); 
        task_completed_gettopuser += 1;           
      }
    );
  }  



  setInterval(function()
  {
//    console.log("task_completed_gettopuser",task_completed_gettopuser);
    if (task_completed_gettopuser == 50){

      GetUserProfile();
      task_completed_gettopuser = 51;
    }
  }
    ,3000);

}

function GetFeed() {
  console.log("start");
  $("body").addClass("loading");

  var task_completed_getfeed = 0;
  FB.login(function(response){
    FB.api("/me?fields=id,name,gender",
      function (response){
        my_profile = {
          id: response.id,
          name: response.name,
          gender: response.gender
        }
        console.log(my_profile);
      }

    );   
    //Q4 2013
    FB.api("/me/posts?fields=likes.limit(300).fields(id),comments.limit(100).fields(from),created_time,message,type&until=31 Dec 2013&since=1 Oct 2013&limit=1000",
      function (response){
//        console.log(response);
        var user_likes = [];
        var user_comments = [];
        var like_count = 0;
        for (var i = 0; i < response.data.length; i++){
          if (response.data[i].likes){
            like_count +=1;
            for (var j = 0; j <response.data[i].likes.data.length; j++){
              if (response.data[i].likes.data[j].id in user_likes){
                user_likes[response.data[i].likes.data[j].id] +=1;
              }
              else{
                user_likes[response.data[i].likes.data[j].id] = 1;
              }
            }
          }
          if (response.data[i].comments){
            for (var j = 0; j <response.data[i].comments.data.length; j++){
              if (response.data[i].comments.data[j].from.id in user_comments){
                user_comments[response.data[i].comments.data[j].from.id] +=1;
              }
              else{
                user_comments[response.data[i].comments.data[j].from.id] = 1;
              }
            }
          }
        }
        user_likes_stack.push({
          Q4_2013_like: user_likes
        });
        user_comments_stack.push({
          Q4_2013_comment: user_comments
        });
        user_feedcount_stack.push({
          Q4_2013_user_feedcount: like_count
        });
        console.log(user_likes_stack);
        console.log(user_comments_stack);
        console.log(user_feedcount_stack);
        task_completed_getfeed += 1;
      }
      
    );

                
    FB.api("/me/posts?fields=likes.limit(300).fields(id),comments.limit(100).fields(from),created_time,message,type&until=31 Sep 2013&since=1 Jul 2013&limit=1000",
      function (response){
//        console.log(response);
        var user_likes = [];
        var user_comments = [];
        var like_count = 0;
        for (var i = 0; i < response.data.length; i++){
          if (response.data[i].likes){
            like_count +=1;
            for (var j = 0; j <response.data[i].likes.data.length; j++){
              if (response.data[i].likes.data[j].id in user_likes){
                user_likes[response.data[i].likes.data[j].id] +=1;
              }
              else{
                user_likes[response.data[i].likes.data[j].id] = 1;
              }
            }
          }
          if (response.data[i].comments){
            for (var j = 0; j <response.data[i].comments.data.length; j++){
              if (response.data[i].comments.data[j].from.id in user_comments){
                user_comments[response.data[i].comments.data[j].from.id] +=1;
              }
              else{
                user_comments[response.data[i].comments.data[j].from.id] = 1;
              }
            }
          }
        }
        user_likes_stack.push({
          Q3_2013_like: user_likes
        });
        user_comments_stack.push({
          Q3_2013_comment: user_comments
        });
        user_feedcount_stack.push({
          Q3_2013_user_feedcount: like_count
        });
        console.log(user_likes_stack);
        console.log(user_comments_stack);
        console.log(user_feedcount_stack);
        task_completed_getfeed += 1;
      }
      
    );
    //Q2 2013
    FB.api("/me/posts?fields=likes.limit(300).fields(id),comments.limit(100).fields(from),created_time,message,type&until=30 Jun 2013&since=1 Apr 2013&limit=1000",
      function (response){
//        console.log(response);
        var user_likes = [];
        var user_comments = [];
        var like_count = 0;
        for (var i = 0; i < response.data.length; i++){
          if (response.data[i].likes){
            like_count +=1;
            for (var j = 0; j <response.data[i].likes.data.length; j++){
              if (response.data[i].likes.data[j].id in user_likes){
                user_likes[response.data[i].likes.data[j].id] +=1;
              }
              else{
                user_likes[response.data[i].likes.data[j].id] = 1;
              }
            }
          }
          if (response.data[i].comments){
            for (var j = 0; j <response.data[i].comments.data.length; j++){
              if (response.data[i].comments.data[j].from.id in user_comments){
                user_comments[response.data[i].comments.data[j].from.id] +=1;
              }
              else{
                user_comments[response.data[i].comments.data[j].from.id] = 1;
              }
            }
          }
        }
        user_likes_stack.push({
          Q2_2013_like: user_likes
        });
        user_comments_stack.push({
          Q2_2013_comment: user_comments
        });
        user_feedcount_stack.push({
          Q2_2013_user_feedcount: like_count
        });
        console.log(user_likes_stack);
        console.log(user_comments_stack);
        console.log(user_feedcount_stack);
        task_completed_getfeed += 1;
      }
      
    );
    //Q1 2013
    FB.api("/me/posts?fields=likes.limit(300).fields(id),comments.limit(100).fields(from),created_time,message,type&until=31 Mar 2013&since=1 Jan 2013&limit=1000",
      function (response){
//        console.log(response);
        var user_likes = [];
        var user_comments = [];
        var like_count = 0;
        for (var i = 0; i < response.data.length; i++){
          if (response.data[i].likes){
            like_count +=1;
            for (var j = 0; j <response.data[i].likes.data.length; j++){
              if (response.data[i].likes.data[j].id in user_likes){
                user_likes[response.data[i].likes.data[j].id] +=1;
              }
              else{
                user_likes[response.data[i].likes.data[j].id] = 1;
              }
            }
          }
          if (response.data[i].comments){
            for (var j = 0; j <response.data[i].comments.data.length; j++){
              if (response.data[i].comments.data[j].from.id in user_comments){
                user_comments[response.data[i].comments.data[j].from.id] +=1;
              }
              else{
                user_comments[response.data[i].comments.data[j].from.id] = 1;
              }
            }
          }
        }
        user_likes_stack.push({
          Q1_2013_like: user_likes
        });
        user_comments_stack.push({
          Q1_2013_comment: user_comments
        });
        user_feedcount_stack.push({
          Q1_2013_user_feedcount: like_count
        });
        console.log(user_likes_stack);
        console.log(user_comments_stack);
        console.log(user_feedcount_stack);
        task_completed_getfeed += 1;
      }
    );
/*
    //Q4 2012
    FB.api("/me/posts?fields=likes.limit(300).fields(id),comments.limit(100).fields(from),created_time,message,type&until=31 Dec 2012&since=1 Oct 2012&limit=1000",
      function (response){
//        console.log(response);
        var user_likes = [];
        var user_comments = [];
        var like_count = 0;
        for (var i = 0; i < response.data.length; i++){
          if (response.data[i].likes){
            like_count +=1;
            for (var j = 0; j <response.data[i].likes.data.length; j++){
              if (response.data[i].likes.data[j].id in user_likes){
                user_likes[response.data[i].likes.data[j].id] +=1;
              }
              else{
                user_likes[response.data[i].likes.data[j].id] = 1;
              }
            }
          }
          if (response.data[i].comments){
            for (var j = 0; j <response.data[i].comments.data.length; j++){
              if (response.data[i].comments.data[j].from.id in user_comments){
                user_comments[response.data[i].comments.data[j].from.id] +=1;
              }
              else{
                user_comments[response.data[i].comments.data[j].from.id] = 1;
              }
            }
          }
        }
        user_likes_stack.push({
          Q4_2012_like: user_likes
        });
        user_comments_stack.push({
          Q4_2012_comment: user_comments
        });
        user_feedcount_stack.push({
          Q4_2012_user_feedcount: like_count
        });
        console.log(user_likes_stack);
        console.log(user_comments_stack);
        console.log(user_feedcount_stack);
        task_completed_getfeed += 1;
      }      
    );
    //Q3 2012
    FB.api("/me/posts?fields=likes.limit(300).fields(id),comments.limit(100).fields(from),created_time,message,type&until=30 Sep 2012&since=1 Jul 2012&limit=1000",
      function (response){
//        console.log(response);
        var user_likes = [];
        var user_comments = [];
        var like_count = 0;
        for (var i = 0; i < response.data.length; i++){
          if (response.data[i].likes){
            like_count +=1;
            for (var j = 0; j <response.data[i].likes.data.length; j++){
              if (response.data[i].likes.data[j].id in user_likes){
                user_likes[response.data[i].likes.data[j].id] +=1;
              }
              else{
                user_likes[response.data[i].likes.data[j].id] = 1;
              }
            }
          }
          if (response.data[i].comments){
            for (var j = 0; j <response.data[i].comments.data.length; j++){
              if (response.data[i].comments.data[j].from.id in user_comments){
                user_comments[response.data[i].comments.data[j].from.id] +=1;
              }
              else{
                user_comments[response.data[i].comments.data[j].from.id] = 1;
              }
            }
          }
        }
        user_likes_stack.push({
          Q3_2012_like: user_likes
        });
        user_comments_stack.push({
          Q3_2012_comment: user_comments
        });
        user_feedcount_stack.push({
          Q3_2012_user_feedcount: like_count
        });
        console.log(user_likes_stack);
        console.log(user_comments_stack);
        console.log(user_feedcount_stack);
        task_completed_getfeed += 1;
      }      
    );
    //Q2 2012
    FB.api("/me/posts?fields=likes.limit(300).fields(id),comments.limit(100).fields(from),created_time,message,type&until=30 Jun 2012&since=1 Apr 2012&limit=1000",
      function (response){
//        console.log(response);
        var user_likes = [];
        var user_comments = [];
        var like_count = 0;
        for (var i = 0; i < response.data.length; i++){
          if (response.data[i].likes){
            like_count +=1;
            for (var j = 0; j <response.data[i].likes.data.length; j++){
              if (response.data[i].likes.data[j].id in user_likes){
                user_likes[response.data[i].likes.data[j].id] +=1;
              }
              else{
                user_likes[response.data[i].likes.data[j].id] = 1;
              }
            }
          }
          if (response.data[i].comments){
            for (var j = 0; j <response.data[i].comments.data.length; j++){
              if (response.data[i].comments.data[j].from.id in user_comments){
                user_comments[response.data[i].comments.data[j].from.id] +=1;
              }
              else{
                user_comments[response.data[i].comments.data[j].from.id] = 1;
              }
            }
          }
        }
        user_likes_stack.push({
          Q2_2012_like: user_likes
        });
        user_comments_stack.push({
          Q2_2012_comment: user_comments
        });
        user_feedcount_stack.push({
          Q2_2012_user_feedcount: like_count
        });
        console.log(user_likes_stack);
        console.log(user_comments_stack);
        console.log(user_feedcount_stack);
        task_completed_getfeed += 1;
      }      
    );
    //Q1 2012
    FB.api("/me/posts?fields=likes.limit(300).fields(id),comments.limit(100).fields(from),created_time,message,type&until=31 Mar 2012&since=1 Jan 2012&limit=1000",
      function (response){
//        console.log(response);
        var user_likes = [];
        var user_comments = [];
        var like_count = 0;
        for (var i = 0; i < response.data.length; i++){
          if (response.data[i].likes){
            like_count +=1;
            for (var j = 0; j <response.data[i].likes.data.length; j++){
              if (response.data[i].likes.data[j].id in user_likes){
                user_likes[response.data[i].likes.data[j].id] +=1;
              }
              else{
                user_likes[response.data[i].likes.data[j].id] = 1;
              }
            }
          }
          if (response.data[i].comments){
            for (var j = 0; j <response.data[i].comments.data.length; j++){
              if (response.data[i].comments.data[j].from.id in user_comments){
                user_comments[response.data[i].comments.data[j].from.id] +=1;
              }
              else{
                user_comments[response.data[i].comments.data[j].from.id] = 1;
              }
            }
          }
        }
        user_likes_stack.push({
          Q1_2012_like: user_likes
        });
        user_comments_stack.push({
          Q1_2012_comment: user_comments
        });
        user_feedcount_stack.push({
          Q1_2012_user_feedcount: like_count
        });
        console.log(user_likes_stack);
        console.log(user_comments_stack);
        console.log(user_feedcount_stack);
        task_completed_getfeed += 1;
      }      
    );
*/
  }, {scope: 'read_stream'});

  setInterval(function()
  {
    if (task_completed_getfeed == 4){
      GetTopUser();
      task_completed_getfeed = 5;
    }
  }
    ,3000);

}

/*
function get_post(callback){
  var post_id = [];
  FB.api("/me/feed?fields=id&limit=1000&since=1 Apr 2012&until=30 Jun 2012",
    function (response){
//      console.log(response)
      for (var i=0; i<response.data.length; i++){
        post_id.push(response.data[i].id);
      }
//      console.log(post_id);
    }
  );
  callback(post_id);
}
*/
