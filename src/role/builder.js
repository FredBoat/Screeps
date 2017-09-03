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
                creep.moveTo(target);
            }
        } else {
            var site = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES);
            if (creep.build(site) === ERR_NOT_IN_RANGE) {
                creep.moveTo(site, {
                    visualizePathStyle: {
                        fill: 'transparent',
                        stroke: '#fff',
                        lineStyle: 'dashed',
                        strokeWidth: .15,
                        opacity: .1
                    }
                });
            }
        }
    }
};

module.exports = role;