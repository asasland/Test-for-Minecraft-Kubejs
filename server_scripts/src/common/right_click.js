function getRandomInt(Weight) {
  min = Math.ceil(Weight[0]);
  max = Math.floor(Weight[1]);
  return Math.floor(Math.random() * (Weight[1] - Weight[0] + 1)) + Weight[0];
}

function blockMove(event,Ward,blockName){
    if(Ward != null && (event.block[Ward].id == "minecraft:air" || event.block[Ward].id == "minecraft:cave_air")){
        event.block.set("minecraft:air")
        switch(Ward){
            case 'up':
                event.block.up.set(blockName)
                break; 
            case 'north':
                event.block.north.set(blockName)
                break;
            case 'down':
                event.block.down.set(blockName)
                break;
            case 'south':
                event.block.south.set(blockName)
                break;
            case 'east':
                event.block.east.set(blockName)
                break;
            case 'west':
                event.block.west.set(blockName)
                break;
        }
    }
}

function getPlayerDirection(rayPos, blockPos,playerPos) {
    var finalPos = [
        rayPos[0] - blockPos[0],
        rayPos[1] - blockPos[1],
        rayPos[2] - blockPos[2]
    ];
    var pbVector = [
        
    ];
        if (finalPos[0] == 0) {
            return 'east';
        } 
        if(finalPos[0] == 1) {
            return 'west';
        }
        if (finalPos[1] == 0) {
            return 'up';
        } 
        if(finalPos[1] == 1) {
            return 'down';
        }
        if (finalPos[2] == 0) {
            return 'south';
        } 
        if(finalPos[2] == 1) {
            return 'north';
        }
        return null
}


onEvent('block.right_click',event =>{
    var player = event.player;
    if(event.block.id == 'minecraft:stone'){
        player = event.player;
        var target = player.rayTrace(1000);
        var rayPos = [target.hitX,target.hitY,target.hitZ];
        player.tell(rayPos);
        var blockPos = [event.block.x+0.0,
                        event.block.y+0.0,
                        event.block.z+0.0]
        blockMove(event,getPlayerDirection(rayPos,blockPos),'minecraft:stone');
    };
    
    if(event.block.id == 'minecraft:diorite'&& event.player.mainHandItem == 'minecraft:melon_slice'){
        player = event.player;
        player.tell("diorite");
        player.give(Item.of('3x minecraft:stone',{display:{Lore:["1111","8888"]}}));
        event.block.set("minecraft:air")
    };

    
    
    const decItem = {"yuushya:telephone_0":["§l电话",0], "yuushya:packed_crate":["§lxxx",0],"minecraft:stone":["§l石头",1]};
    const awardPool = ["twilightdays:mc","minecraft:diorite"]
    const awardWeight = {"yuushya:telephone_0":[2,6],"yuushya:packed_crate":[2,6],"minecraft:stone":[2,6]}

    if (event.block.id == 'minecraft:diorite') {
        var mainHandItem = player.mainHandItem;
        if (decItem.hasOwnProperty(mainHandItem.id)) {
            if(player.persistentData.isDecompose !== 1){
                mainHandItem.count -= 1
                player.persistentData.isDecompose = 1
                event.player.statusMessage = decItem[mainHandItem.id][0] + "§l已添加至队列中..."
                player.tell(text.yellow(decItem[mainHandItem.id][0] + '正在拆解'));
                event.server.scheduleInTicks(20, event.player, function (callback) {
                    callback.data.tell(text.yellow('拆解完成，物品已存放入背包内'));
                    callback.data.persistentData.isDecompose = 0;
                    var awardItem = Item.of(awardPool[decItem[mainHandItem.id][1]],getRandomInt(awardWeight[mainHandItem.id]));
                    callback.data.give(awardItem)
                });
            }
        }
    }
})

onEvent("item.right_click", event => {
    if (event.item.id == "minecraft:lever") {
        event.player.tell("已激活方块扫描");
        var TARGET_BLOCKS = [
            'minecraft:stone',
            'minecraft:dirt',
            'minecraft:grass_block'
        ];
        var RADIUS = 8;
        var player = event.player;
        
        var px = player.x;
        var py = player.y;
        var pz = player.z;

        for (var x = Math.floor(px - RADIUS); x <= Math.floor(px + RADIUS); x++) {
            for (var y = Math.floor(py - RADIUS); y <= Math.floor(py + RADIUS); y++) {
                for (var z = Math.floor(pz - RADIUS); z <= Math.floor(pz + RADIUS); z++) {
                    var block = event.player.world.getBlock(x,y,z)
                    if (block && TARGET_BLOCKS.indexOf(block.id) != -1) {
                        y += 0.6
                        event.server.runCommandSilent('/particle minecraft:spit ' + x + ' ' + y + ' '+ z + ' ' +'0.1 0.1 0.1 0.01 5 normal')
                    }
                }
            }
        }
    }
});