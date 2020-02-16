import React, { Component } from "react"
import uuid from "uuid"
import InnerHTML from "dangerously-set-inner-html"
import { Layout } from "antd"

const agoraVideoChatCode = () => `
<script type="text/javascript">
    $("#mic-btn").prop("disabled", true);
    $("#video-btn").prop("disabled", true);
    $("#screen-share-btn").prop("disabled", true);
    $("#exit-btn").prop("disabled", true);

    $(document).ready(function(){
        $("#modalForm").modal("show");
    });

    var app_id = "1d595486132b4f129d960346a5dfefb2"
    var channel_name = "test"
    var token = "0061d595486132b4f129d960346a5dfefb2IACrK2g+caVtV5Sm9Lz7Y6pUmhu5YpKJTewx/vT9r2CJBgx+f9gAAAAAEADB6e0i4dhJXgEAAQDg2Ele"

    /////////////
    /// ui.js ///

    // join channel modal
    $( "#join-channel" ).click(function( event ) {
      var agoraAppId = app_id
      var agoraToken = token
      var channelName = channel_name
      initClientAndJoinChannel(agoraAppId, channelName, agoraToken);
      $("#modalForm").modal("hide");
    });
    
    function get_params(vars) {
        return vars
    }
    
    
    // UI buttons
    function enableUiControls(localStream) {
    
      $("#mic-btn").prop("disabled", false);
      $("#video-btn").prop("disabled", false);
      $("#screen-share-btn").prop("disabled", false);
      $("#exit-btn").prop("disabled", false);
    
      $("#mic-btn").click(function(){
        toggleMic(localStream);
      });
    
      $("#video-btn").click(function(){
        toggleVideo(localStream);
      });
    
      $("#screen-share-btn").click(function(){
        toggleScreenShareBtn(); // set screen share button icon
        $("#screen-share-btn").prop("disabled",true); // disable the button on click
        if(screenShareActive){
          stopScreenShare();
        } else {
          initScreenShare(); 
        }
      });
    
      $("#exit-btn").click(function(){
        console.log("so sad to see you leave the channel");
        leaveChannel(); 
      });
    
      // keyboard listeners 
      $(document).keypress(function(e) {
        switch (e.key) {
          case "m":
            console.log("squick toggle the mic");
            toggleMic(localStream);
            break;
          case "v":
            console.log("quick toggle the video");
            toggleVideo(localStream);
            break; 
          case "s":
            console.log("initializing screen share");
            toggleScreenShareBtn(); // set screen share button icon
            $("#screen-share-btn").prop("disabled",true); // disable the button on click
            if(screenShareActive){
              stopScreenShare();
            } else {
              initScreenShare(); 
            }
            break;  
          case "q":
            console.log("so sad to see you quit the channel");
            leaveChannel(); 
            break;   
          default:  // do nothing
        }
    
        // (for testing) 
        if(e.key === "r") { 
          window.history.back(); // quick reset
        }
      });
    }
    
    function toggleBtn(btn){
      btn.toggleClass('btn-dark').toggleClass('btn-danger');
    }
    
    function toggleScreenShareBtn() {
      $('#screen-share-btn').toggleClass('btn-danger');
      $('#screen-share-icon').toggleClass('fa-share-square').toggleClass('fa-times-circle');
    }
    
    function toggleVisibility(elementID, visible) {
      if (visible) {
        $(elementID).attr("style", "display:block");
      } else {
        $(elementID).attr("style", "display:none");
      }
    }
    
    function toggleMic(localStream) {
      toggleBtn($("#mic-btn")); // toggle button colors
      $("#mic-icon").toggleClass('fa-microphone').toggleClass('fa-microphone-slash'); // toggle the mic icon
      if ($("#mic-icon").hasClass('fa-microphone')) {
        localStream.unmuteAudio(); // enable the local mic
        toggleVisibility("#mute-overlay", false); // hide the muted mic icon
      } else {
        localStream.muteAudio(); // mute the local mic
        toggleVisibility("#mute-overlay", true); // show the muted mic icon
      }
    }
    
    function toggleVideo(localStream) {
      toggleBtn($("#video-btn")); // toggle button colors
      $("#video-icon").toggleClass('fa-video').toggleClass('fa-video-slash'); // toggle the video icon
      if ($("#video-icon").hasClass('fa-video')) {
        localStream.unmuteVideo(); // enable the local video
        toggleVisibility("#no-local-video", false); // hide the user icon when video is enabled
      } else {
        localStream.muteVideo(); // disable the local video
        toggleVisibility("#no-local-video", true); // show the user icon when video is disabled
      }
    }

    //////////////////////////
    /// agora-interface.js ///

    // video profile settings
    var cameraVideoProfile = '480p_4'; // 640 × 480 @ 30fps  & 750kbs
    var screenVideoProfile = '480p_2'; // 640 × 480 @ 30fps

    // create client instances for camera (client) and screen share (screenClient)
    var client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'}); 
    var screenClient = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'}); 

    // stream references (keep track of active streams) 
    var remoteStreams = {}; // remote streams obj struct [id : stream] 

    var localStreams = {
    camera: {
        id: "",
        stream: {}
    },
    screen: {
        id: "",
        stream: {}
    }
    };

    var mainStreamId; // reference to main stream
    var screenShareActive = false; // flag for screen share 

    function initClientAndJoinChannel(agoraAppId, channelName, tokenName) {
    // init Agora SDK
    client.init(agoraAppId, function () {
        console.log("AgoraRTC client initialized");
        joinChannel(channelName, tokenName); // join channel upon successfull init
    }, function (err) {
        console.log("[ERROR] : AgoraRTC client init failed", err);
    });
    }


    client.on('stream-published', function (evt) {
    console.log("Publish local stream successfully");
    });

    // connect remote streams
    client.on('stream-added', function (evt) {
    var stream = evt.stream;
    var streamId = stream.getId();
    console.log("new stream added: " + streamId);
    // Check if the stream is local
    if (streamId != localStreams.screen.id) {
        console.log('subscribe to remote stream:' + streamId);
        // Subscribe to the stream.
        client.subscribe(stream, function (err) {
        console.log("[ERROR] : subscribe stream failed", err);
        });
    }
    });

    client.on('stream-subscribed', function (evt) {
    var remoteStream = evt.stream;
    var remoteId = remoteStream.getId();
    remoteStreams[remoteId] = remoteStream;
    console.log("Subscribe remote stream successfully: " + remoteId);
        addRemoteStreamMiniView(remoteStream);
    });

    // remove the remote-container when a user leaves the channel
    client.on("peer-leave", function(evt) {
    var streamId = evt.stream.getId(); // the the stream id
    if(remoteStreams[streamId] != undefined) {
        remoteStreams[streamId].stop(); // stop playing the feed
        delete remoteStreams[streamId]; // remove stream from list
        if (streamId == mainStreamId) {
        var streamIds = Object.keys(remoteStreams);
        var randomId = streamIds[Math.floor(Math.random()*streamIds.length)]; // select from the remaining streams
        remoteStreams[randomId].stop(); // stop the stream's existing playback
        var remoteContainerID = '#' + randomId + '_container';
        $(remoteContainerID).empty().remove(); // remove the stream's miniView container
        remoteStreams[randomId].play('full-screen-video'); // play the random stream as the main stream
        mainStreamId = randomId; // set the new main remote stream
        } else {
        var remoteContainerID = '#' + streamId + '_container';
        $(remoteContainerID).empty().remove(); // 
        }
    }
    });

    // show mute icon whenever a remote has muted their mic
    client.on("mute-audio", function (evt) {
    toggleVisibility('#' + evt.uid + '_mute', true);
    });

    client.on("unmute-audio", function (evt) {
    toggleVisibility('#' + evt.uid + '_mute', false);
    });

    // show user icon whenever a remote has disabled their video
    client.on("mute-video", function (evt) {
    var remoteId = evt.uid;
    // if the main user stops their video select a random user from the list
    if (remoteId != mainStreamId) {
        // if not the main vidiel then show the user icon
        toggleVisibility('#' + remoteId + '_no-video', true);
    }
    });

    client.on("unmute-video", function (evt) {
    toggleVisibility('#' + evt.uid + '_no-video', false);
    });

    // join a channel
    function joinChannel(channelName, tokenID) {
    var token = tokenID;
    var userID = null; // set to null to auto generate uid on successfull connection
    client.join(token, channelName, userID, function(uid) {
        console.log("User " + uid + " join channel successfully");
        createCameraStream(uid);
        localStreams.camera.id = uid; // keep track of the stream uid 
    }, function(err) {
        console.log("[ERROR] : join channel failed", err);
        console.log("User Log " + tokenID);
    });
    }

    // video streams for channel
    function createCameraStream(uid) {
    var localStream = AgoraRTC.createStream({
        streamID: uid,
        audio: true,
        video: true,
        screen: false
    });
    localStream.setVideoProfile(cameraVideoProfile);
    localStream.init(function() {
        console.log("getUserMedia successfully");
        // TODO: add check for other streams. play local stream full size if alone in channel
        localStream.play('local-video'); // play the given stream within the local-video div

        // publish local stream
        client.publish(localStream, function (err) {
        console.log("[ERROR] : publish local stream error: " + err);
        });
    
        enableUiControls(localStream); // move after testing
        localStreams.camera.stream = localStream; // keep track of the camera stream for later
    }, function (err) {
        console.log("[ERROR] : getUserMedia failed", err);
    });
    }

    // SCREEN SHARING
    function initScreenShare() {
    screenClient.init(agoraAppId, function () {
        console.log("AgoraRTC screenClient initialized");
        joinChannelAsScreenShare();
        screenShareActive = true;
        // TODO: add logic to swap button
    }, function (err) {
        console.log("[ERROR] : AgoraRTC screenClient init failed", err);
    });  
    }

    function joinChannelAsScreenShare() {
    var token = generateToken();
    var userID = null; // set to null to auto generate uid on successfull connection
    screenClient.join(token, channelName, userID, function(uid) { 
        localStreams.screen.id = uid;  // keep track of the uid of the screen stream.
        
        // Create the stream for screen sharing.
        var screenStream = AgoraRTC.createStream({
        streamID: uid,
        audio: false, // Set the audio attribute as false to avoid any echo during the call.
        video: false,
        screen: true, // screen stream
        extensionId: 'minllpmhdgpndnkomcoccfekfegnlikg', // Google Chrome:
        mediaSource:  'screen', // Firefox: 'screen', 'application', 'window' (select one)
        });
        screenStream.setScreenProfile(screenVideoProfile); // set the profile of the screen
        screenStream.init(function(){
        console.log("getScreen successful");
        localStreams.screen.stream = screenStream; // keep track of the screen stream
        $("#screen-share-btn").prop("disabled",false); // enable button
        screenClient.publish(screenStream, function (err) {
            console.log("[ERROR] : publish screen stream error: " + err);
        });
        }, function (err) {
        console.log("[ERROR] : getScreen failed", err);
        localStreams.screen.id = ""; // reset screen stream id
        localStreams.screen.stream = {}; // reset the screen stream
        screenShareActive = false; // resest screenShare
        toggleScreenShareBtn(); // toggle the button icon back (will appear disabled)
        });
    }, function(err) {
        console.log("[ERROR] : join channel as screen-share failed", err);
    });

    screenClient.on('stream-published', function (evt) {
        console.log("Publish screen stream successfully");
        localStreams.camera.stream.disableVideo(); // disable the local video stream (will send a mute signal)
        localStreams.camera.stream.stop(); // stop playing the local stream
        // TODO: add logic to swap main video feed back from container
        remoteStreams[mainStreamId].stop(); // stop the main video stream playback
        addRemoteStreamMiniView(remoteStreams[mainStreamId]); // send the main video stream to a container
        // localStreams.screen.stream.play('full-screen-video'); // play the screen share as full-screen-video (vortext effect?)
        $("#video-btn").prop("disabled",true); // disable the video button (as cameara video stream is disabled)
    });
    
    screenClient.on('stopScreenSharing', function (evt) {
        console.log("screen sharing stopped", err);
    });
    }

    function stopScreenShare() {
    localStreams.screen.stream.disableVideo(); // disable the local video stream (will send a mute signal)
    localStreams.screen.stream.stop(); // stop playing the local stream
    localStreams.camera.stream.enableVideo(); // enable the camera feed
    localStreams.camera.stream.play('local-video'); // play the camera within the full-screen-video div
    $("#video-btn").prop("disabled",false);
    screenClient.leave(function() {
        screenShareActive = false; 
        console.log("screen client leaves channel");
        $("#screen-share-btn").prop("disabled",false); // enable button
        screenClient.unpublish(localStreams.screen.stream); // unpublish the screen client
        localStreams.screen.stream.close(); // close the screen client stream
        localStreams.screen.id = ""; // reset the screen id
        localStreams.screen.stream = {}; // reset the stream obj
    }, function(err) {
        console.log("client leave failed ", err); //error handling
    }); 
    }

    // REMOTE STREAMS UI
    function addRemoteStreamMiniView(remoteStream){
    var streamId = remoteStream.getId();
    // append the remote stream template to #remote-streams
    $('#remote-streams').append(
        $('<div/>', {'id': streamId + '_container',  'class': 'remote-stream-container col'}).append(
        $('<div/>', {'id': streamId + '_mute', 'class': 'mute-overlay'}).append(
            $('<i/>', {'class': 'fas fa-microphone-slash'})
        ),
        $('<div/>', {'id': streamId + '_no-video', 'class': 'no-video-overlay text-center'}).append(
            $('<i/>', {'class': 'fas fa-user'})
        ),
        $('<div/>', {'id': 'agora_remote_' + streamId, 'class': 'remote-video'})
        )
    );
    remoteStream.play('agora_remote_' + streamId); 

    var containerId = '#' + streamId + '_container';
    $(containerId).dblclick(function() {
        // play selected container as full screen - swap out current full screen stream
        remoteStreams[mainStreamId].stop(); // stop the main video stream playback
        addRemoteStreamMiniView(remoteStreams[mainStreamId]); // send the main video stream to a container
        $(containerId).empty().remove(); // remove the stream's miniView container
        remoteStreams[streamId].stop() // stop the container's video stream playback
        remoteStreams[streamId].play('full-screen-video'); // play the remote stream as the full screen video
        mainStreamId = streamId; // set the container stream id as the new main stream id
    });
    }

    function leaveChannel() {
    
    if(screenShareActive) {
        stopScreenShare();
    }

    client.leave(function() {
        console.log("client leaves channel");
        localStreams.camera.stream.stop() // stop the camera stream playback
        client.unpublish(localStreams.camera.stream); // unpublish the camera stream
        localStreams.camera.stream.close(); // clean up and close the camera stream
        $("#remote-streams").empty() // clean up the remote feeds
        //disable the UI elements
        $("#mic-btn").prop("disabled", true);
        $("#video-btn").prop("disabled", true);
        $("#screen-share-btn").prop("disabled", true);
        $("#exit-btn").prop("disabled", true);
        // hide the mute/no-video overlays
        toggleVisibility("#mute-overlay", false); 
        toggleVisibility("#no-local-video", false);
        // show the modal overlay to join
        $("#modalForm").modal("show"); 
    }, function(err) {
        console.log("client leave failed ", err); //error handling
    });
    }

    // use tokens for added security
    function generateToken() {
    return null; // TODO: add a token generation
    }
</script>
`

class VideoChatForm extends Component {
  render() {
    return(
        <Layout style={{height:"100vh"}}>
            <div class="container-fluid p-0">
                <div id="main-container">
                    <div id="buttons-container" class="row justify-content-center mt-3">
                        <div class="col-md-2 text-center">
                            <button id="mic-btn" type="button" class="btn btn-block btn-dark btn-lg">
                                <i id="mic-icon" class="fas fa-microphone"></i>
                            </button>
                        </div>
                        <div class="col-md-2 text-center">
                            <button id="join-channel"  type="button" class="btn btn-block btn-dark btn-lg">
                                <i id="video-icon" class="fas fa-video"></i>
                            </button>
                        </div>
                        <div class="col-md-2 text-center">
                            <button id="exit-btn"  type="button" class="btn btn-block btn-danger btn-lg">
                                <i id="exit-icon" class="fas fa-phone-slash"></i>
                            </button>
                        </div>
                    </div>
                    <div id="full-screen-video"></div>

                    <div id="lower-video-bar" class="row fixed-bottom mb-1">
                        <div id="remote-streams-container" class="container col-9 ml-1">
                            <div id="remote-streams" class="row">
                            </div>
                        </div>
                        <div id="local-stream-container" class="col p-0">
                            <div id="mute-overlay" class="col">
                                <i id="mic-icon" class="fas fa-microphone-slash"></i>
                            </div>
                            <div id="no-local-video" class="col text-center">
                                <i id="user-icon" class="fas fa-user"></i>
                            </div>
                            <div id="local-video" class="col p-0"></div>
                        </div>
                    </div>
                </div>
                <InnerHTML html={agoraVideoChatCode()}/>
            </div>
        </Layout>
    )
  }
}

export default VideoChatForm