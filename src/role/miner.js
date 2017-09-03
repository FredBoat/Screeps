require("util.source");
require("util.pathfinding");

var role = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var room = creep.room;
        Game.getObjectById(creep.memory.target);

        if (creep.memory.target === undefined) {
            var source = this.getVacantSource(room);
            source.registerMiner(creep);
            creep.memory.target = source.id;
        }

        var target = Game.getObjectById(creep.memory.target);

        if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
            creep.moveToCheap(target, {
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

    getVacantSource: function (room, pos) {
        var filter = {
            filter: function (source) {
                return source.getMiners().length < source.getSlots()
                    && source.pos.findInRange(FIND_HOSTILE_STRUCTURES, 20, {
                        filter: function (struct) {
                            return struct.structureType !== STRUCTURE_CONTROLLER
                        }
                    }).length === 0;
            }
        };

        // noinspection EqualityComparisonWithCoercionJS
        if (pos != null) {
            return pos.findClosestByPath(FIND_SOURCES, filter);
        } else {
            return room.find(FIND_SOURCES, filter)[0];
        }
    },

    getTotalSlots: function(room) {
        var sources = room.find(FIND_SOURCES, {
            filter: function(source) {
                return source.pos.findInRange(FIND_HOSTILE_STRUCTURES, 20, {
                    filter: function (struct) {
                        return struct.structureType !== STRUCTURE_CONTROLLER
                    }
                }).length === 0;
            }
        });

        var count = 0;

        for (var k in sources) {
            count += sources[k].getSlots();
        }

        return count;
    },

    design: function (room) {
        if (room.memory.roles.hauler === 0) {
            return [WORK, MOVE];
        } else {
            return [WORK, WORK, MOVE];
        }
    }

};

module.exports = role;