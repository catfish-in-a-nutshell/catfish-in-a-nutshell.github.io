
	(function(window, document, $, undefined) {
		'use strict';

		// A list of all building names in ID'ed order
		var buildingNames = util.save.building_names;
		var buildingIds = util.save.building_ids;
		var buildingsOwned = [];
        var buildingsAvailable = [];
		var buildingsHighlighted = [ [], [] ];

		var lightningRNG = null;

		var miracleRNG = null;

		var breathRNG = null;
        var breathNames = ['红', '绿', '蓝', '白', '黑'];
        var breathTier = 1;
        var maelstromRNG = null;
        var maelstromTargets = 3;
        var maelstromEffects = ['魔产量', '已获得成就数', '种族币获得', '助手数量'];

        var limitedWishRNG = null;
        var limitedWishEffects = ["提升所有建筑产能", "提升助手数量", "提升魔上限", "提升已获得成就数结算值和离线产能加成", "提升种族币获得率", "提升回魔", "延长所有法术持续时间"];
        var limitedWishEligibleEffects = [];
        var limitedWishActivityTime = 0;
        var limitedWishCastCount = 0;
        var baseLimitedWishCastCount = 0;

        var catalystRNG = null;
        var catalystEffects = ["Fairy Chanting", "Moon Blessing", "God's Hand", "Goblin's Greed", "Night Time", "Hellfire Blast", "Gem Grinder", "Holy Light", "Blood Frenzy"];
        var catalystEligibleEffects = [];
		var catalystTargets = 1;

		var DJC4RNG = null;
		var DJC4Hits = [[88,88,888],[88,888,88],[88,88,888],[88,888,88],[888,88,88],[888,88,88]];
		// Refresh the entire forecast
		var forecast = function(saveStr) {
			buildingsOwned = [];
            buildingsAvailable = [];
			buildingsHighlighted = [ [], [] ];
			lightningRNG = null;
			miracleRNG = null;
			breathRNG = null;
            maelstromRNG = null;
            limitedWishRNG = null;
            catalystRNG = null;
            breathTier = 1;
			$('#lightningMessage, #lightningForecast, #miracleMessage, #miracleForecast, #breathMessage, #breathForecast, #maelstromMessage, #maelstromForecast, #limitedWishMessage, #limitedWishForecast, #catalystMessage, #catalystForecast, #catalystCurrent, #DJC4Message, #DJC4Forecast').html('');

			var save = SaveHandler.Decode(saveStr);
			window.decoded = save;
			console.log('Decoded save:', save);

			// Only buildings owned by the player can be hit
			for (var i of buildingIds)
            {
				if (save.buildings[i].q > 0)
                {
					buildingsOwned.push(i);
                }
                if (util.save.building_alignment[i] == 0 || util.save.building_alignment[i] == save.alignment)
                {
                    buildingsAvailable.push(i);
                }
            }
			$('#buildings').html('<b>拥有建筑</b> <small><i>(点击一个建筑可以高亮)</i></small><br>');
			for (var tier in buildingsOwned) {
				var hit = buildingNames[buildingsOwned[tier]];
				var span = $('<span />').html(hit).addClass('tier' + tier).data('tier', tier);
				if (tier != 0) $('#buildings').append(', ');
				$('#buildings').append(span);
			}

			forecastLightning(save, buildingsOwned);
			forecastMiracle(save, buildingsOwned);
			forecastBreath(save);
			forecastMaelstrom(save, buildingsAvailable);
            forecastLimitedWish(save);
            forecastCatalyst(save);
			forecastDJC4(save);
		};

		// Add the Lightning forecast
		var forecastLightning = function(save, buildingsOwned) {
		var lightningMessage = '';
		var lightningForecast = '';

		// Check if the save actually has Lightning Strikes to forecast
			if (!util.save.hasSpell(save,"Lightning Strike")) {
			 	lightningMessage = '你未拥有雷击术。';
			 	lightningForecast = '无雷击。';
			} else if (save.alignment != 3 && !util.save.upgrade_owned(save, 688)) {
				lightningMessage = '你未属于中立阵营。';
				lightningForecast = '无雷击。';
            		} else if (buildingsOwned.length == 0) {
				lightningMessage = '你没有建筑。';
				lightningForecast = '无雷击。';
			} else if (buildingsOwned.length == 1) {
				lightningMessage = '你只有 ' + buildingNames[buildingsOwned[0]] + '.';
				lightningForecast = '你有的唯一一个建筑，想击中多久就多久。';
			}

			// Early exit
			if (lightningMessage != '' || lightningForecast != '') {
				$('#lightningMessage').html('<b>雷击</b><br>').append(lightningMessage);
				$('#lightningForecast').html('<b>预报</b><br>').append(lightningForecast);
				return;
			}

			// Create the RNG and get the initial forecast
			lightningRNG = new PM_PRNG(save.spells[13].s);
			lightningRNG.hasLightningRod = util.save.upgrade_owned(save, 143018);
			$('#lightningMessage').html('<b>雷击</b><br>你的随机数生成器状态: ' + lightningRNG.state + '.');
			$('#lightningForecast').html('<b>预报</b> <small><i>(点击一个建筑可以高亮)</i></small><br><ol></ol>')
				.append($('<button class="btn btn-link" type="button" />').html('给我更久点的预报').on('click', forecastLightningMore));

			forecastLightningMore();
		};

		// Add the Miracle forecast
		var forecastMiracle = function(save, buildingsOwned) {
			var miracleMessage = '';
			var miracleForecast = '';

			// (TEMP) Find the Miracle research upgrade
			var miracle = save.upgrades[143719];

			// Check if the save actually has Miracles to forecast
			if (!miracle || !miracle.u1) {
				miracleMessage = '你还无法获得任何奇迹。';
				miracleForecast = '无奇迹。';
			} else if (buildingsOwned.length == 0) {
				miracleMessage = '你没有建筑';
				miracleForecast = '无奇迹。';
			} else if (buildingsOwned.length == 1) {
				miracleMessage = '你只有 ' + buildingNames[buildingsOwned[0]] + '.';
				miracleForecast = '你有的唯一一个建筑，想持续多久就多久。';
			}

			// Early exit
			if (miracleMessage != '' || miracleForecast != '') {
				$('#miracleMessage').html('<b>奇迹</b><br>').append(miracleMessage);
				$('#miracleForecast').html('<b>预报</b><br>').append(miracleForecast);
				return;
			}

			// Create the RNG and get the initial forecast
			miracleRNG = new PM_PRNG(miracle.s);
			$('#miracleMessage').html('<b>奇迹</b><br>你的随机数生成器状态: ' + miracleRNG.state + '.');
			$('#miracleForecast').html('<b>预报</b> <small><i>(点击一个建筑可以高亮)</i></small><br><ol></ol>')
				.append($('<button class="btn btn-link" type="button" />').html('给我更久点的预报').on('click', forecastMiracleMore));

			forecastMiracleMore();
		};

		// Add the Breath forecast
		var forecastBreath = function(save) {
			var breathMessage = '';
			var breathForecast = '';

			// Check if the save actually has Dragons Breath to forecast
			if (!util.save.hasSpell(save,"Dragon's Breath")) {
				breathMessage = '你未拥有龙息术。';
				breathForecast = '无龙息。';
			}

			// Early exit
			if (breathMessage != '' || breathForecast != '') {
				$('#breathMessage').html('<b>龙息</b><br>').append(breathMessage);
				$('#breathForecast').html('<b>预报</b><br>').append(breathForecast);
				return;
			}

			// Create the RNG and get the initial forecast
			breathRNG = new PM_PRNG(save.spells[21].s);
            // assume DB tier is active tiers
            breathTier = save.spells[21].activeTiers + 1;
            if (util.save.upgrade_owned(save, 796)) // Dragon Perk 4
            {
                breathTier *= 2;
            }

			$('#breathMessage').html('<b>龙息</b><br>你的随机数生成器状态: ' + breathRNG.state + '.');
			$('#breathForecast').html('<b>预报</b><br><ol></ol>')
				.append($('<button class="btn btn-link" type="button" />').html('给我更久点的预报').on('click', forecastBreathMore));

			forecastBreathMore();
		};

		// Add Lightning forecast hits
		var forecastLightningMore = function(e) {
			if (buildingsOwned.length > 0 && lightningRNG)
				for (var i = 0; i < 10; i++) {
					var len = buildingsOwned.length;
					if (lightningRNG.hasLightningRod && buildingsOwned[-1] == buildingIds[-1]) {
						len -= 1;
					}
					var tier = lightningRNG.strikeTier(len);
					var hit = buildingNames[buildingsOwned[tier]];
					var li = $('<li />').html(hit).addClass('tier' + tier).data('tier', tier);
					$('#lightningForecast > ol').append(li);
				}

			// Update building highlighting
			for (var tier in buildingsHighlighted[0])
				if (buildingsHighlighted[0][tier])
					$('#lightningForecast > ol > li.tier' + tier).addClass('highlight');
				else
					$('#lightningForecast > ol > li.tier' + tier).removeClass('highlight');
		};

		// Add Miracle forecast hits
		var forecastMiracleMore = function(e) {
			if (buildingsOwned.length > 0 && miracleRNG)
				for (var i = 0; i < 10; i++) {
					var tier = miracleRNG.strikeTier(buildingsOwned.length);
					var hit = buildingNames[buildingsOwned[tier]];
					var li = $('<li />').html(hit).addClass('tier' + tier).data('tier', tier);
					$('#miracleForecast > ol').append(li);
				}

			// Update building highlighting
			for (var tier in buildingsHighlighted[1])
				if (buildingsHighlighted[1][tier])
					$('#miracleForecast > ol > li.tier' + tier).addClass('highlight');
				else
					$('#miracleForecast > ol > li.tier' + tier).removeClass('highlight');
		};

		// Add Breath forecast hits
		var forecastBreathMore = function(e)
        {
			if (breathRNG)
            {
				for (var i = 0; i < 10; i++)
                {
                    var hits = [0,0,0,0,0];
                    var textResult = [];
                    //slice() clones the array
                    var eligible = breathNames.slice();
                    for (var c = 0; c < breathTier; c++)
                    {
                        var len = eligible.length;
                        var breathColor = breathRNG.nextIntRange(0, len - 1);
                        var hit = eligible.splice(breathColor, 1);
                        var tier = breathNames.indexOf(hit[0]);

                        if (eligible.length == 0)
                        {
                            eligible = breathNames.slice();
                        }

                        hits[tier]++;
                    }

                    for (var c = 0; c <= 5; c++)
                    {
                        if (hits[c] > 0)
                        {
                            textResult.push('<span class="breath' + breathNames[c] + '">' + breathNames[c] + ((hits[c] > 1) ? '(x' + hits[c] + ')' : '') + '</span>');
                        }
                    }

                    var li = $('<li />').html(textResult.join(', '));
                    $('#breathForecast > ol').append(li);
		    	}
            }
		};

		// Add the Maelstrom forecast
		var forecastMaelstrom = function(save, buildingsAvailable)
        {
            var maelstromMessage = '';
            var maelstromForecast = '';

            // Check if the save actually has Maelstrom to forecast
            if (!util.save.hasSpell(save,"Maelstrom")) {
                maelstromMessage = '你未拥有大漩涡.';
                maelstromForecast = '还未有混沌试图将你卷入。';
            }

            // Early exit
            if (maelstromMessage != '' || maelstromForecast != '') {
                $('#maelstromMessage').html('<b>大漩涡</b><br>').append(maelstromMessage);
                $('#maelstromForecast').html('<b>预报</b><br>').append(maelstromForecast);
                    return;
            }

            // Create the RNG and get the initial forecast
            maelstromRNG = new PM_PRNG(save.spells[27].s);

            $('#maelstromMessage').html('<b>大漩涡</b><br>你的随机数生成器状态: ' + maelstromRNG.state + '.');
            $('#maelstromForecast').html('<b>预报</b><br><ol></ol>')
                .append($('<button class="btn btn-link" type="button" />').html('给我更久点的预报').on('click', forecastMaelstromMore));

            forecastMaelstromMore();
		};

        // Add Breath forecast hits
		var forecastMaelstromMore = function(e)
        {
			if (maelstromRNG)
            {
				for (var i = 0; i < 10; i++)
                {
                    //slice() clones the array
                    var eligible = buildingsAvailable.slice();
                    var targets = [];
                    var effects = [];
                    var textResult = [];

                    // Targets
                    for (var c = 0; c < maelstromTargets; c++)
                    {
                        var len = eligible.length;
                        var loc = maelstromRNG.nextIntRange(0, len - 1);
                        var hit = eligible[loc];
                        eligible.splice(loc, 1);
                        targets.push(hit);
                    }

                    // Effects
                    for (var c = 0; c < maelstromTargets; c++)
                    {
                        var len = maelstromEffects.length;
                        var hit = maelstromRNG.nextIntRange(0, len - 1);
                        effects.push(maelstromEffects[hit]);
                    }

                    // Text Result
                    for (var c = 0; c < maelstromTargets; c++)
                    {
                        textResult.push((c + 1) + '. ' + buildingNames[targets[c]] + ', ' + effects[c]);
                    }

                    var li = $('<li />').html(textResult.join('<br/>'));//.addClass('tier' + targets[c]).data('tier', targets[c]);
                    $('#maelstromForecast > ol').append(li);
		    	}
            }

            // Update building highlighting
			for (var tier in buildingsHighlighted[0])
            {
				if (buildingsHighlighted[0][tier])
                {
					$('#maelstromForecast > ol > li.tier' + tier).addClass('highlight');
                }
				else
                {
					$('#maelstromForecast > ol > li.tier' + tier).removeClass('highlight');
                }
            }
		};

        // Add the Limited Wish forecast
	var forecastLimitedWish = function(save, buildingsAvailable)
        {
            var limitedWishMessage = '';
            var limitedWishForecast = '';

            // Check if the save actually has Limited Wish to forecast
            if (!util.save.hasSpell(save,"Limited Wish")) {
                limitedWishMessage = '你未拥有有限祈愿。';
                limitedWishForecast = '灯神在另一盏灯里。';
            }

            // Early exit
            if (limitedWishMessage != '' || limitedWishForecast != '') {
                $('#limitedWishMessage').html('<b>有限祈愿</b><br>').append(limitedWishMessage);
                $('#limitedWishForecast').html('<b>预报</b><br>').append(limitedWishForecast);
		$('#limitedWishForecastOptions').hide();
		return;
            }


            // Create the RNG and get the initial forecast
            limitedWishRNG = new PM_PRNG(save.spells[29].s);

            limitedWishActivityTime = save.spells[29].active0;
            limitedWishCastCount = save.spells[29].c;
            baseLimitedWishCastCount = 1;

            // Persistent Entropy
            if (util.save.upgrade_owned(save,975))
            {
                limitedWishCastCount += 149;
                baseLimitedWishCastCount = 149;
            }

            // Djinn perk 1
            if (util.save.upgrade_owned(save,962))
            {
                limitedWishCastCount += save.spells[31].c;
            }

            limitedWishCastCount = Math.floor(limitedWishCastCount);

            limitedWishEligibleEffects = [];

            // Full Wish
            if (!util.save.upgrade_owned(save,994))
            {
                limitedWishEligibleEffects.push(limitedWishEffects[0]);
            }

            if (save.alignment == 1)
            {
                limitedWishEligibleEffects.push(limitedWishEffects[1]);
                limitedWishEligibleEffects.push(limitedWishEffects[6]);
                limitedWishEligibleEffects.push(limitedWishEffects[5]);
            }
            else if (save.alignment == 2)
            {
                limitedWishEligibleEffects.push(limitedWishEffects[3]);
                limitedWishEligibleEffects.push(limitedWishEffects[5]);
                limitedWishEligibleEffects.push(limitedWishEffects[4]);
            }
            else if (save.alignment == 3)
            {
                limitedWishEligibleEffects.push(limitedWishEffects[2]);
                limitedWishEligibleEffects.push(limitedWishEffects[6]);
                limitedWishEligibleEffects.push(limitedWishEffects[4]);
            }

            $('#limitedWishMessage').html('<b>有限祈愿</b><br>你的随机数生成器状态: ' + limitedWishRNG.state + '.');
            $('#limitedWishForecast, #limitedWishForecastAlt').html('<b>预报</b><br><ol></ol>')
                .append($('<button class="btn btn-link" type="button" />').html('给我更久点的预报').on('click', forecastLimitedWishMore));

            forecastLimitedWishMore();
	    limitedWishShowForecast();
	    $('#limitedWishForecastOptions').show();
		};

        var forecastLimitedWishMore = function(e)
        {
		if (limitedWishRNG)
		{
			for (var i = 0; i < 10; i++)
			{
				var typeHit = limitedWishRNG.nextIntRange(0, limitedWishEligibleEffects.length - 1);
				var strengthHit = Math.floor(limitedWishRNG.nextDoubleRange(baseLimitedWishCastCount, limitedWishCastCount + 1));

				//Due to Djinn perk 3 we can no longer accurately calculate limitedWish
				//create two results for both value and percentage
				var textResult = limitedWishEligibleEffects[typeHit] + ' 随机值为 ' + strengthHit.toLocaleString() + " (最大值 " + limitedWishCastCount.toLocaleString() + ").";
				var textResult2 = limitedWishEligibleEffects[typeHit] + '，幅度为' + ((strengthHit**0.45 / limitedWishCastCount**0.45) * 100).toPrecision(4) + '%';
				var li = $('<li />').html(textResult);
				var li2 = $('<li />').html(textResult2);
				$('#limitedWishForecast > ol').append(li);
				$('#limitedWishForecastAlt > ol').append(li2);

				limitedWishActivityTime += 12; // spell duration
				limitedWishCastCount++;
			}
		}
	};

        var limitedWishFormula = function(spellActivity, castCount)
        {
            return 2.25 * Math.pow(Math.log(spellActivity + 1), 1.35) * Math.pow(castCount, 0.45);
        }

	var limitedWishShowForecast = function()
	{
		if ($('input[name=LWForecastType]:checked').val() == "percentage") {
			$('#limitedWishForecast').hide();
			$('#limitedWishForecastAlt').show();
		}
		//default case: value
		else {
			$('#limitedWishForecast').show();
			$('#limitedWishForecastAlt').hide();
		}
	}

        // Add the Catalyst forecast
		var forecastCatalyst = function(save)
        {
            var catalystMessage = '';
            var catalystForecast = '';

            // Check if the save actually has Catalyst to forecast
	    if (!util.save.hasSpell(save,"催化剂")) {
                catalystMessage = '你未拥有催化剂。';
                catalystForecast = '谁知道混乱之血有这种魔力呢？';
            }

            // Early exit
            if (catalystMessage != '' || catalystForecast != '') {
                $('#catalystMessage').html('<b>催化剂</b><br>').append(catalystMessage);
                $('#catalystForecast').html('<b>预报</b><br>').append(catalystForecast);
                    return;
            }

            // Create the RNG and get the initial forecast
            catalystRNG = new PM_PRNG(save.spells[31].s);

			//check if djinn challenge 3 is active
            catalystTargets = util.save.challenge_active(save,991)?2:1;
	    //filter out already owned spells
            catalystEligibleEffects = catalystEffects.filter(spell => !util.save.hasSpell(save,spell));
			//ugh2
	    var spellIDs = [null,null,'Holy Light','Blood Frenzy','Gem Grinder',null,null,null,'Fairy Chanting','Moon Blessing', 'God\'s Hand', 'Goblin\'s Greed', 'Night Time', 'Hellfire Blast'];
            $('#catalystMessage').html('<b>催化剂</b><br>你的随机数生成器状态: ' + catalystRNG.state + '.');
	    if(save.catalystTargets.length > 0) $('#catalystCurrent').html('你当前的法术是: ' + spellIDs[save.catalystTargets[0]['targetspell']]);
	    if(save.catalystTargets.length > 1) $('#catalystCurrent').append('<br>' + '你当前的第二法术是: ' + spellIDs[save.catalystTargets[1]['targetspell']]);
            $('#catalystForecast').html('<b>预报</b><br><ol></ol>')
                .append($('<button class="btn btn-link" type="button" />').html('给我更久点的预报').on('click', forecastCatalystMore));

            forecastCatalystMore();
		};

        var forecastCatalystMore = function(e) {
		if (catalystRNG) {
			for (var i = 0; i < 10; i++) {
				var textResult = '';
				var tempEligibleEffects = catalystEligibleEffects.slice();
				for(var j = 0; j < catalystTargets; ++j) {
					var typeHit = catalystRNG.nextIntRange(0, tempEligibleEffects.length - 1);
					textResult += (j > 0? ', ':'') + tempEligibleEffects[typeHit];
					tempEligibleEffects.splice(typeHit, 1);
				}
				var li = $('<li />').html(textResult);;
				$('#catalystForecast > ol').append(li);
			}
		}
	};

	var forecastDJC4 = function(save) {
		if(!(util.save.challenge_active(save,992))) {
			$('#DJC4Message').html('<b>世界之愿</b><br>这里没有愿望……');
			$('#DJC4Forecast').html('<b>预报</b><br>没有世界之愿。');
			return;
		}
		DJC4RNG = new PM_PRNG(save.upgrades[992].s);
		$('#DJC4Message').html('<b>世界之愿</b><br>你的随机数生成器状态: ' + DJC4RNG.state + '.');
		$('#DJC4Forecast').html('<b>预报</b><br><ol></ol>')
		.append($('<button class="btn btn-link" type="button" />').html('给我更久点的预报').on('click', forecastDJC4More));
		forecastDJC4More(save);
	};
	//assistants, gem production, max mana
	var forecastDJC4More = function() {
		if(DJC4RNG) {
			for (var i = 0; i < 10; ++i) {
				var hit = DJC4Hits[DJC4RNG.nextIntRange(0,DJC4Hits.length - 1)];
				var textResult = '增加助手数量 ' + hit[0] + '%, 宝石产能加成 ' + hit[1] + '% 以及魔上限 ' + hit[2] + '%.';
				var li = $('<li />').html(textResult);;
				$('#DJC4Forecast > ol').append(li);
			}
		}
	}

		$(function() {

			// Initialize Bootstrap popovers
			$('[data-toggle="popover"]').popover();

			// Bind Save decoding and parsing
			$('#saveInput').on('paste', function(e) {
				// Empty the input right before the paste comes through
				$(this).val('');

				// The timeout ensures we can grab the save right after the paste comes through, without messing with the clipboard
				var self = this;
				setTimeout(function() {
					var saveStr = $(self).val();
					if (saveStr)
						forecast(saveStr);
				}, 1);
			}).trigger('focus');

			// Bind Re-Enter button to refresh the forecast using the current save string
			$('#doReEnter').on('click', function(e) {
				$('#saveInput').trigger('focus');
				var saveStr = $('#saveInput').val();
				if (saveStr)
					forecast(saveStr);
			});

			// Bind Copy button to copy the current save string
			$('#doSaveCopy').on('click', function(e) {
				$('#saveInput').trigger('focus');
				var save = $('#saveInput').val();
				window.prompt('复制到剪贴板: 按Ctrl+C, 然后Enter', save);
			});

			// Bind Clear button to clear the save input field
			$('#doSaveClear').on('click', function(e) {
				$('#saveInput').val('').trigger('focus');
			});

			// Automatically lengthen the forecast when scrolling to the bottom of the screen
			$(document).on('mousewheel DOMMouseScroll', function(e) {
				var delta = Math.max(-1, Math.min(1, (e.originalEvent.wheelDelta || -e.originalEvent.detail)));
				if (delta == -1 && ($(window).scrollTop() + $(window).height() >= $(document).height())) {
					forecastLightningMore();
					forecastMiracleMore();
					forecastBreathMore();
                    forecastMaelstromMore();
				}
			});

			// Click to toggle a building highlight
			$('#lightningForecast, #miracleForecast').on('click', 'ol > li', function(e) {
				var type = $(this).parent().parent().parent().index();
				var tier = $(this).data('tier');
				if (buildingsHighlighted[type][tier]) {
					buildingsHighlighted[type][tier] = false;
					$(this).parent().children('.tier' + tier).removeClass('highlight');
				} else {
					buildingsHighlighted[type][tier] = true;
					$(this).parent().children('.tier' + tier).addClass('highlight');
				}
			// Hover to temporarily highlight the building
			}).on('mouseenter', 'ol > li', function(e) {
				$(this).parent().children('.tier' + $(this).data('tier')).addClass('hover');
			}).on('mouseleave', 'ol > li', function(e) {
				$(this).parent().children('.tier' + $(this).data('tier')).removeClass('hover');
			});

			$('#buildings').on('click', 'span', function(e) {
				var tier = $(this).data('tier');
				if ($(this).hasClass('highlight')) {
					$(this).removeClass('highlight');
					buildingsHighlighted[0][tier] = buildingsHighlighted[1][tier] = false;
					$('#lightningForecast > ol, #miracleForecast > ol, #maelstromForceast > ol').children('.tier' + tier).removeClass('highlight');
				} else {
					$(this).addClass('highlight');
					buildingsHighlighted[0][tier] = buildingsHighlighted[1][tier] = true;
					$('#lightningForecast > ol, #miracleForecast > ol, #maelstromForceast > ol').children('.tier' + tier).addClass('highlight');
				}
			}).on('mouseenter', 'span', function(e) {
				$(this).addClass('hover');
				$('#lightningForecast > ol, #miracleForecast > ol').children('.tier' + $(this).data('tier')).addClass('hover');
			}).on('mouseleave', 'span', function(e) {
				$(this).removeClass('hover');
				$('#lightningForecast > ol, #miracleForecast > ol').children('.tier' + $(this).data('tier')).removeClass('hover');
			});

			$('input[type=radio][name=LWForecastType]').change(function() {
				limitedWishShowForecast();
			});

		});

	} (window, document, jQuery));
