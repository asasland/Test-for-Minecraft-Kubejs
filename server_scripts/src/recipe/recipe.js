
onEvent('recipes',event =>{
})

onEvent('recipes', event => { // 监听recipes事件
    // 主体修改内容
      event.shaped(Item.of('3x minecraft:stone',{display:{Lore:["1111","8888"]}}), [
            'SSS',
            'S S',
            'SSS'
      ], {
            S: 'minecraft:sponge'
      })

      event.shaped(Item.of('3x minecraft:stone'),[
            'S S',
            'S S',
            'S S'
      ],{
            S: 'minecraft:diamond'
      })

      //用钻石剑切西瓜
      event.shapeless('9x minecraft:melon_slice', [ //无序合成，合成输出: 9个西瓜片
            Item.of('minecraft:diamond_sword').ignoreNBT(), //输入一个忽略NBT的钻石剑
            'minecraft:melon' // 其他输入内容
      ]).damageItem(Item.of('minecraft:diamond_sword').ignoreNBT()) // 降低钻石剑耐久1点(必须忽略NBT)
      

      event.shaped(Item.of('3x minecraft:stone',{display:{Lore:["1111","8888"]}}), [
            'SSS',
            'S S',
            'SSS'
      ], {
            S: 'minecraft:clay_ball'
      })
})
