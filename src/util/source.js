Source.prototype.getSlots = function(){
    var slots = 0;
    slots = this.room.lookForAt(LOOK_TERRAIN, this.pos.x-1, this.pos.y+1)[0] === "wall" ? slots : slots + 1;
    slots = this.room.lookForAt(LOOK_TERRAIN, this.pos.x,   this.pos.y+1)[0] === "wall" ? slots : slots + 1;
    slots = this.room.lookForAt(LOOK_TERRAIN, this.pos.x+1, this.pos.y+1)[0] === "wall" ? slots : slots + 1;
    slots = this.room.lookForAt(LOOK_TERRAIN, this.pos.x+1, this.pos.y)[0] === "wall" ? slots : slots + 1;
    slots = this.room.lookForAt(LOOK_TERRAIN, this.pos.x+1, this.pos.y-1)[0] === "wall" ? slots : slots + 1;
    slots = this.room.lookForAt(LOOK_TERRAIN, this.pos.x,   this.pos.y-1)[0] === "wall" ? slots : slots + 1;
    slots = this.room.lookForAt(LOOK_TERRAIN, this.pos.x-1, this.pos.y-1)[0] === "wall" ? slots : slots + 1;
    slots = this.room.lookForAt(LOOK_TERRAIN, this.pos.x-1, this.pos.y)[0] === "wall" ? slots : slots + 1;

    slots = Math.min(slots, 2);

    return slots;
};

Source.prototype.getMiners = function() {
    if (this.room.memory[this.id] === undefined) {
        console.log("reset")
        this.room.memory[this.id] = {};
        this.room.memory[this.id].miners = [];
        return [];
    }

    var names = [];
    var miners = [];
    for (var k in this.room.memory[this.id].miners) {
        var name = this.room.memory[this.id].miners[k];
        if (Game.creeps[name] !== undefined) {
            names[names.length] = name;
            miners[miners.length] = Game.creeps[name];
        }
    }

    this.room.memory[this.id].miners = names;

    return miners;
};

Source.prototype.registerMiner = function(creep) {
    if (this.room.memory[this.id] === undefined) {
        this.room.memory[this.id] = {};
        this.room.memory[this.id].miners = [];
    }

    this.room.memory[this.id].miners[this.room.memory[this.id].miners.length] = creep.name;
}