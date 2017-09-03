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
            creep.moveTo(target);
        }
    }

};

module.exports = role;