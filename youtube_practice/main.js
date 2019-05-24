$(document).ready(function()
{
    let pageToken;
    let enableLoad = true;
    // $("#search").submit(function(event){
    //     event.preventDefault();
    //     const key = $("#keyword").val()
    //     //$(#result-list).html('')
    //     //$(#result-list).empty()
        // $.ajax({
        //     url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${key}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
        //     type: "GET",
        //     success: function(data)
        //     {
        //         const{items,nextPageToken} = data;
        //         pageToken = nextPageToken;
        //         // console.log(data);
        //         // for(let i=0;i<data.items.length;i++)
        //         // {
        //         //     // $('#result-list').remove();
        //         //     const videoData = data.items[i];
        //         //     const videoId = videoData['id']['videoId'];
        //         //     const videoThumbnail = videoData['snippet']['thumbnails']['medium']['url'];
        //         //     const videoTitle = videoData['snippet']['title'];
        //         //     const videoDescription = videoData['snippet']['description'];
        //         //     const video = `
        //         //     <a class= "result col-md-12" href="https://www.youtube.com/watch?v=${videoId}?autoplay=true" targer="_blank">
        //         //     <img src = ${videoThumbnail} alt="">
        //         //     <div class="video_info">
        //         //         <h2 class = "title">${videoTitle}</h2>
        //         //         <p class = "description">${videoDescription}</p>
        //         //     <span>View >></span>
        //         //     </div>
        //         //     </a>
        //         //     `
        //         //     $('#result-list').append(video);
        //         // }
        //         // const {items} = data;
        //         // items.forEach((iteam,index)=>{
        //         //     console.log(item);
        //         //     $("#result-list").append(`
        //         //         <div>
        //         //             <img src = "${item.snippet.thumbnails.high.url}"/>
        //         //             <div>${item.snippet.title}</div>
        //         //         </div>
        //         //     `)
        //         // })
        //         //forEach,map,filter,reduce
        //         const results = items.map(function(item){
        //             return `
        //                 <div>
        //                     <img src = "${item.snippet.thumbnails.high.url}"/>
        //                     <div>${item.snippet.title}</div>
        //                 </div>
        //             `
        //         })
        //         $("#result-list").html(results.join(""));//thay results vao result list
        //     },
        //     error: function(error)
        //     {
        //         console.log(error);
        //     },
        // }
    
    let debounce ;
    let count = 1;
    $('#keyword').on("input",function()
    {
        if(count == 1)
        {
            $('#result-list').empty();
            const loading = `<div class="lds-ripple"><div></div><div></div></div>`;
            $('#result-list').append(loading);
            count=0;
        }
        if(debounce)
        {
            clearTimeout(debounce); //xoa debounce cu set debounce moi
        }
        debounce = setTimeout(function(){
            const key = $("#keyword").val();
            $.ajax({
                url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${key}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
                type: "GET",
                success: function(data)
                {
                    const{items,nextPageToken} = data;
                    pageToken = nextPageToken;
                    // console.log(data);
                    // for(let i=0;i<data.items.length;i++)
                    // {
                    //     // $('#result-list').remove();
                    //     const videoData = data.items[i];
                    //     const videoId = videoData['id']['videoId'];
                    //     const videoThumbnail = videoData['snippet']['thumbnails']['medium']['url'];
                    //     const videoTitle = videoData['snippet']['title'];
                    //     const videoDescription = videoData['snippet']['description'];
                    //     const video = `
                    //     <a class= "result col-md-12" href="https://www.youtube.com/watch?v=${videoId}?autoplay=true" targer="_blank">
                    //     <img src = ${videoThumbnail} alt="">
                    //     <div class="video_info">
                    //         <h2 class = "title">${videoTitle}</h2>
                    //         <p class = "description">${videoDescription}</p>
                    //     <span>View >></span>
                    //     </div>
                    //     </a>
                    //     `
                    //     $('#result-list').append(video);
                    // }
                    // const {items} = data;
                    // items.forEach((iteam,index)=>{
                    //     console.log(item);
                    //     $("#result-list").append(`
                    //         <div>
                    //             <img src = "${item.snippet.thumbnails.high.url}"/>
                    //             <div>${item.snippet.title}</div>
                    //         </div>
                    //     `)
                    // })
                    //forEach,map,filter,reduce
                    const results = items.map(function(item){
                        return `
                            <div>
                                <img src = "${item.snippet.thumbnails.high.url}"/>
                                <div>${item.snippet.title}</div>
                            </div>
                        `
                    })
                    $("#result-list").html(results.join(""));//thay results vao result list
                },
                error: function(error)
                {
                    console.log(error);
                },
            })
            count = 1;
        },2000) // set thoi gian cho la 1000
    })
    $(window).on("scroll",function()
    {
        const key = $("#keyword").val();
        const documentHeight= $(document).height();
        const windowHeight = $(window).height();
        const scrollTop = $(window).scrollTop();
        // console.log(documentHeight-(windowHeight+scrollTop));
        if(enableLoad && pageToken && documentHeight-(windowHeight+scrollTop)<400)
        {
            console.log(pageToken);
            enableLoad= false;
            $.ajax({
                url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${key}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${pageToken}`,
                type: "GET",
                
                success: function(data)
                {
                    
                    const{items,nextPageToken} = data;
                    pageToken = nextPageToken;

                    // items.forEach((iteam,index)=>{
                    //     console.log(item);
                    //     $("#result-list").append(`
                    //         <div>
                    //             <img src = "${item.snippet.thumbnails.high.url}"/>
                    //             <div>${item.snippet.title}</div>
                    //         </div>
                    //     `)
                    // })
                    //forEach,map,filter,reduce
                    const results = items.map(function(item){
                        return `
                            <div>
                                <img src = "${item.snippet.thumbnails.high.url}"/>
                                <div>${item.snippet.title}</div>
                            </div>
                        `
                    })
                    $("#result-list").append(results.join(""));//thay results vao result list
                    enableLoad = true;
                },
                error: function(error)
                {
                    console.log(error);
                },
            });
        }
        
    })
})
