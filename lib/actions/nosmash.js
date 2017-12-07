
function nosmash(player) {
  console.log("smashing smash mouth");
  // Locate all volumes
  var discovery = player.discovery;

  discovery.removeListener("transport-state", transport);
  discovery.on("transport-state", transport);
}

function transport(state) {
  var artist = state.state.currentTrack.artist,
      track = state.state.currentTrack.title;

  var room = state.roomName,
      player = this.getPlayerByUUID(state.uuid);

  if (artist.match(/[Ss]mash\s[Mm]outh/) || track.match(/[Aa]ll.[Ss]tar/)) {
    console.log('no!');
    player.coordinator.nextTrack();
    player.coordinator.removeAllTracksFromQueue();

  } else {
    console.log('fine');
  }
}

module.exports = function (api) {
  api.registerAction('nosmash', nosmash);
}
