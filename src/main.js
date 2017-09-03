var spawner = require("control.spawner");
var roleMiner = require("role.miner");

module.exports.loop = function () {
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        try {
            switch (creep.memory.role) {
                case "miner":
                    roleMiner.run(creep);
                    break;
            }
        } catch(err){
            console.log("Role error for " + creep.memory.role + " " + creep.name + ": "+err);
            Game.notify("Role error for " + creep.memory.role + " " + creep.name + ": "+err);
            creep.say(err);
        }
    }

    for(var k in Game.rooms) {
        var room = Game.rooms[k];
        spawner.run(room);
    }
};