var bot = (() => {
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

    is(state) {
      return this.state === state
    }

    static get Map() {
      return 'StreamRpgMap'
    }

    static get Combat() {
      return 'StreamRpgCombat'
    }

    static get Reward() {
      return 'StreamRpgRewards'
    }

    static get LeaderBoard() {
      return 'StreamRpgRaidLeaderboard'
    }

    static get MapList() {
      return 'StreamRpgMapList'
    }
  }

  let interval = null
  let mapIndex = 0
  let areaIndex = 0
  let stage = new Stage();

  return {
    start: () => setupBotInterval(),
    stop: () => stop(),
  }

  function stop() {
    clearInterval(interval)
    interval = null
    mapIndex = 0
  }

  function setupBotInterval() {
    if (interval !== null)
      return console.error('some flow is already running, stop it first')

    mapIndex = getSelectedArea()

    if (mapIndex === null) {
      return console.error('plz start bot only on map')
    }

    interval = setInterval(() => {
      stage.set(getWindowStage())

      if (stage.is(Stage.Map)) {
        selectAreaOnMap(mapIndex)
        pressCombatSectionButton()
      } else if (stage.is(Stage.Combat)) {
        postFightButtonFlow()
      } else if (stage.is(Stage.Reward)) {
        pressContinueButton()
      } else if (stage.is(Stage.LeaderBoard)) {
        pressBackToMap()
      } else if (stage.is(Stage.MapList)) {
        console.error('error: jumped to maplist')
        stop()
      }
    }, 1000)
  }

  function getWindowStage() {
    return document.querySelector('.srpg-content-scrollbar-scrollable')
      .lastChild.classList[0]
  }

  function getSelectedArea() {
    let mapNodes = document.querySelectorAll('.node-available')

    for (let i = 0; i < mapNodes.length; i++) {
      const node = mapNodes[i]
      if (node.classList.contains('node-selected')) return i
    }

    return null
  }

  function selectAreaOnMap(index) {
    let nodes = document.querySelectorAll('.StreamRpgMapNode')

    if (nodes.length === 0) return console.error('cant find mapnodes')
    if (nodes.length < index)
      return console.error('cant find available mapnode by index')

    let node = nodes[index]

    if (!node.classList.contains('node-available'))
      return console.error('finded mapnode cant be selected')

    node.dispatchEvent(click)
    return true
  }

  function pressCombatSectionButton() {
    const fightButton = document.querySelector(
      '.srpg-map-actions-fight-buttons .btn, .srpg-map-actions-expired-button .btn'
    )
    fightButton.dispatchEvent(click)
    return true
  }

  function postFightButtonFlow() {
    const postFightButton = document.querySelector('.post-fight-button')
    if (postFightButton === null) return false

    postFightButton.dispatchEvent(click)
    return true
  }

  function pressContinueButton() {
    const continueButton = document.querySelector('.srpg-button-continue')
    if (continueButton === null) return false

    continueButton.dispatchEvent(click)
    return true
  }

  function pressBackToMap() {
    const btn = document.querySelector('.srpg-button-maps')
    if (btn === null) return false
    btn.dispatchEvent(click)
    return true
  }
})()
