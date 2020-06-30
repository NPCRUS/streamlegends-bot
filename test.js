var bot = (function bot() {
	const click = new MouseEvent('click', {
		view: window,
		bubbles: true,
		cancelable: true,
		clientX: 20,
	})

	class Stage {
		constructor() {
			this.state = Stage.Map
		}
		
		set(state) {
			this.state = state
		}

		isMap() {
			return this.state === Stage.Map
		}

		isFight() {
			return this.state === Stage.Fight
		}

		isReward() {
			return this.state === Stage.Reward
		}

		static get Map() {
			return 'map'
		}

		static get Fight() {
			return 'fight'
		}

		static get Reward() {
			return 'reward'
		}
	}

	const stage = new Stage()
	let interval = null

	return {
		boss: () => setupBossInterval(),
		raid: () => setupRaidInterval(),
		stop: () => {
			stage.set(Stage.Map)
			clearInterval(interval)
		}
	}

	function setupBossInterval() {
		if(interval !== null) {
			return console.error('some flow is already running, stop it first')
		}

		interval = setInterval(() => {
			if(stage.isMap()) pressFightSectionButton()
			else if(stage.isFight()) postFightButtonFlow()
			else if(stage.isReward()) pressContinueButton()
		}, 1000)
	}

	function setupRaidInterval() {
		if(interval !== null) {
			return console.error('some flow is already running, stop it first')
		}

		interval = setInterval(() => {
			if(stage.isMap()) pressFightSectionButton(false)
			else if(stage.isFight()) postFightButtonFlow(true)
			else if(stage.isReward()) pressContinueButton(true)
		}, 1000)
	}

	function pressFightSectionButton(boss = true) {
		const bossButton = boss 
			? document.querySelector('.StreamRpgMapNode:last-child')
			: document.querySelector('.StreamRpgMapNode')
		const fightButton = document.querySelector('.srpg-map-actions-fight-buttons .btn')
		if(bossButton === null) return false

		bossButton.dispatchEvent(click)
		fightButton.dispatchEvent(click)
		stage.set(Stage.Fight)
		return true
	}

	function postFightButtonFlow(raid = false) {
		const postFightButton = document.querySelector('.post-fight-button')
		if(postFightButton === null) return false

		// in case we got some juicy stuff
		postFightButton.dispatchEvent(click)
		if(postFightButton.classList.contains('srpg-button-reward')) {
			stage.set(Stage.Reward)
			return false
		} else {
			stage.set(Stage.Map)
			pressBackToMap()
			return true
		}
	}
	
	function pressContinueButton(raid = false) {
		const continueButton = document.querySelector('.srpg-button-continue')
		if(continueButton === null) return false

		continueButton.dispatchEvent(click)
		pressBackToMap()
		stage.set(Stage.Map)
		return true
	}

	function pressBackToMap() {
		const btn = document.querySelector('.srpg-button-maps')
		btn.dispatchEvent(click)
	}
})()

