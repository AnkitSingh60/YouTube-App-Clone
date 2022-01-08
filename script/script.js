  let API =  "AIzaSyDwzRu-HObFvzEOtjdc4kJEPcBvyblegI0"
  let search_result = document.getElementById("search_result")
  async function searchVideo(){
      try{
          let video_query = document.getElementById("video").value;
        //   console.log('video_query:', video_query)
          // console.log('video_query:', video_query)
          let responce = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${video_query}&type=video&key=${API}&maxResults=20`);  //&maxResults=30
          let data = await responce.json();
          let videos = data.items
        //   console.log('video:', video)
         appendVideo(videos)
      } catch(err){
          console.log('err:', err);
      };
  };
  const appendVideo = (arr) => {
          console.log('arr:', arr)
          search_result.innerHTML="";       
          arr.forEach((list)=>{
          // console.log('list:', list)
          // let v_id = list.id.videoId
          let {snippet,id: {videoId}} = list;
          console.log('snippet:', snippet)
        //   console.log('videoId:', videoId);
          let div = document.createElement("div");
          div.setAttribute("class", "box")
        //   let iframe = document.createElement("iframe");
        //   iframe.src = `https://www.youtube.com/embed/${videoId}`;
        //   iframe.width = "100%";
        //   iframe.height = "100%";
        //   //iframe.allowfullscreen = "true";
        //   iframe.setAttribute("allowfullscreen", true);
        //   div.append(iframe);
        let title = document.createElement('p');
        title.innerText = snippet.title;

        let thumbnail = document.createElement('img');
        thumbnail.src = snippet.thumbnails.medium.url;

        let data_to_send = {
            snippet: snippet,
            videoId: videoId,
            arr:arr
        };

        div.onclick = () =>{
            showVideo(data_to_send)
        }

        div.append(thumbnail,title);

        search_result.append(div);

        function showVideo(data){

            localStorage.setItem("clicked_video",JSON.stringify(data));

            window.location.href = "video.html"
        }





          search_result.append(div);
          });
  };
        searchVideo()   
