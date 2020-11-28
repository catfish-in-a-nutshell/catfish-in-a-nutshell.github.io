	Flavor = new flavor();

	Flavor.intro = [
		{
			rule: 'const',
			payload: '这里是放'
		}, {
			rule: 'rand',
			payloads: [
				'冷笑话',
				'某些随机文字',
				'介绍文字'
			]
		}, {
			rule: 'const',
			payload: ' 的地方.'
		}
	];

	Flavor.title = [
		{
			rule: 'const',
			payload: 'Lara Crypt'
		}
	];

	Flavor.tagline = [
		{
			rule: 'rand',
			payloads: [
				'Because Re-Logic Shouldn\'t Get All the Undead Archaeologist Name Jokes',
				'Serial Archaeological Site Vandal',
				'You Might Say She\'s a... Pro-Spectre',
				'Ethereal Excavator',
				'Phantasmal Paleontologist',
				'Spectral Surveyor',
				'You Will Find \'Bad Joke\' in 1 Page Refresh',
				'I Dulled the Pain of Reading Realm Grinder\'s Code with Electro Swing'
			]
		}
	];

	Flavor.pageLoaded = function(vm) {
		vm.flavor.intro = this.renderString(this.intro);
		vm.flavor.title = this.renderString(this.title);
		vm.flavor.tagline = this.renderString(this.tagline);
	}
