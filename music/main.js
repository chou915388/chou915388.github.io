var playlist=[];
function playnow(ytid)
{
  sw=1;
  player.loadVideoById(ytid, 0, "large")
  ytid_now = ytid;
}
function zero_add(val_in)
{
  if (val_in < 10)
    return '0'+val_in ;
  else
    return val_in ;
}
function update_time()
{
  var hr=0;
  var min=0;
  var sec=0;
  all_t = parseInt(player.getCurrentTime());
  hr = all_t/3600;
  all_t = all_t%3600;
  min = all_t/60;
  all_t = all_t%60;
  sec = all_t;
  
  $('.time').text(zero_add(parseInt(hr)) + ':' + zero_add(parseInt(min)) + ':' + zero_add(parseInt(sec)));
}

var ytid_now;
var sw=0;
//載入IFrame Player API code
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
 

var player;  
function onYouTubeIframeAPIReady()
{
  player = new YT.Player(
    'player', 
    {
      height: '0',
      width: '0',
      videoId: ytid_now //Youtube ID
    }
  );
} 

$("#play").click(function(){
   if (sw)
   {
     sw=0;
     player.pauseVideo();
   }
   else
   {
     sw=1;
     player.playVideo();  
   }
});

function play_btn_change(sts)
{
  if(sts)
  {
    $("#play").removeClass("fa-play");
    $("#play").addClass("fa-pause");
  }
  else
  {
    $("#play").removeClass("fa-pause");
    $("#play").addClass("fa-play");
  }
}

setInterval(
  function() {
    switch(player.getPlayerState())
      {
        case -1:
            $('.status').text("尚未播放");
            play_btn_change(0);
            break;
        case 0:
            $('.status').text("播放完畢");
            play_btn_change(0);
            player.loadVideoById(playlist.pop(), 0, "large")
            break;
        case 1:
            $('.status').text("播放中");
            $('.title').html(player.getVideoData().title);
            play_btn_change(1);
            update_time();
            break;
        case 2:
            $('.status').text("暫停中");
            play_btn_change(0);
            break;
        case 3:
            $('.status').text("緩衝中");
            play_btn_change(1);
            break;
        case 5:
            $('.status').text("載入完成");
            play_btn_change(0);
            break;
      }
  }
  ,200
)

var query_word;
$('#search_go').click(
  function()
  {
    query_word = $('#query').val();
    getSearch(query_word);
  }
)

function getSearch(query_word) {
  url = 'https://www.googleapis.com/youtube/v3/search'; 
  var params = 
  {
    maxResults: '25',
    part: 'snippet',
    key: 'AIzaSyDAKDaBy_JDwcScSHqDQimOOLjdPImLanc',
    q: query_word
  };
  $.getJSON(url, params, function (query_word)
  {
    showResults2(query_word,1);
  });
}

function showResults(results) {
    var html = "";
    var entries = results.items;
    $.each(entries, function (index, value) {
        var title = value.snippet.title;
        //var thumbnail = value.snippet.thumbnails.default.url;
        var vid = value.id.videoId;
        html += '<div class=playitem onclick="playnow(\'' + vid +'\')">' + title + '</div>';
        //html += '<img src="' + thumbnail + '">';
    }); 
    
    $('#search-results').html(html);
}

var searchTerm;
//Get list
$('.btn_testlist').click(
  function()
  {
    getRequestList(searchTerm);
  }
)
function getRequestList(searchTerm) {
  url = 'https://www.googleapis.com/youtube/v3/playlistItems'; 
  var params = {
        maxResults: '25',
        part: 'snippet',
        key: 'AIzaSyDAKDaBy_JDwcScSHqDQimOOLjdPImLanc',
        playlistId: 'PL2nsgMrsnD2YntryczyzjU2LRQsj5tDCq'
    };
    $.getJSON(url, params, function (searchTerm) {
        showResults2(searchTerm,0);
    });
}
var adm_html = "<div class='music_item_title'><div class='music_title music_item_num'>#</div><div class='music_title music_item_name'>歌曲名稱</div><div class='music_title music_item_duration'>時間</div></div>";
var html_part1 = "<div class='music_item' onclick=\"playnow(\'"
var html_part2 = "\')\"><div class='music_normal music_item_num'>";
var html_part3 = "</div><div class='music_normal music_item_name'>";
var html_part4 = "</div><div class='music_normal music_item_duration'>";
var html_part5 = "</div></div>";
function showResults2(results,sww) {
    $(".content_list").html(adm_html);
    var html = "";
    var entries = results.items;
    var num=0;
    $.each(entries, function (index, value) {
        num++;
        if (sww)
        {
          var title = value.snippet.title;
          var vid = value.id.videoId;
          $(".list_title").html("搜尋結果");
        }
        else
        {
          var title = value.snippet.title;
          var vid = value.snippet.resourceId.videoId;
          $(".list_title").html(value.snippet.channelTitle);
          playlist.push(vid);
        }
        //var thumbnail = value.snippet.thumbnails.default.url;
        //html += '<div class=playitem onclick="playnow(\'' + vid +'\')">' + title + '</div>';
        //html += '<img src="' + thumbnail + '">';
        full_html=html_part1+vid+html_part2+num+html_part3+title+html_part4+"00:00"+html_part5;
        $(".content_list").append(full_html);
    }); 
    $(".content_list").append("<div class='expand_box'></div>");
    
    //$('#search-results').html(html);
}

