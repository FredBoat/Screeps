var role = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var room = creep.room;
        var target = room.find(FIND_SOURCES)[0];
        if(!target){
            creep.say("Target?");
            return;
        }

        if(creep.harvest(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {
                visualizePathStyle: {
                    fill: 'transparent',
                    stroke: '#fff',
                    lineStyle: 'solid',
                    strokeWidth: .15,
                    opacity: .1
                }
            });
        }
    },

    design: function (room) {
        if (room.memory.roles.miner === 0) {
            console.log(room.memory.roles.miner);
            return [WORK, MOVE];
        } else {
            return [WORK, WORK, WORK, MOVE];
        }
    }

};

module.exports = role;