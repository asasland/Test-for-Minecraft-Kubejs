onEvent('item.tooltip', tooltip => {
    tooltip.add(['minecraft:diorite', 'minecraft:granite', 'minecraft:andesite'], '三 大 废 岩')
    tooltip.addAdvanced('customnpcs:npcwand', (item, advanced, text) => {
        text.add(0, Text.of('Hello'))
        text.add(1, Text.of('§8———————————————'))
        text.add(2, Text.of('§7• 物品类型: 基础物资'))
        text.add(3, Text.of('§7• 基础的木材单位'))
        text.add(4, Text.of('§8———————————————'))
      })
})