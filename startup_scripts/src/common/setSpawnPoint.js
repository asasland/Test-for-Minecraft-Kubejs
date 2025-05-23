onForgeEvent("net.minecraftforge.event.entity.player.PlayerSetSpawnEvent", event=>{
    try{
        event.player.asKJS().persistentData.spawncount += 1; 
        if(event.player.asKJS().persistentData.spawncount %2 == 1){
            event.player.asKJS().persistentData.needrestart = 1;
        }
    }catch(err){
        console.error(err);
    }
})