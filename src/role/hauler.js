var roleExtractor = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var room = creep.room;

        if(creep.memory.isGathering && _.sum(creep.carry) === creep.carryCapacity){
            creep.memory.isGathering = false;
        } else if (_.sum(creep.carry) === 0){
            creep.memory.isGathering = true;
        }

        if (creep.memory.isGathering) {
            var target = room.find(FIND_DROPPED_RESOURCES)[0];

            if (creep.pickup(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            //TODO: Expand
            var target2 = room.find(FIND_MY_SPAWNS)[0];
            if (creep.transfer(target2, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target2);
            }
        }
    }
};

module.exports = roleExtractor;