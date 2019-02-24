export  var queueVideos=[];
export var playVideoId=[];
export var videoRepeat=1;
export var quequeRepeat=0;
export class QueueService{
    queueVideo=[];
   setQueueVideo(video) {
       this.queueVideo.push(video);
   }
   getQueueVideo(){
       return this.queueVideo;
   }
}