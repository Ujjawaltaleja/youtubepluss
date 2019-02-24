const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=`;
const mid_url = `&type=video&key=AIzaSyAGM_4sccNhvm3kX_0KALUIE_pOGLcKrZ4&maxResults=10`;
export const searchVideosByQuery = query =>
  fetch(`${url}${query}${mid_url}`).then(res => res.json());

const url_cat = `https://www.googleapis.com/youtube/v3/videos?part=snippet&regionCode=IN&chart=mostPopular
&videoCategoryId=`;
const mid_cat = `&maxResults=5&key=AIzaSyAGM_4sccNhvm3kX_0KALUIE_pOGLcKrZ4`;
export const popularSong = catId =>
  fetch(`${url_cat}${catId}${mid_cat}`).then(res => res.json());

export const getRelatedVideos = id =>
  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&key=AIzaSyAGM_4sccNhvm3kX_0KALUIE_pOGLcKrZ4&maxResults=20`
  ).then(res => res.json());
  
  export var obj={};
  