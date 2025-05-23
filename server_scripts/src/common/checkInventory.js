onEvent("player.inventory.changed",event =>{
    let Inven = event.player.inventory;
    let map = new Map([['minecraft:bedrock', false], ['minecraft:apple', false], ['minecraft:stone', false]])
    let should = true;
    for(let i = 0; i < 36;i++){
        for(let key of map.keys()){
            if(Inven.get(i).id == key){
                map.set(key,true);
            }
        }
    }
    for(let value of map.values()){
        if(value == false){
            should = false
        }
    }
    if(should){
        event.player.tell("1111");
    }
})

const pos = [167,65,527]
onEvent('player.tick',event =>{
    if(event.player.persistentData.needrestart == 1){
        event.player.runCommand("/spawnpoint @p " + pos[0] + " " +pos[1] + " " + pos[2])
        event.player.persistentData.needrestart = 0
    }
})
onEvent("player.logged_in", event =>{
    event.player.persistentData.spawncount = 0;
    event.player.persistentData.isDecompose = 0;
})
onEvent('entity.death',event =>{
    if(event.entity.getType == Function){
        event.player.persistentData.spawncount -= 1;
    }
})

