var str = ""
var i = 0
var typing_inst

$(".code").click(function()
  {
    $(".code").val("");
  }
)

function uniCharCode(event) {
    if (event.keyCode == 13)
    {
      $(".search").trigger("click");
    }
}

$(".search").click(function()
  {
    var user_code = $(".code").val();
    var chk = 1;
    switch (user_code)
    {
      case "123":
        str = "Hi, 測試成功了, 以後可以開始體驗小密語哩 ^_^";
        break;
      case "456":
        str = "密語取得方式未來你就知道了, 一次不要開太多個密語阿, 不然我會很累 O.o";
        break;
      case "789":
        str = "上班加油! (Po.o)";
        break;
      case "11222":
        str = "是哪個暖男會幫你準備一個月份的上班用盒子呢? 裡面還偷塞小心機紙條呢? 海豹等秀秀貼圖支援⊙w⊙";
        break;
      case "99000":
        str = "盒子總有用完的一天, 密語總有看完的一天, 但是我們只有入口沒有盡頭ovo";
        break;
      case "99112":
        str = "誰還記得是誰.. 不, 應該是 誰還記得是誰晚班的時候都會陪上班呢? 是誰呢?";
        break;
      case "22480":
        str = "現在上班要自己多多照顧自己哦, 晚班比較冷, 外面又黑, 又沒有我陪下班, 一切要自己小心, 不要讓我擔心!";
        break;
      case "00010":
        str = "小米8 小米8 怎麼還沒來~~ 這個密語讓你失望了 ㄎㄎ  ^_^ 多送你一個code: 01010";
        break;
      case "01010":
        str = "我猜現在已經是2019了, 2014~2019...5黏!! 我們認識快5黏囉!! ";
        break;
      case "16905":
        str = "人跟人之間最安全的距離是122公分, 遇上了喜歡的人, 我們會努力把距離縮短, 如今我們沒有距離, 是抱抱";
        break;
      case "02112":
        str = "一個人的夜晚, 多長都沒有意思, 有你的夜晚, 徹夜通宵都不夠窩";
        break;
      case "61500":
        str = "好的愛情是你透過一個男人看到世界, 我, 給了你全世界 ^_^";
        break;
      case "78008":
        str = "幸福，就是一個寶寶遇到一個寶寶，引來無數人的羨慕和嫉妒，風風雨雨，平平淡淡";
        break;
      case "91883":
        str = "我喜歡你，不是因為你是一個怎樣的人，而是因為與你在一起時，我變成了最真實最快樂的自己";
        break;
      case "29001":
        str = "對的時間，遇見對的人，是一生幸福；對的時間，遇見錯的人，是一場心傷；錯的時間，遇見錯的人，是一段荒唐；錯的時間，遇見對的人，是一生嘆息，但是我們逆轉了嘆息，轉化為幸福的永恆";
        break;
      case "91680":
        str = "On Going ^_^";
        break;
      case "75755":
        str = "On Going ^_^";
        break;
      case "03660":
        str = "On Going ^_^";
        break;
      case "38521":
        str = "On Going ^_^";
        break;
      case "89758":
        str = "On Going ^_^";
        break;
      case "08080":
        str = "On Going ^_^";
        break;
      case "12121":
        str = "On Going ^_^";
        break;
      case "99889":
        str = "On Going ^_^";
        break;
      default:
        chk = 0;
         $('#typewriter').text("Wrong CODE!");
         warn = setInterval(function()
                {   $('#typewriter').text("");
                    $("#codebox").val("");
                    $("#codebox").focus();
                    clearInterval(warn); 
                }, 900);
        break;
    }
    if (chk) 
    {
        type_init();
    }
  }
)

function type_init()
{
  i = 0;
  typing();
  typing_inst = setInterval(typing, 200);
}

function typing()
{
    
    if(i < str.length -1)
    {
        $('#typewriter').text(str.substr(0,i) + "_");
        i++;
    }
    else if(i == str.length-1)
    {
        $('#typewriter').text(str);
        clearInterval(typing_inst);
        $("#codebox").val("");
        $("#codebox").focus();
    }
}