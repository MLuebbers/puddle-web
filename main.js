$(function() {
    const colors = ["#fffacd", "#ffd1e0", "#d0b6ff", "#ffc4a8"];
    let hours = new Date();
    hours.setTime(Date.now())
    if(hours.getHours() >= 8){
        $.get("https://api.github.com/repos/MLuebbers/puddle-web/contents/posts", function(data, status) {
            console.log(data);
            if(data.length === 0){
                $("body").append("<div id='alt'>All posts have expired. You can view the commit history at <a></a></div>");
            }
            data.forEach(element => {
                
                $.get(`https://api.github.com/repos/MLuebbers/puddle-web/commits?path=posts/${element.name}`, function(data, status) {
                    let date = data[0].commit.author.date;
                    let thresh_date = new Date("Wed Jan 15 1970 00:00:00 GMT-0500")
                    let diff_date = Date.now() - Date.parse(date)
                    console.log(date);
                    if(diff_date < thresh_date){
                        $.ajax({
                            headers: {
                                Accept: "application/vnd.github.v3.raw"
                            },
                            data: "data",
                            method: "GET",
                            url: `https://api.github.com/repos/MLuebbers/puddle-web/contents/posts/${element.name}`,
                    
                            success: function(response) {
                                element = $(`<section><div class='pushpin'>📌</div>${response}</section>`);
                                element.draggable();
                                element.css("background", colors[Math.floor(Math.random()*4)]);
                                element.css("top", (Math.random()*50-10) + "vh");
                                element.css("left", (Math.random()*50+15) + "vw");
                                element.appendTo("body");
                            }
                        });
                    }                 
                });
            });
        });
    } else {
        $("body").append("<div id='alt'>This page is only open between the hours of 8AM and 12AM. You can view the commit history at <a></a></div>");
    }
});

    