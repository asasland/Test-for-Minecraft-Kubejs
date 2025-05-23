function weightedRandom(elements, weights) {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

    let random = Math.random() * totalWeight;

    for (let i = 0; i < elements.length; i++) {
        if (random < weights[i]) {
            return elements[i];
        }
        random -= weights[i];
    }
}


const case4TriggeredPlayers = {};

const players =  {
    "Beichuan_Li": 4,"Lettise": 1,"3999": 4,"lYC_SY": 0, "SSY123": 1,"Aletya": 1, 
    "OJJJXD": 4,"begoniainmay": 5, "PineliaSnow": 1,"Golden__Raven": 1, "JingMengBai": 1,
    "willdiwanws": 2, "zi_nuo": 1,"ppanfe": 0, "ShayX218": 3,"YYK_Bread": 4,
    "Na1Ka_":3,"MHOvO":4,"Buroonya":2,"SNOW":1,
};

let ores = ["minecraft:gold_ore","minecraft:redstone_ore","minecraft:iron_ore","minecraft:coal_ore"]
let ores_weight = [30,20,40,80];
onEvent("item.right_click", event => {
    const name = event.player.name
    let value = players[name];
    if( event.item.id == "minecraft:netherite_pickaxe"
        && name in players){
        switch(value){
            case 0 :
                let entity = event.world.createEntity('minecraft:lightning_bolt');
                event.player.addItemCooldown('minecraft:netherite_pickaxe', 10);
                entity.setPosition(event.player.rayTrace(1000).block.x, event.player.rayTrace(1000).block.y + 1, event.player.rayTrace(1000).block.z);
                entity.spawn();
                break;
            case 1:
                entity = event.world.createEntity('minecraft:fireball');
                event.player.addItemCooldown('minecraft:netherite_pickaxe', 10);
                entity.mergeFullNBT('{ExplosionPower:3}')
                entity.setPosition(event.player.rayTrace(1000).block.x, event.player.rayTrace(1000).block.y + 1, event.player.rayTrace(1000).block.z);
                entity.setMotion(0, -20, 0);
                entity.spawn();
                break;
            case 2 :
                event.player.potionEffects.add("minecraft:regeneration",200,0,false,false);
                event.player.addItemCooldown('minecraft:netherite_pickaxe', 10);
                break;
            case 3 :
                event.player.potionEffects.add("minecraft:resistance",120,0,false,false);
                event.player.addItemCooldown('minecraft:netherite_pickaxe', 10);
                break;
            case 4 :
                case4TriggeredPlayers[name] = true;
                break;
            case 5:
                event.player.potionEffects.add("minecraft:jump_boost",120,1,false,false);
                event.player.potionEffects.add("minecraft:slow_falling",200,0,false,false);
        }
    }
})

onEvent("block.right_click", event => {
    const playerName = event.player.name;
    if (
        event.block.id == 'minecraft:stone' &&
        case4TriggeredPlayers.hasOwnProperty(playerName)
    ) {
        
        event.block.set(weightedRandom(ores,ores_weight));
        event.player.addItemCooldown('minecraft:netherite_pickaxe', 10);
        delete case4TriggeredPlayers[playerName];
    }
});