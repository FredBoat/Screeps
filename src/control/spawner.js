module.exports = {
    run: function (room) {
        var spawn = this.getSpawnFromRoom(room);
        if(!spawn){
            return;
        }

        var desiredMiners = 2;

        var miners = 0;

        for(var name in Game.creeps) {
            var creep = Game.creeps[name];

            if(creep.memory.home === room.name){
                if (creep.memory.role === 'miner') {
                    miners++;
                }
            }
        }

        //Spawn more creeps if needed
        if (desiredMiners > miners){
            spawn.createCreep([MOVE, WORK], undefined, {role: 'miner', home: room.name});
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