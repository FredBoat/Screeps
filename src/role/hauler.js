require("util.pathfinding");

var role = {

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
                creep.moveToCheap(target);
            }
        } else {
            //TODO: Expand
            var target2 = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: function(structure){
                    return (structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_EXTENSION)
                        && structure.energyCapacity > structure.energy;
                }
            });
            if (creep.transfer(target2, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveToCheap(target2);
            }
        }
    },

    design: function (room) {
        return [CARRY, MOVE];
    }
};

module.exports = role;