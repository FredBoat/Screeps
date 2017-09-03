module.exports = {
    run: function (room) {
        var spawn = this.getSpawnFromRoom(room);
        if(!spawn){
            return;
        }

        var desiredMiners = 2;
        var desiredHaulers = 2;

        var counts = {};

        for(var name in Game.creeps) {
            var creep = Game.creeps[name];

            if(creep.memory.home === room.name){
                counts[creep.memory.role] = counts[creep.memory.role] === undefined
                    ? 0
                    : counts[creep.memory.role] + 1;
            }
        }

        //Spawn more creeps if needed
        if (desiredMiners > counts["miner"]){
            spawn.createCreep([MOVE, WORK, CARRY], undefined,   {role: 'miner', home: room.name});
        } else if (desiredHaulers > counts["hauler"]){
            spawn.createCreep([MOVE, CARRY], undefined,         {role: 'hauler', home: room.name});
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