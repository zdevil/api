$(document).ready(function() {
        $(function() { 
            var counter = 0
          $.ajax({
            url:'/st-feed.xml',
            dataType:'xml',
            type:'GET',
            success:function(xml) {
              $(xml).find('entry').slice(0,  $('#forum-question').attr('data-limit')).each(function( counter ) {
                var title = $(this).find("title").text(); 
                var des = $(this).find("description").text();
                var updated = $(this).find("updated").text();
                var link = $(this).find("link").text();
                var href = $(this).find("id").text();
                var $link = $("<a class='st-link'></a>").attr('href',href).attr('target','_blank').html(title);
                var date = new Date(updated);
                var $date = $('<p class="date"></p>').text(ISODateString(date)   );
                var wrapper = "<li class='single-feed'>";
                $(".stackoverflow-feed").append($(wrapper).append($link,$date));                   })
            },
            error:function() {
              console.log("I am sorry, But I can't fetch that feed");
            }
          });
        });

         $(function() {
           var toc = $("#sidebar").tocify({ 
            highlightDefault: true,
            showAndHide: true,
            scrollTo: 80,
            selector: "h1,h2" });
        });

        function ISODateString(d){
          function pad(n){return n<10 ? '0'+n : n}
          return d.getUTCMonth()+'-'
              + pad(d.getUTCMonth()+1)+'-'
              + pad(d.getUTCFullYear())+'  '
              + pad(d.getUTCHours())+':'
              + pad(d.getUTCMinutes())+':'
              + pad(d.getUTCSeconds());
        }
});
$(window).load(function() {
  $("#sidebar ul").each(function()
  {
    console.log($(this).has("ul li").next('ul').length);
    if($(this).has("ul li").next('ul').length)
    {
        $(this).find('a').prepend("<span class='sub_header_arrow'></span>");
    }
  })
});
