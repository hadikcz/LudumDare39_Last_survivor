var Items = {
            pickaxe: {
                id: 1,
                name: "Pick axe",
                crafted: false,
                level: -1,
                weapon: false,
                tool: true,
                selected: false,
                spriteIndex: 0,
                animSprite: 'player_wood_axe',
                customPivot: {
                    x: 10,
                    y: 20,
                    angle: 270,
                },
                levels: [
                    {
                        wood: 20,
                        stone: 5,
                        damage: 3
                    },
                    {
                        wood: 80,
                        stone: 40,
                        damage: 5
                    },
                    {
                        wood: 150,
                        stone: 70,
                        damage: 10
                    },
                ]
            },
            knife:{
                id: 2,
                name: "Knife",
                crafted: false,
                level: -1,
                weapon: true,
                selected: false,
                spriteIndex: 2,
                animSprite: 'player_knife',
                customPivot: {
                    x: 10,
                    y: 20,
                    angle: 320,
                },
                levels: [
                    {
                        wood: 20,
                        stone: 5,
                        damage: 15
                    },
                    {
                        wood: 80,
                        stone: 40,
                        damage: 17
                    },
                    {
                        wood: 150,
                        stone: 70,
                        damage: 20
                    },
                ]
            },
            sword:{
                id: 3,
                name: "Sword",
                crafted: false,
                level: -1,
                weapon: true,
                selected: false,
                spriteIndex: 4,
                animSprite: 'player_sword',
                customPivot: {
                    x: 10,
                    y: 20,
                    angle: 320,
                },
                levels: [
                    {
                        wood: 185,
                        stone: 95,
                        damage: 25
                    },
                    {
                        wood: 245,
                        stone: 130,
                        damage: 35
                    },
                    {
                        wood: 300,
                        stone: 150,
                        damage: 40
                    },
                ]
            },
            battleAxe:{
                id: 4,
                name: "Batle axe",
                crafted: false,
                level: -1,
                weapon: true,
                selected: false,
                spriteIndex: 6,
                animSprite: 'player_battle_axe',
                customPivot: {
                    x: 10,
                    y: 20,
                    angle: 320,
                },
                levels: [
                    {
                        wood: 340,
                        stone: 170,
                        damage: 45
                    },
                    {
                        wood: 400,
                        stone: 200,
                        damage: 55
                    },
                    {
                        wood: 600,
                        stone: 350,
                        damage: 65
                    },
                ]
            },
            campfire:{
                id: 5,
                name: "Campfire",
                crafted: false,
                level: -1,
                weapon: false,
                selected: false,
                consume: true,
                spriteIndex: 8,
                customPivot: {
                    x: 0,
                    y: 0,
                    angle: 0,
                },
                levels: [
                    {
                        wood: 60,
                        stone: 20,
                        damage: 10
                    },
                ]
            }
        };
if(!(typeof exports === 'undefined')) {
    module.exports = Items;
}

