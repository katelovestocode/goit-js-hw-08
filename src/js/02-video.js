import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');
const STORAGE_TIME = 'videoplayer-current-time';
let storageTime = localStorage.getItem(STORAGE_TIME);

/* Using the try...catch construct, so that the script continues to run even after throwing an error.
   - if - there is a storageTime - player is started and running
   then we bring it to the object type with JSON.parse() and take "seconds" value
   - if - "seconds" value exists: player takes the value and assigned to setCurrentTime 
     which means it will save the current time even if the browser is reloaded it will start the video at 
     setCurrentTime
   - else - remove the value of StorageTime from the localStorage
*/
try {
  if (storageTime) {
    const storageTimeParsed = JSON.parse(storageTime);
    const storageTimeSeconds = storageTimeParsed;
    if (storageTimeSeconds && storageTimeSeconds > 0) {
      player.setCurrentTime(storageTimeSeconds);
    } else {
      localStorage.removeItem(STORAGE_TIME);
    }
  }
} catch (error) {
  console.log(error.message);
}

/** function onPlay is saving to the localStorage an object with playback information
    that is passed in the "data" parameter */
const onPlay = function (data) {
  localStorage.setItem(STORAGE_TIME, JSON.stringify(data['seconds']));
  console.log(data['seconds']);
};

/** calling a function onPlay and tracking of current time playback by:
    passing an argument "timeupdate" which is an obejct with three children 
   {seconds:, percent:, duration:} to the parameter "data" in function onPlay
*/
player.on('timeupdate', throttle(onPlay, 1000));
