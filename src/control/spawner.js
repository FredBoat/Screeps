module.exports = {
    run: function (room) {
        var spawn = this.getSpawnFromRoom(room);
        if(!spawn){
            return;
        }

        var desiredMiners = 2;
        var desiredHaulers = 2;
        var desiredUpgraders = 4;

        var counts = {
            miner: 0,
            hauler: 0,
            upgrader: 0
        };

        for(var name in Game.creeps) {
            var creep = Game.creeps[name];

            if(creep.memory.home === room.name){
                counts[creep.memory.role]++;
            }
        }

        //Spawn more creeps if needed
        if (desiredMiners > counts["miner"]){
            spawn.createCreep([MOVE, WORK], undefined,                      {role: "miner", home: room.name});
        } else if (desiredHaulers > counts["hauler"]){
            spawn.createCreep([MOVE, CARRY], undefined,                     {role: "haule", home: room.name});
        } else if (desiredUpgraders > counts["upgrader"]){
            spawn.createCreep([MOVE, CARRY, CARRY, WORK], undefined,        {role: "upgrader", home: room.name});
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