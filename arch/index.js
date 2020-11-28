(function(window, document, $, undefined) {
  'use strict';

  function artifactCopy(artifact) {
    return {
      name: artifact.name,
      id: artifact.id,
      excav: artifact.excav,
      fixed: artifact.fixed,
      random: artifact.random,
      fail: artifact.fail,
      notry: artifact.notry,
      required: artifact.required,
      display: artifact.display,
      nocache: artifact.nocache,
      precheck: artifact.precheck
    };
  }

  function renderEvent(ev) {
    if (ev[0] == 'find') {
      return '挖出 ' + ev[1].name;
    }
    else if (ev[0] == 'improve') {
      return '可以挖出 ' + ev[2].name + ' (需要 ' + ev[2].display(ev[1]) + ')';
    }
  }

  function renderExcav(ex) {
    var msg = '挖掘深度 ' + ex[0] + ' (还有 ' + ex[1] + '): ';
    var evs = [];
    for (var i = 2; i < ex.length; i++) {
      evs.push(renderEvent(ex[i]));
    }
    return msg + listJoin(evs);
  }

  function controller() {
    this.loadSave = function(dat) {
      try {
        this.save = SaveHandler.Decode(dat);
        console.log('Decoded save:', this.save);
        if (this.save.options[0]) {
          this.save.options = this.save.options[0];
        }
        if (this.save.hasOwnProperty('buyButton')) {
          this.save.options.buyButton = this.save.buyButton;
        }
      } catch(err) {
        console.log(err);
        return;
      }
      View.result.state = this.save.artifactRngState;
      View.result.excavations = this.save.excavations;

      this.classifyArtifacts();
      View.excavs = [];
      var results = this.forecastArtifacts();
      for (var excav of results.events) {
        View.excavs.push(renderExcav(excav));
      }
      this.small_values = results.smalls;
      this.chart_rendered = false;
      if ($("div.tab-pane.active").attr('id') == 'tab-raw') {
        this.renderChart();
      }
	  View.raw.sv = "";
	  $('.artifactviewer').show();
	  $('.viewer-results').empty().html("点击上面的一个值，查看该值对应的遗物需求，");
	  $('#override-reincarnation').val(this.save.reincarnation);

    }

    this.forecastArtifacts = function() {
      var state = this.save.artifactRngState;
      var rng = new PM_PRNG(state);
      var excav = this.save.excavations;
      var remaining = this.eligible.length - this.unobtain.length + this.nonrandom.length;
      var eligible = this.eligible;
      var nonrandom = this.nonrandom;
      var unobtain = {};
      for (var i of this.unobtain) unobtain[i] = true;
      var canignore = -this.unobtain.length;
      var events = [];
      var num = util.save.stat(this.save, 35);
      var smalls = [];
      var raw_values = 0;
      var calculatedValues = (this.save.ascension >= 2 ? 100000 : 10000);
	    var excavLimit = calculatedValues;
      var valueLimit = (this.save.ascension >= 2 ? 0.001 : 0.01);

      while (remaining > 0) {
        excav += 1;
        num += 1;
        var excavation = [excav, excav - this.save.excavations];
        for (var i in eligible) {
          if (excav < eligible[i].excav || eligible[i].finished) continue;
          if (eligible[i].fail && eligible[i].fail(excav, num)) {
            eligible[i].finished = true;
            continue;
          }
          var val = rng.nextDouble();
          if (raw_values < calculatedValues) {
            raw_values += 1;
            if (val < valueLimit) smalls.push({x: raw_values, y: val});
          }
          if (unobtain[eligible[i].id]) continue;
          var random = eligible[i].nocache ? eligible[i].random(this.save, excav) : eligible[i].random;
          if (val < random) {
            excavation.push(['find', eligible[i]]);
            eligible[i].finished = true;
            remaining -= 1;
          } else if (eligible[i].required && !eligible[i].nocache) {
            var req = eligible[i].required(val, this.save, excav);
            if (req != NaN && req != Infinity && req >= 0 && (eligible[i].lastreq == null || req < eligible[i].lastreq)) {
              eligible[i].lastreq = req;
              excavation.push(['improve', req, eligible[i]]);
            }
          }

        }
        for (var i in nonrandom) {
          if (excav >= nonrandom[i].excav) {
            excavation.push(['find', nonrandom.splice(i, 1)[0]]);
            remaining -= 1;
          }
        }
        if (excavation.length > 2) {
          events.push(excavation);
        }
        if (excav > excavLimit || remaining <= canignore) {
          break;
        }
      }

      while (raw_values < calculatedValues) {
        var val = rng.nextDouble();
        raw_values += 1;
        if (val < valueLimit) smalls.push({x: raw_values, y: val});
      }
      return {events: events, smalls: smalls};
    }
    this.classifyArtifacts = function() {
      View.raw.owned = [];
      View.raw.eligible = [];
      View.raw.unobtain = [];
      View.raw.nonrandom = [];
      View.raw.ineligible = [];
	    View.raw.unowned = [];
      var excav = this.save.excavations;
      var num = util.save.stat(this.save, 35);
	    var unownede = [];
      var unownedi = [];

      this.eligible = [];
      this.unobtain = [];
      this.nonrandom = [];

      for (var artifact of Artifacts) {
        var fixed = (!artifact.fixed || artifact.fixed(this.save));
        var fail = (!artifact.fail || !artifact.fail(this.save, num + 1));
        var eligible = (artifact.precheck ? artifact.precheck(this.save) : fixed);
        if (util.save.trophy_owned(this.save, artifact.id)) {
          View.raw.owned.push(artifact.name);
        }
        else if (eligible && fail) {
          if (artifact.random) {
			      unownede.push(artifact);
            artifact = artifactCopy(artifact);
            if (!artifact.nocache) artifact.random = artifact.random(this.save);
            this.eligible.push(artifact);
            var name = artifact.name;
            if (excav < artifact.excav) name += ' (在 ' + artifact.excav + ' 深度之后)';
            View.raw.eligible.push(name);
            if (artifact.notry && artifact.notry(this.save)) {
              View.raw.unobtain.push(artifact.name);
              this.unobtain.push(artifact.id);
            }
          }
          else {
            this.nonrandom.push(artifactCopy(artifact));
            var name = artifact.name;
            if (excav < artifact.excav) name += ' (在 ' + artifact.excav + ' 深度)';
            View.raw.nonrandom.push(name);
          }
        }
        else {
          View.raw.ineligible.push(artifact.name);
		      unownedi.push(artifact);
        }
      }
	    View.raw.unowned = unownede.concat(unownedi);
    }

    this.renderChart = function() {
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = Chart.Line($('#chartcontainer'), {
        data: {
          datasets: [{
            label: '值',
            data: this.small_values,
            pointBackgroundColor: 'rgba(91, 110, 225, 0.7)',
            pointStrokeColor: 'rgba(63, 63, 116, 1)'
          }]
        },
        options: {
          showLines: false,
          title: {
            display: true,
            text: '小随机数值',
            fontSize: 16
          },
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              type: 'linear',
              position: 'bottom',
              scaleLabel: {
                display: true,
                labelString: '前方的随机数个数',
                fontSize: 14,
                fontStyle: 'bold'
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: '随机数值',
                fontSize: 14,
                fontStyle: 'bold'
              }
            }]
          },
          tooltips: {
            displayColors: false
          }
        }
      });
      this.chart.render();
      this.chart_rendered = true;
    }

	this.viewArtifacts = function() {
		if (View.raw.sv) {
			var svs,i,reinc;
			$(".viewer-results").empty().html("<b>挖掘深度:</b>  " + (View.raw.eligible.length > 0 ? Math.ceil(View.raw.sv.x / View.raw.eligible.length) + " (如果有效遗物的数量不变)":"无法移动小值，因为没有有效遗物")
			+ "<br><b>值:</b>  前方第 " + View.raw.sv.x + " 个随机值， " + " 是 <b>小值:</b> " + View.raw.sv.y);
			if (View.raw.unowned.length) {
				$(".viewer-results").append("<br><br><table><tbody>");
				svs = View.raw.eligible.length > 1 ? "<th> 需要的小值偏移量 <a>(?)</a></th>" : "";
				$(".viewer-results tbody").append("<tr><th> 遗物 </th><th> 需求 </th>" + svs);
				View.raw.eligible.length > 1 && $(".viewer-results th a").popover({
					trigger: "hover",
					html: true,
					content: '当你挖掘时，每个有效遗物每次挖掘会消耗1个随机值。如果你同时有不止一个有效遗物，这意味着'
					+ '一个好的小值可能被那个“错的”遗物消耗掉。你可以重开、在有更少（但至少1个）有效遗物时挖掘，来让小值发生偏移。'
					+ '	<br \><b>注意:</b> 如果有一个遗物在偶数次挖掘(比如2000次)时变得有效，那一次挖掘同样会造成一次小值偏移。'
				});
			}
			reinc = ($("#override-box").is(":checked") && !isNaN(parseInt($('#override-reincarnation').val()))) ? $('#override-reincarnation').val() : this.save.reincarnation;
			for (i = 0; i < View.raw.unowned.length; i++) {
				var artifact = View.raw.unowned[i];
				svs = "";
				i && i == View.raw.eligible.length && $(".viewer-results tbody").append("---");
				if (!artifact.reincarnation || reinc >= artifact.reincarnation) {
					var probability = artifact.required ? artifact.display(artifact.required(View.raw.sv.y)) : artifact.random ? View.raw.sv.y <= artifact.random(this.save, View.raw.sv.x) : 0;
					//change input if required: true = Obtainable, false = Not Obtainable, an actual value is unchanged
					if (probability = !0 === probability ? "可获得" : probability === !1 ? "不可获得" : probability) {
						if(i < View.raw.eligible.length && View.raw.eligible.length > 1) {
							svs = View.raw.sv.x % View.raw.eligible.length, svs = (i >= svs ? View.raw.eligible.length : 0) + svs - i - 1;
							svs = ("<td>" + (svs === 0 ? "使用该值" : (svs + " 次偏移")) + "</td>");
						}
						$(".viewer-results tbody").append("<tr><td>" + artifact.name + "</td><td>" + probability + "</td>" + svs + "</tr>");
					}
				}
			}
			//no results = remove a br, for consistent style
			$(".viewer-results tr").length == 1 && $(".viewer-results tbody, .viewer-results br").remove();
		}
	};
  }

  window.Controller = new controller();


  $(function() {

    // Initalize Vue
    window.View = new Vue({
      el: '#app',
      data: {
        flavor: {
          intro: 'you shouldn\'t be seeing these',
          title: 'something has gone',
          tagline: 'horribly wrong'
        },
        result: {
          state: null,
          excavations: null,
        },
        excavs: [],
        raw: {
          eligible: [],
          owned: [],
          unobtain: [],
          ineligible: [],
          nonrandom: []
        }
      },
      computed: {
        eligible: function() {
          return listJoin(this.raw.eligible);
        },
        owned: function() {
          return listJoin(this.raw.owned);
        },
        unobtain: function() {
          return listJoin(this.raw.unobtain);
        },
        ineligible: function() {
          return listJoin(this.raw.ineligible);
        },
        nonrandom: function() {
          return listJoin(this.raw.nonrandom);
        }
      }
    });
    Vue.config.debug = true;

    // Initialize Flavor texts
    Flavor.pageLoaded(View);

    // Initialize Bootstrap popovers
    $('[data-toggle="popover"]').popover();

	//Dechecks a checkbox
	$('#override-box').prop('checked', false);

    // Bind Save decoding and parsing
    $('#saveInput').on('paste', function(e) {
      // Empty the input right before the paste comes through
      $(this).val('');

      // The timeout ensures we can grab the save right after the paste comes through, without messing with the clipboard
      var self = this;
      setTimeout(function() {
        var saveStr = $(self).val();
        if (saveStr)
          Controller.loadSave(saveStr);
      }, 1);
    }).trigger('focus');

    // Bind Re-Enter button to refresh the forecast using the current save string
    $('#doReEnter').on('click', function(e) {
      $('#saveInput').trigger('focus');
      var saveStr = $('#saveInput').val();
      if (saveStr)
        Controller.loadSave(saveStr);
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

    $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
      var target = $(e.target).attr("href"); // activated tab
      if (Controller.small_values && !Controller.chart_rendered && target == '#tab-raw') {
        Controller.renderChart();
      }
    });

	$('#chartcontainer').on('click', function(e) {
		var activeElement = Controller.chart.getElementAtEvent(e);
		if(activeElement.length) {
			//clicked dot turns red, all other dots revert to default (blue)
			Controller.chart.data.datasets[0]._meta[Controller.chart.id].data.forEach(function(e){delete e.custom;});
			activeElement[0].custom = {backgroundColor : 'rgba(255, 0, 0, 0.7)'};
			View.raw.sv = Controller.chart.data.datasets[0].data[activeElement[0]._index];
			Controller.viewArtifacts();
			Controller.chart.update();

		}
	});

	$('#override-box').change(function() {
		($(this).is(':checked')) ? $('#artifactform').show() : $('#artifactform').hide()
		Controller.viewArtifacts();
	});

	$('#artifactform').change(function() {
		Controller.viewArtifacts();
	});

  });

} (window, document, jQuery));
