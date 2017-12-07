var lockVolumes = {};
var volumeLimit = 100;
var c = 5;

function restrictVolumes(player, values) {
  volumeLimit = parseInt(values[0]);
  var discovery = player.discovery;
  console.log("restricting volume to " + volumeLimit + '.');

  discovery.removeListener("volume", restrictVolume);
  discovery.on("volume", restrictVolume);
}

function unRestrictVolumes(player) {
  console.log("unlocking volumes");
  var discovery = player.discovery;
  discovery.removeListener("volume", restrictVolume);
}

function restrictVolume(info, player) {
  if (!player) {
    player = this.getPlayerByUUID(info.uuid);
  }
  // Only do this if volume differs
  if (player.state.volume > volumeLimit) {
    console.log(player.state.volume + "is too high!");
    player.setVolume(volumeLimit);
  } else {
    console.log(player.state.volume + "is too fine.");
  }
  if (c >= 0) {
    setTimeout(function() {
      c--;
      restrictVolume(info, player);
    }, 1000);
  } else {
    c = 5;
  }
}

module.exports = function (api) {
  api.registerAction('restrictvolumes', restrictVolumes);
  api.registerAction('unrestrictvolumes', unRestrictVolumes);
}
