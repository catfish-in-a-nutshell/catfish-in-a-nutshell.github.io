var Artifacts = [
  {
    name: '古老石板 1(Ancient Stoneslab 1)',
    id: 123,
    excav: 5
  },
  {
    name: '化石树皮 1(Fossilized Piece of Bark 1)',
    id: 127,
    excav: 10
  },
  {
    name: '骨头碎片 1(Bone Fragment 1)',
    id: 125,
    excav: 15
  },
  {
    name: '古老石板 2(Ancient Stoneslab 2)',
    id: 124,
    excav: 20
  },
  {
    name: '化石树皮 2(Fossilized Piece of Bark 2)',
    id: 128,
    excav: 25
  },
  {
    name: '骨头碎片 1(Bone Fragment 2)',
    id: 126,
    excav: 30
  },
  {
    name: '遗落之城的钥匙(Key to the Lost City)',
    id: 161,
	  reincarnation: 23,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation;
    },
    excav: 1500
  },
  {
    name: '古老装置(Ancient Device)',
    id: 160,
	  reincarnation: 22,
    fixed: function(save) {
      return save.upgrades[465] && save.upgrades[465].u1 ||
        save.upgrades[461] && save.upgrades[461].u1 ||
        save.upgrades[463] && save.upgrades[463].u1;
    },
    excav: 2000,
    random: function(save) {
      return 0.002
    }
  },
  {
    name: '地核(Earth Core)',
    id: 184,
	  reincarnation: 29,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation;
    },
    excav: 2750
  },
  {
    name: '众王号角(Horn of the Kings)',
    id: 186,
	  reincarnation: 29,
    fixed: function(save) {
      return util.save.upgrade_owned(save, 519);
    },
    excav: 3250,
    random: function(save) {
      return 0.005
    }
  },
  {
    name: '示时石塔之焰(Flame of Bondelnar)',
    id: 185,
	  reincarnation: 29,
    fixed: function(save) {
      return util.save.upgrade_owned(save, 517);
    },
    excav: 3250,
    random: function(save) {
      return 0.005
    }
  },
  {
    name: '黑曜石碎片(Obsidian Shard)',
    id: 240,
	  reincarnation: 75,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation;
    },
    excav: 8000
  },
  {
    name: '糙石(Rough Stone)',
    id: 151,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469);
    },
    fail: function(excav, num) {
      return num > 1;
    },
    random: function(save) {
      return 0.02
    },
    precheck: function(save) {
      return util.save.stat(save, 35) == 0;
    }
  },
  {
    name: '幸运圣甲虫(Scarab of Fortune)',
    id: 119,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.alignment == 3;
    },
    notry: function(save) {
      return save.alignment != 3;
    },
    random: function(save) {
      return util.save.building_count(save, 2) / 100000;
    },
    required: function(value, save) {
      return util.save.building_requirement(save, 2, Math.ceil(value * 100000));
    },
    display: function(value) {
      return value + ' Ancient Pyramid' + (value>1?'s':'');
    }
  },
  {
    name: '巧克力曲奇(Chocolate Cookie)',
    id: 120,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469);
    },
    nocache: true,
    random: function(save, e) {
      e = !e?save.excavations:e;
      return e / 5000;
    },
	required: function(value) {
	  return value * 5000;
	},
	display: function(value) {
	  return '这时的挖掘深度 ' + Math.ceil(value);
	}
  },
  {
    name: '啮齿动物化石(Fossilized Rodent)',
    id: 137,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469);
    },
    random: function(save) {
      return util.save.stat(save, 4, 1) / 500000000;
    },
    required: function(value) {
      return Math.ceil(value * 500000000);
    },
    display: function(value) {
      return value + ' 总点击数（本R）';
    }
  },
  {
    name: '能量球(Power Orb)',
    id: 148,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469);
    },
    random: function(save) {
      return util.save.max_mana(save) / 1500000;
    },
    required: function(value) {
      return Math.ceil(value * 1500000);
    },
    display: function(value) {
      return '魔上限 ' + value;
    }
  },
  {
    name: '粉色胡萝卜(Pink Carrot)',
    id: 147,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 0 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return util.save.building_count(save, 9) / 500000;
    },
    required: function(value, save) {
      return util.save.building_requirement(save, 9, Math.ceil(value * 500000));
    },
    display: function(value) {
      return value + ' Farm' + (value>1?'s':'');;
    }
  },
  {
    name: '瓶装之音(Bottled Voice)',
    id: 132,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 0 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return save.spells[6].c / 4000000;
    },
    required: function(value) {
      return Math.ceil(value * 4000000);
    },
    display: function(value) {
      return '施放 Fairy Chanting ' + value + '次';
    }
  },
  {
    name: '幸运四叶草(Lucky Clover)',
    id: 143,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 1 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return (save.stats[101].statsReset - 1) / 2;
    },
    required: function(value) {
      return Math.ceil(value * 2) + 1;
    },
    display: function(value) {
      return ' 连续触发精灵幸运(Elven Luck) ' + value + ' 次';
    }
  },
  {
    name: '迷你宝物(Mini-treasure)',
    id: 144,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 1 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return util.save.stat(save, 4) / 300000000;
    },
    required: function(value) {
      return Math.ceil(value * 300000000);
    },
    display: function(value) {
      return value + ' 点击数';
    }
  },
  {
    name: '支柱碎块(Pillar Fragment)',
    id: 146,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 2 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return (util.save.building_count(save, 11)) / 375000;
    },
    required: function(value, save) {
      return util.save.building_requirement(save, 11, Math.ceil(value * 375000));
    },
    display: function(value) {
      return value + ' Heaven\'s Gate' + (value>1?'s':'');
    }
  },
  {
    name: '神圣之剑(Divine Sword)',
    id: 135,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 2 && save.prestigeFaction == -1 && save.stats[99].statsReset >= 3;
    },
    random: function(save) {
      return (save.stats[99].statsReset) / 6000;
    },
    required: function(value) {
      return Math.ceil(value * 6000);
    },
    display: function(value) {
      return value + ' 次连续与天使结盟';
    }
  },
  {
    name: '远古钱币(Ancient Coin Piece)',
    id: 129,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 3 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return util.save.faction_coins(save, 1) / 5000000000;
    },
    required: function(value) {
      return Math.ceil(value * 5000000000);
    },
    display: function(value) {
      return value + ' 总种族币数（本R）';
    }
  },
  {
    name: '哥布林钱包(Goblin Purse)',
    id: 139,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 3 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return save.spells[18].c / 30000000;
    },
    required: function(value) {
      return Math.ceil(value * 30000000);
    },
    display: function(value) {
      return '施放Tax Collection' + value + '次';
    }
  },
  {
    name: '腐坏的器官(Rotten Organ)',
    id: 150,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 4 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return util.save.assistants(save) / 50000;
    },
    required: function(value) {
      return Math.ceil(value * 50000);
    },
    display: function(value) {
      return value + ' 个基础助手';
    }
  },
  {
    name: '下颌骨(Jaw Bone)',
    id: 142,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 4 && save.prestigeFaction == -1&& util.save.stat(save, 45, 1) >= 86400;
    },
    random: function(save) {
      return util.save.stat(save, 45, 1) / 86400000;
    },
    required: function(value) {
      return Math.ceil(value * 86400000);
    },
    display: function(value) {
      return util.render.time(value) + ' 离线时间';
    }
  },
  {
    name: '恶魔雕像(Demonic Figurine)',
    id: 134,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 5 && save.prestigeFaction == -1 && util.save.trophies(save) >= 666;
    },
    random: function(save) {
      return 0.01;
    }
  },
  {
    name: '恶魔之角(Demon Horn)',
    id: 140,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 5 && save.prestigeFaction == -1 && save.stats[100].statsReset >= 3;
    },
    random: function(save) {
      return (save.stats[100].statsReset) / 6000;
    },
    required: function(value) {
      return Math.ceil(value * 6000);
    },
    display: function(value) {
      return value + ' 次连续与恶魔结盟';
    }
  },
  {
    name: '巨大的泰坦雕像(Huge Titan Statue)',
    id: 141,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 6 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return save.spells[13].c / 100000;
    },
    required: function(value) {
      return Math.ceil(value * 100000);
    },
    display: function(value) {
      return '施放Lightning Strike' + value + '次';
    }
  },
  {
    name: '泰坦之盾(Titan Shield)',
    id: 155,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 6 && save.prestigeFaction == -1 && util.save.stat(save, 1) >= 36000;
    },
    random: function(save) {
      return util.save.stat(save, 1) / 18000000;
    },
    required: function(value) {
      return Math.max(Math.ceil(value * 18000000), 36000);
    },
    display: function(value) {
      return util.render.time(value) + ' 游戏时间'
    }
  },
  {
    name: '符文石板(Glyph Table)',
    id: 138,
    fixed: function(save) {
      var counts = util.save.building_counts(save);
      for (var i = 1; i < counts.length; i++) {
        if (counts[i] != counts[0]) return false;
      }
      return util.save.upgrade_owned(save,469) && save.faction == 7 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return 0.02
    }
  },
  {
    name: '平衡之石(Stone of Balance)',
    id: 153,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 7 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return save.spells[10].c / 3000000;
    },
    required: function(value) {
      return Math.ceil(value * 3000000);
    },
    display: function(value) {
      return '施放Grand Balance ' + value + '次';
    }
  },
  {
    name: '半透明粘胶(Translucent Goo)',
    id: 156,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 8 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return save.spells[2].c / 40000;
    },
    required: function(value) {
      return Math.ceil(value * 40000);
    },
    display: function(value) {
      return '施放Brainwave ' + value + '次';
    }
  },
  {
    name: '章鱼状头盔(Octopus-shaped Helmet)',
    id: 145,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 8 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return (util.save.building_count(save, 16)) / 200000;
    },
    required: function(value, save) {
      return util.save.building_requirement(save, 16, Math.ceil(value * 200000));
    },
    display: function(value) {
      return value + ' Labyrinth' + (value>1?'s':'');
    }
  },
  {
    name: '矮人弓(Dwarven Bow)',
    id: 136,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.prestigeFaction == 9;
    },
    random: function(save) {
      return util.save.stat(save, 4) / 2500000;
    },
    required: function(value) {
      return Math.ceil(value * 2500000);
    },
    display: function(value) {
      return value + ' 点击数';
    }
  },
  {
    name: '石质啤酒杯(Stone Tankard)',
    id: 154,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.prestigeFaction == 9;
    },
    random: function(save) {
      return (util.save.building_count(save, 13)) / 2500000;
    },
    required: function(value, save) {
      return util.save.building_requirement(save, 13, Math.ceil(value * 2500000));
    },
    display: function(value) {
      return value + ' Inn' + (value>1?'s':'');
    }
  },
  {
    name: '仪礼匕首(Ceremonial Dagger)',
    id: 133,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.prestigeFaction == 10 && util.save.stat(save, 4) == 0;
    },
    random: function(save) {
      return 0.02
    }
  },
  {
    name: '蛛形雕像(Arachnid Figurine)',
    id: 130,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.prestigeFaction == 10 && util.save.stat(save, 3, 2) >= 86400;
    },
    random: function(save) {
      return util.save.stat(save, 3, 2) / 432000000;
    },
    required: function(value) {
      return Math.ceil(value * 432000000);
    },
    display: function(value) {
      return util.render.time(value) + ' 总邪恶阵营时间';
    }
  },
  {
    name: '钢制护甲(Steel Plate)',
    id: 152,
	  reincarnation: 5,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 11 && save.reincarnation >= this.reincarnation;
    },
    random: function(save) {
      return save.reincarnation / 5000;
    }
  },
  {
    name: '黑暗剑(Black Sword)',
    id: 131,
	  reincarnation: 3,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 11 && util.save.stat(save, 49, 2) >= 100;
    },
    random: function(save) {
      return util.save.stat(save, 61, 2) / 6000000;
    },
    required: function(value) {
      return Math.ceil(value * 6000000);
    },
    display: function(value) {
      return util.render.time(value) + ' 总佣兵时间';
    }
  },
  {
    name: '龙牙(Dragon Fang)',
    id: 229,
	  reincarnation: 50,
    fixed: function(save) {
      var h = new Date().getHours();
      return save.reincarnation >= this.reincarnation && save.prestigeFaction == 12 && util.save.upgrade_owned(save,469);
    },
    random: function(save) {
      return util.save.building_count(save, 14) / 40000000;
    },
    required: function(value, save) {
      return util.save.building_requirement(save, 14, Math.ceil(value * 40000000));
    },
    display: function(value) {
      return value + ' Iron Stronghold' + (value > 1 ? 's' : '');
    }
  },
  {
    name: '龙魂(Dragon Soul)',
    id: 230,
	  reincarnation: 50,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation && save.prestigeFaction == 12 && util.save.upgrade_owned(save,469) && save.spells[21].activeTiers >= 4;
    },
    required: function(value) {
      return Math.ceil(value * 20000000);
    },
    random: function(save) {
      return save.spells[21].c / 20000000;
    },
    display: function(value) {
      return '施放Dragon\'s Breath ' + value + '次';
    }
  },
  {
    name: '香子兰风味果汁(Vanilla Flavor Juice)',
    id: 179,
	  reincarnation: 16,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.reincarnation >= this.reincarnation && util.save.stat(save, 1) <= 300;
    },
    random: function(save) {
      return 0.2
    }
  },
  {
    name: '了解你的敌人，卷 I(Know Your Enemy, Part I)',
    id: 178,
	  reincarnation: 12,
    fixed: function(save) {
      for (i = 0; i <= 10; i++) {
        if (!util.save.bloodline_upgrades(save, i)) return false;
      }
      return util.save.upgrade_owned(save,469) && save.faction == 11 && save.reincarnation >= this.reincarnation;
    },
    random: function(save) {
      return 0.1
    }
  },
  {
    name: '巫毒娃娃(Voodoo Doll)',
    id: 187,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.alignment == 2;
    },
    notry: function(save) {
      return save.alignment != 2;
    },
    random: function(save) {
      return util.save.building_count(save, 24) / 1000000;
    },
    required: function(value, save) {
      return util.save.building_requirement(save, 24, Math.ceil(value * 1000000));
    },
    display: function(value) {
      return value + ' Witch Conclave' + (value>1?'s':'');
    }
  },
  {
    name: '墙碎片(Wall Fragment)',
    id: 177,
	  reincarnation: 40,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.ascension >= 1;
    },
    random: function(save) {
      return 0.1
    }
  },
  {
    name: '带刺粗糙蛋(Spiky Rough Egg)',
    id: 211,
	  reincarnation: 46,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation;
    },
    excav: 1500,
    random: function(save) {
      return 0.02;
    }
  },
  {
    name: '预言机器(Fortune Teller Machine)',
    id: 215,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == -1 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return 0.001;
    }
  },
  {
    name: '黎明石(Dawnstone)',
    id: 233,
    fixed: function(save) {
      var h = new Date().getHours();
      return h >= 5 && h <= 7 && util.save.upgrade_owned(save,469);
    },
    nocache: true,
    random: function(save, e) {
      e = !e?save.excavations:e;
      return e / 1000000;
    },
	required: function(value) {
	  return value * 1000000;
	},
	display: function(value) {
	  return "这时的挖掘深度 " + Math.ceil(value);
	}/*,
    required: function(value, save, n) {
      if (Math.ceil(value * 1000000) < n + save.excavations)
      console.log(value, Math.ceil(value * 1000000), n);
      return Math.max(1, Math.ceil(value * 1000000) - n) + save.excavations;
    },
    display: function(value) {
      return value + ' Excavation' + (value>1?'s':'') + ' (must excavate to this point with no eligible artifacts)';
    }*/
  },
  {
    name: '黄昏石(Duskstone)',
    id: 234,
    fixed: function(save) {
      var h = new Date().getHours();
      return h >= 18 && h <= 20 && util.save.upgrade_owned(save,469);
    },
    nocache: true,
    random: function(save, e) {
      e = !e?save.excavations:e;
      return e / 1000000;
    },
	required: function(value) {
	  return value * 1000000;
	},
	display: function(value) {
	  return "这时的挖掘深度 " + Math.ceil(value);
	}/*,
    required: function(value, save, n) {
      if (Math.ceil(value * 1000000) < n + save.excavations)
      console.log(value, Math.ceil(value * 1000000), n);
      return Math.max(1, Math.ceil(value * 1000000) - n) + save.excavations;
    },
    display: function(value) {
      return value + ' Excavation' + (value>1?'s':'') + ' (must excavate to this point with no eligible artifacts)';
    }*/
  },
  {
    name: '传家宝(Ancient Heirloom)',
    id: 237,
	  reincarnation: 60,
    fixed: function (save) {
      return (save.lineageLevels[0].lev + save.lineageLevels[1].lev + save.lineageLevels[2].lev +
              save.lineageLevels[3].lev + save.lineageLevels[4].lev + save.lineageLevels[5].lev +
              save.lineageLevels[6].lev + save.lineageLevels[7].lev + save.lineageLevels[8].lev +
              save.lineageLevels[9].lev + save.lineageLevels[10].lev + save.lineageLevels[11].lev) > 0;
    },
    random: function (save) {
      return (save.lineageLevels[0].lev + save.lineageLevels[1].lev + save.lineageLevels[2].lev +
              save.lineageLevels[3].lev + save.lineageLevels[4].lev + save.lineageLevels[5].lev +
              save.lineageLevels[6].lev + save.lineageLevels[7].lev + save.lineageLevels[8].lev +
              save.lineageLevels[9].lev + save.lineageLevels[10].lev + save.lineageLevels[11].lev) / 2000;
    },
    required: function (value) {
      return Math.ceil(value * 2000);
    },
    display: function (value) {
      return '总族系等级 ' + Math.ceil(value);
    }
  },
  {
    name: '了解你的敌人，卷 II(Know Your Enemy, Part II)',
    id: 242,
	  reincarnation: 76,
    fixed: function(save) {
      for (i = 0; i <= 10; i++) {
        if (!util.save.bloodline_upgrades(save, i)) return false;
      }
      return util.save.upgrade_owned(save,469) && save.faction == 11 && save.reincarnation >= this.reincarnation;
    },
    random: function(save) {
      return 0.05
    }
  },
  {
    name: '老兵雕像(Veteran Figurine)',
    id: 268,
    reincarnation: 90,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation && util.save.challenge_owned(save,642);
    },
    random: function(save) {
      return util.save.stat(save, 1) / 100000000;
    },
    required: function(value) {
      return Math.ceil(value * 100000000);
    },
    display: function(value) {
      return util.render.time(value) + ' 游戏时间'
    }
  },
  {
    name: '远古可可豆(Ancient Cocoa Bean)',
    id: 269,
	  reincarnation: 22,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation && save.alignment == 3;
    },
    random: function(save) {
      return 0.1
    }
  },

  {
    name: '墙碎块(Wall Chunk)',
    id: 256,
    reincarnation: 100,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation;
    },
    random: function(save) {
      return 0.1;
    }
  },

  {
    name: '挖出幻觉(Excavated Mirage)',
    id: 257,
    reincarnation: 100,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation;
    },
    random: function(save) {
	  //(log10(x) / 100)%, where x is FC chance
      return Math.log10(util.save.fc_chance(save)) / 10000;
    },
	required: function (value) {
      return Math.pow(10, value * 10000);
    },
    display: function (value) {
      return util.render.sci(Math.ceil(value)) + '% 种族币获取概率';
    }
  },
  {
    name: '祖传沙漏(Ancestral Hourglass)',
    id: 284,
    reincarnation: 100,
    fixed: function(save) {
      return save.ascension >= 2;
    },
    random: function(save) {
      return util.save.fc_chance(save) / 500000000000000000;
    },
    required: function(value) {
      return Math.ceil(value * 500000000000000000);
    },
    display: function(value) {
      return util.render.sci(value) + '% 种族币获取概率';
    }
  },
  {
    name: '噩梦臆质(Nightmare Figment)',
    id: 278,
    reincarnation: 100,
    fixed: function (save) {
      return save.faction == 8 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,156) && util.save.trophy_owned(save,145);
    },
    random: function (save) {
      return Math.pow(util.save.brainwaveHeadstart(save), 1.5) / 2000000000;
    },
    required: function (value) {
      return Math.pow(value * 2000000000, 2 / 3);
    },
    display: function (value) {
      return util.render.time(value) + ' Brainwave 起步时间';
    }
  },
  {
    name: '生命树枝(Branch of the Life Tree)',
    id: 274,
    reincarnation: 100,
    fixed: function (save) {
      return save.faction == 7 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,138) && util.save.trophy_owned(save,153);
    },
    random: function (save) {
      return Math.pow(save.lineageLevels[7].lev, 3) / 200000000;
    },
    required: function (value) {
      return Math.pow(value * 200000000, 1 / 3);
    },
    display: function (value) {
      return '德鲁伊族系等级 ' + Math.ceil(value);
    }
  },
  {
    name: '泰坦头盔(Titan Helmet)',
    id: 283,
    reincarnation: 100,
    fixed: function (save) {
      return save.faction == 6 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,141) && util.save.trophy_owned(save,155);
    },
    random: function (save) {
      var exchanges = util.save.stat(save, 24);

      return Math.pow(exchanges, 2) / 150000000000;
    },
    required: function(value, save) {
      var exchanges = Math.ceil(Math.pow(value * 150000000000, 0.5));

      return exchanges;
    },
    display: function (value) {
      return Math.ceil(value) + ' 皇家交易所(R.E)';
    }
  },
  {
    name: '晶状熔岩(Crystallized Lava)',
    id: 275,
    reincarnation: 100,
    fixed: function (save) {
      return save.faction == 5 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,134) && util.save.trophy_owned(save,140);
    },
    random: function (save) {
      return (save.buildings[10].q - 10000) / 20000000;
    },
    required: function (value) {
      return value * 20000000 + 10000;
    },
    display: function (value) {
      return Math.ceil(value) + ' Hall of Legends';
    }
  },
  {
    name: '积尘旧棺(Dusty Coffin)', // TODO: higher is better, might require rework of the entire page logic
    id: 276,
    reincarnation: 100,
    fixed: function (save) {
      return save.faction == 4 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,150) && util.save.trophy_owned(save,142);
    },
    random: function (save) {
      var value = save.stats[1].stats;
      return 0.01 / (30 + Math.pow(value, 1.5));
    },
    required: function (value) {
      return Math.floor(Math.pow((1 / (value * 100)) - 30, 1 / 1.5));
    },
    display: function (value) {
      return '本局游戏时间少于 ' + util.render.time(~~value);
    }
  },
  {
    name: '荆棘之鞭(Spiked Whip)',
    id: 282,
    reincarnation: 100,
    fixed: function (save) {
      return save.faction == 3 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,129) && util.save.trophy_owned(save,139);
    },
    random: function (save) {
      return (save.buildings[21].q - 10000) / 30000000;
    },
    required: function (value) {
      return value * 30000000 + 10000;
    },
    display: function (value) {
      return Math.ceil(value) + ' Slave Pens';
    }
  },
  {
    name: '化石羽翼(Fossilized Wing)',
    id: 277,
    reincarnation: 100,
    fixed: function (save) {
      return save.faction == 2 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,146) && util.save.trophy_owned(save,135);
    },
    random: function (save) {
      return util.save.stat(save, 52, 2) / 2592000000;
    },
    required: function (value) {
      return value * 2592000000;
    },
    display: function (value) {
      return util.render.time(value) + ' 天使游戏时间（总计）';
    }
  },
  {
    name: '翡翠原石(Raw Emerald)',
    id: 280,
    reincarnation: 100,
    fixed: function (save) {
      return save.faction == 1 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,143) && util.save.trophy_owned(save,144);
    },
    random: function (save) {
      return (Math.pow(3 * util.save.stat(save, 135), 4.5)) / 1000000;
    },
    required: function (value) {
      return Math.pow(value * 1000000 , (1 / 4.5)) / 3;
    },
    display: function (value) {
      return '本次游戏挖掘重置' + Math.ceil(value) + '次';
    }
  },
  {
    name: '丝绸织物(Silk Cloth)',
    id: 281,
    reincarnation: 100,
    fixed: function (save) {
      return save.faction == 0 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,147) && util.save.trophy_owned(save,132);
    },
    random: function (save) {
      return (save.buildings[25].q - 10000) / 20000000;
    },
    required: function (value) {
      return value * 20000000 + 10000;
    },
    display: function (value) {
      return Math.ceil(value) + ' Wizard Towers';
    }
  },
  {
    name: '胡子发束(Beard Hair)',
    id: 273,
    reincarnation: 116,
    fixed: function (save) {
      return save.prestigeFaction === 9 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,136) && util.save.trophy_owned(save,154);
    },
    random: function (save) {
      return util.save.assistants(save) / 10000000000;
    },
    required: function (value) {
      return value * 10000000000;
    },
    display: function (value) {
      return Math.ceil(value) + ' 个基础助手';
    }
  },
  {
    name: '有毒药瓶(Poison Vial)',
    id: 279,
    reincarnation: 116,
    fixed: function (save) {
      return save.prestigeFaction === 10 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,133) && util.save.trophy_owned(save,130);
    },
    random: function (save) {
      return Math.pow(40 * util.save.combo_strike_counter(save), 0.9) / 1000000000;
    },
    required: function (value) {
      return Math.pow((value * 1000000000) / 40, 1 / 0.9);
    },
    display: function (value) {
      return Math.ceil(value) + ' Combo Strike 计数值';
    }
  },
  {
    name: '龙鳞(Dragon Scale)',
    id: 292,
    reincarnation: 116,
    fixed: function (save) {
      return save.prestigeFaction === 12 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,229) && util.save.trophy_owned(save,230);
    },
    random: function (save) {
      return util.save.active_spells(save) / 250000;
    },
    required: function (value) {
      return value * 250000;
    },
    display: function (value) {
      return Math.ceil(value) + ' 个活跃法术';
    }
  },
  //TODO
  {
    name: '指引灯笼(Lantern of Guidance)',
    id: 294,
    reincarnation: 120,
    fixed: function (save) {
      return util.save.upgrade_owned(save,749) && save.reincarnation >= this.reincarnation;
    },
    random: function (save) {
    //(x / 10,000,000,000 (10B))%, where x is mana regen.
	//set to 1000 until i can figure out a way to get the stat
      return 1000 / 1000000000000 ;
    },
    required: function (value) {
      return value * 1000000000000;
    },
    display: function (value) {
      return '每秒产魔 ' + util.render.sci(value);
    }
  },

  {
    name: '油灯(Oil Lamp)',
    id: 295,
    reincarnation: 120,
    fixed: function (save) {
      return util.save.upgrade_owned(save,748) && save.reincarnation >= this.reincarnation;
    },
    random: function (save) {
	//(min(x, y, z) / 1,000 days)%, where x is Fairy Chanting spell activity time, y is Hellfire Blast spell activity time, and z is Brainwave spell activity time (all time)
      return (Math.min((save.spells[6].active0 + save.spells[6].active1 + save.spells[6].active2),
					   (save.spells[11].active0 + save.spells[11].active1 + save.spells[11].active2),
	                   (save.spells[2].active0 + save.spells[2].active1 + save.spells[2].active2)))  / (100000 * 86400);
    },
    required: function (value) {
      return value * 100000;
    },
    display: function (value) {
      return 'Fairy Chanting, Hellfire Blast 和 Brainwave 每种法术活跃时间（全游戏）达到至少 ' + util.render.time(value * 86400);
    }
  },

  {
    name: '生命火花(Spark of Life)',
    id: 296,
    reincarnation: 120,
    fixed: function (save) {
      return util.save.upgrade_owned(save,747) && save.reincarnation >= this.reincarnation;
    },
    random: function (save) {
    // (2 * log10(1 + x) ^ 2 / 12000)%, where x is FC collected this game.
      return Math.pow(Math.log10(1 + util.save.faction_coins(save)), 2) / 600000;
    },
    required: function (value) {
      return Math.pow(10,Math.sqrt(value * 600000)) - 1;
    },
    display: function (value) {
      return util.render.sci(value) + ' 总种族币数（本游戏）';
    }
  },

  {
    name: '第一块水晶碎片(First Crystal Fragment)',
    id: 300,
    reincarnation: 125,
    fixed: function (save) {
      return save.faction == 0 && save.reincarnation >= this.reincarnation && save.excavations >= 12500;
    },
    random: function (save) {
	//(x / 100000000000 (100B))%, where x is assistant count.
      return util.save.assistants(save) / 10000000000000;
    },
    required: function (value) {
      return value * 10000000000000;
    },
    display: function (value) {
      return util.render.sci(value) + ' 个基础助手';
    }
  },

  {
    name: '第二块水晶碎片(Second Crystal Fragment)',
    id: 303,
    reincarnation: 125,
    fixed: function (save) {
      return save.faction == 8 && save.reincarnation >= this.reincarnation && save.excavations >= 12500;
    },
    random: function (save) {
	//(log10(1 + x) ^ 3 / 5000000 (5M))%, where x is faction coins this game.
      return Math.pow(Math.log10(util.save.faction_coins(save) + 1),3) / 250000000;
    },
    required: function (value) {
      return Math.pow(10,Math.pow(value*250000000,1/3));
    },
    display: function (value) {
      return util.render.sci(value) + ' 总种族币数（本游戏）';
    }
  },

  {
    name: '第三块水晶碎片(Third Crystal Fragment)',
    id: 306,
    reincarnation: 125,
    fixed: function (save) {
      return save.faction == 5 && save.reincarnation >= this.reincarnation && save.excavations >= 12500;
    },
    random: function (save) {
	//(x / 50000000 (50M))%, where x is evil spells this R.
      return (save.spells[1].c + save.spells[1].r + save.spells[8].c + save.spells[8].r + save.spells[15].c + save.spells[15].r + save.spells[11].c + save.spells[11].r + save.spells[4].c + save.spells[4].r) / 5000000000;
    },
    required: function (value) {
      return value * 5000000000;
    },
    display: function (value) {
      return '本R施放邪恶法术 ' + util.render.sci(value) + ' 次';
    }
  },

  {
    name: '第一块铁质碎片(First Iron Fragment)',
    id: 301,
    reincarnation: 125,
    fixed: function (save) {
      return save.faction == 2 && save.reincarnation >= this.reincarnation && save.excavations >= 12500;
    },
    random: function (save) {
	//(log10(1 + x) ^ 3 / 100000 (100K))%, where x is mana regen.
	//Set to 1000 until I find a better way to do this
      return Math.pow(Math.log10(1000 + 1),3) / 10000000;
    },
    required: function (value) {
      return Math.pow(10,Math.pow(value*10000000,1/3));
    },
    display: function (value) {
      return '每秒产魔 ' + util.render.sci(value);
    }
  },

  {
    name: '第二块铁质碎片(Second Iron Fragment)',
    id: 304,
    reincarnation: 125,
    fixed: function (save) {
      return save.faction == 6 && save.reincarnation >= this.reincarnation && save.excavations >= 12500;
    },
    random: function (save) {
	//(x ^ 3 / 5000000000 (5B))%, where x is royal exchange bonus
      return Math.pow(util.save.re_bonus(save),3) / 500000000000;
    },
    required: function (value) {
      return Math.pow(value * 500000000000, 1/3);
    },
    display: function (value) {
      return Math.ceil(value) + '% 单个R.E加成';
    }
  },

  {
    name: '第三块铁质碎片(Third Iron Fragment)',
    id: 307,
    reincarnation: 125,
    fixed: function (save) {
      return save.faction == 4 && save.reincarnation >= this.reincarnation && save.excavations >= 12500;
    },
    random: function (save) {
	//(log10(1 + x) ^ 3 / 1000000 (1M))%, where x is offline bonus multiplier.
	// Set to 1000, see above
      return Math.pow((Math.log10(1000 + 1) - 2),3) / 100000000;
    },
    required: function (value) {
      return Math.pow(10 ,Math.pow(value * 100000000,1/3) + 2);
    },
    display: function (value) {
      return util.render.sci(value) + '% 离线产能加成';
    }
  },

  {
    name: '第一块石质碎片(First Stone Fragment)',
    id: 302,
    reincarnation: 125,
    fixed: function (save) {
      return save.faction == 1 && save.reincarnation >= this.reincarnation && save.excavations >= 12500;
    },
    random: function (save) {
	//(log10(1 + x) ^ 3) / 20000 (20K))%, where x is clicks this game.
      return Math.pow(Math.log10(util.save.stat(save, 4) + 1),3) / 2000000;
    },
    required: function (value) {
      return Math.pow(10,Math.pow(value*2000000,1/3));
    },
    display: function (value) {
      return util.render.sci(value)  + ' 点击数（本游戏）';
    }
  },

  {
    name: '第二块石质碎片(Second Stone Fragment)',
    id: 305,
    reincarnation: 125,
    fixed: function (save) {
      return save.faction == 7 && save.reincarnation >= this.reincarnation && save.excavations >= 12500;
    },
    random: function (save) {
	//(x / 20000000 (20M))%, where x is amount of buildings.
      return util.save.total_buildings(save) / 2000000000;
    },
    required: function (value) {
      return value * 2000000000;
    },
    display: function (value) {
      return Math.ceil(value) + ' 建筑数（乘算加成数不计！）';
    }
  },

  {
  name: '第三块石质碎片(Third Stone Fragment)',
    id: 308,
    reincarnation: 125,
    fixed: function (save) {
      return save.faction == 3 && save.reincarnation >= this.reincarnation && save.excavations >= 12500;
    },
    random: function (save) {
	//(log10(1 + x) ^ 3) / 125000 (125K))%, where x is Tax Collections this game.
      return Math.pow(Math.log10(save.spells[18].c + 1),3) / 12500000;
    },
    required: function (value) {
      return Math.pow(10,Math.pow(value*12500000,1/3));;
    },
    display: function (value) {
      return util.render.sci(value) + ' Tax Collections (本游戏)';
    }
  },

  {
    name: '行星之力(Planetary Force)',
    id: 319,
    reincarnation: 100,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation && util.save.trophy_owned(save,233) && util.save.trophy_owned(save,234);
    },
    random: function(save) {
	  //((x ^ 2.5) / 5000)%, where x is amount of consecutive days logged in
      return (Math.pow(save.consecutiveDays,2.5)/500000);
    },
	required: function (value) {
      return Math.pow(value*500000,1/2.5);
    },
    display: function (value) {
      return '连续登录 ' + Math.ceil(value) + ' 天';
    }
  },

  {
    name: '佣兵徽章(Mercenary Insignia)',
    id: 330,
	reincarnation: 160,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation && save.faction == 11 && util.save.trophy_owned(save,152) && util.save.trophy_owned(save,131);
    },
    random: function(save) {
      return (Math.floor(Math.log10(save.gems)) - 37) * (0.001);
    },
	required: function (value) {
      return 10**(Math.ceil(value / 0.001) + 37);
    },
    display: function (value) {
      return Math.ceil(value).toPrecision(1) + ' 宝石数';
    }
  },
	
  

  {
    name: '黑曜石冠饰(Obsidian Crown)',
    id: 331,
	reincarnation: 170,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation && save.faction == 11 && (util.save.stat(save, 135) + util.save.stat(save, 104)) >= 10;
    },
    random: function(save) {
      return (util.save.stat(save, 135) + util.save.stat(save, 104) - 10) / 100000;
    },
	required: function (value) {
      return (value * 100000) + 10;
    },
    display: function (value) {
      return '本次游戏挖掘重置' + Math.ceil(value) + '次';
    }
  },
	
  {
    name: '被遗忘的遗迹(Forgotten Relic)',
    id: 344,
	  reincarnation: 175,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation;
    },
    random: function(save) {
      return Math.pow(util.save.getSpentBudget(save),2) / 10000000000000;
    },
	required: function (value) {
      return Math.pow(value * 10000000000000, 1/2);
    },
    display: function (value) {
      return '使用 ' + Math.ceil(value) + ' 研究预算点数';
    }
  },
	
  {
    name: '魔力纺车(Mana Loom)',
    id: 350,
	  reincarnation: 175,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation && util.save.upgrade_owned(save,748);
    },
    random: function(save) {
      return (Math.pow(Math.log10(util.save.stat(save, 15),3))) / 5000000;
    },
	required: function (value) {
      return Math.pow(10, Math.pow((value * 5000000),1/3));
    },
    display: function (value) {
      return '本游戏产魔' + Math.ceil(value);
    }
  },
	
  {
    name: '工厂(Factory)',
    id: 349,
	  reincarnation: 175,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation && util.save.upgrade_owned(save,388);
    },
    random: function(save) {
      return (Math.pow(Math.log10(util.save.stat(save, 4),3))) / 1000000;
    },
	required: function (value) {
      return Math.pow(10, Math.pow((value * 1000000),1/3));
    },
    display: function (value) {
      return Math.ceil(value) + ' 点击数 （本游戏）';
    }
  },
	
 {
    name: '神史(Mythos)',
    id: 351,
	  reincarnation: 175,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation && util.save.upgrade_owned(save,224);
    },
    random: function(save) {
      return util.save.minSpellTime(save) / 432000000;
    },
	required: function (value) {
      return (value * 432000000);
    },
    display: function (value) {
      return '本R最小法术活跃时间 ' + util.render.time(value);
    }
  },
	
  {
    name: '保险箱(Vault)',
    id: 352,
	  reincarnation: 175,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation && util.save.upgrade_owned(save,747);
    },
    random: function(save) {
      return (util.save.re_bonus(save) / 10000000000);
    },
	required: function (value) {
      return (value * 10000000000);
    },
    display: function (value) {
      return Math.ceil(value) + ' 单个R.E加成';
    }
  },
	
  {
    name: '炼金熔炉(Athanor)',
    id: 347,
	  reincarnation: 175,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation && util.save.upgrade_owned(save,749);
    },
    random: function(save) {
      return (util.save.stat(save, 94, 2) / 100000000);
    },
	required: function (value) {
      return (value * 100000000);
    },
    display: function (value) {
      return Math.ceil(value) + ' 炼金术分支研究点数';
    }
  },	

  {
    name: '战场遗址(Battlefield)',
    id: 348,
	  reincarnation: 175,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation && util.save.upgrade_owned(save,178);
    },
    random: function(save) {
      return (Math.pow(Math.log10(util.save.assistants(save),3))) / 2000000;
    },
	required: function (value) {
      return (Math.pow(10, Math.pow((value * 2000000),1/3)));
    },
    display: function (value) {
      return Math.ceil(value) + ' 个助手';
    }
  }
	
];
