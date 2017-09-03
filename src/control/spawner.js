var roleBuilder = require("role.builder");
var roleHauler = require("role.hauler");
var roleMiner = require("role.miner");
var roleUpgrader = require("role.upgrader");

module.exports = {
    run: function (room) {
        var spawn = this.getSpawnFromRoom(room);
        if(!spawn){
            return;
        }



        if (room.memory.minerSlots === undefined) {
            room.memory.minerSlots = roleMiner.getTotalSlots(room);
        }

        var desiredMiners = room.memory.minerSlots;
        var desiredHaulers = 2;
        var desiredUpgraders = 2;
        var desiredBuilders = 1;

        var counts = {
            miner: 0,
            hauler: 0,
            upgrader: 0,
            builder: 0
        };

        for(var name in Game.creeps) {
            var creep = Game.creeps[name];

            if(creep.memory.home === room.name){
                counts[creep.memory.role]++;
            }
        }

        // Make sure we don't just create a bunch of miners without haulers
        if (counts["hauler"] === 0 && counts["miner"] !== 0) {
            desiredMiners = 0;
        }

        room.memory.roles = counts;

        //Spawn more creeps if needed
        if (desiredMiners > counts["miner"]){
            spawn.createCreep(roleMiner.design(room), undefined,                      {role: "miner", home: room.name});
        } else if (desiredHaulers > counts["hauler"]){
            spawn.createCreep(roleHauler.design(room), undefined,                     {role: "hauler", home: room.name});
        } else if (desiredUpgraders > counts["upgrader"]){
            spawn.createCreep(roleUpgrader.design(room), undefined,                   {role: "upgrader", home: room.name});
        } else if (desiredBuilders > counts["builder"]){
            spawn.createCreep(roleBuilder.design(room), undefined,                    {role: "builder", home: room.name});
        }
    },

    //Returns a vacant one (if any)
    getSpawnFromRoom: function(room){
        if(!room){
            return;
        }
        var spawns = room.find(FIND_MY_SPAWNS, {
            filter: function(spawn){
                return !spawn.spawning;
            }
        });
        return spawns[0];
    }
};