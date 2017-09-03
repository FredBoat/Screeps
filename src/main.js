var construction = require("control.construction");
var gc = require("control.gc");
var spawner = require("control.spawner");
var roleBuilder = require("role.builder");
var roleHauler = require("role.hauler");
var roleMiner = require("role.miner");
var roleUpgrader = require("role.upgrader");

module.exports.loop = function () {

    if (!Memory.misc) Memory.misc = {};

    //Start with gc checks
    if(Memory.misc.creepsLastTick){
        if(Memory.misc.creepsLastTick > Game.creeps.length){
            gc.gcCreep();
        }
    }
    Memory.misc.creepsLastTick = Game.creeps.length;

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        try {
            switch (creep.memory.role) {
                case "miner":
                    roleMiner.run(creep);
                    break;
                case "hauler":
                    roleHauler.run(creep);
                    break;
                case "upgrader":
                    roleUpgrader.run(creep);
                    break;
                case "builder":
                    roleBuilder.run(creep);
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
        if (room.controller.level >= 2)
            construction.runExtensionBuilder(room);
    }
};