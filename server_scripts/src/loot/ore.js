function createLore(loreList) {
    const loreFormatted = loreList.map(text => `{"text":"${text}"}`);
    const name = loreList.map(text => `{"text":"${text}"}`)
    return { display: { Lore: loreFormatted } };
}

function addLootForBlock(event, blockName, pools, tag) {
    event.addBlock(blockName, table => {
        pools.forEach(poolData => {
            table.addPool(pool => {
                pool.rolls = poolData.rolls || [1, 1];
                poolData.items.forEach(itemData => {
                    pool.addItem(Item.of(itemData.item, createLore(tag)));
                });
            });
        });
    });
}


onEvent('block.loot_tables', event => {
    const lootRules = [
        {
            num: 2,
            block: 'minecraft:dirt',
            item: Item.of('minecraft:apple')
        }
    ]
    lootRules.forEach(rule => {
        if (rule.clearr) {
            // 清空掉落池
            event.addBlock(rule.block, table => table.clearPools());
        } else {
            var item = rule.item;
            item.count = rule.num;
            event.addSimpleBlock(rule.block, rule.item);
        }
    });
});


