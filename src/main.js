class Building {
    constructor(name, basePrice, baseProduction) {
        this.name = name;
        this.basePrice = basePrice;
        this.baseProduction = baseProduction;
        this.amount = 0;
        this.upgradeMultiplier = 1.15;
        this.baseMultiplier = 1;
        this.multMult = 1;
    }
    get getName() {
        return this.name;
    }
    get getPrice() {
        return this.basePrice * Math.pow(this.upgradeMultiplier, this.amount);
    }
    get getOutput() {
        let addBeforeMult = 0;
        let addAfterMult = 0;
        let nonCursorBuildings = 0;
        for (let i = 1; i < buildingNames.length; i++) {
            nonCursorBuildings += buildingMap.get(buildingNames[i]).getAmount;
        }
        addAfterMult += (Number(this.getName == "Cursor")) *
            (Number(allUpgrades[3].isApplied) * 0.1 * nonCursorBuildings) *
            (Number(allUpgrades[4].isApplied) * 4 + 1) *
            (Number(allUpgrades[5].isApplied) * 9 + 1) *
            (Number(allUpgrades[6].isApplied) * 19 + 1);
        return ((this.baseProduction + addBeforeMult) * this.baseMultiplier * this.multMult + addAfterMult) * this.amount;
    }
    multiplyMultiplier(multiplier) {
        this.multMult *= multiplier;
    }
    get getAmount() {
        return this.amount;
    }
    get toString() {
        if (cheats)
            return `${this.name}: ${Math.round(this.getOutput / (this.getAmount + 1) / this.getPrice * 100000) / 100}<br />🍪 ${formatNumber(Math.ceil(this.getPrice))}`;
        else
            return `${this.name}<br />🍪 ${formatNumber(Math.ceil(this.getPrice))}`;
    }
    addAmount(amount) {
        this.amount += amount;
    }
}
class Upgrade {
    constructor(id, name, basePrice, description, condition, debug = false) {
        this.id = id;
        this.name = name;
        this.basePrice = basePrice;
        this.description = description;
        this.condition = condition;
        this.applied = false;
        this.debug = debug;
    }
    applyEffect() {
        switch (this.id) {
            case 0: // Reinforced index finger
            case 1: // Carpal tunnel prevention cream
            case 2: // Ambidextrous
                addCookies(-this.getPrice);
                buildingMap.get("cursor").multiplyMultiplier(2);
                clickMultiplier *= 2;
                break;
            case 3: // Thousand fingers
                addCookies(-this.getPrice);
                break;
            case 4: // Million fingers
                addCookies(-this.getPrice);
                break;
            case 5: // Billion fingers
                addCookies(-this.getPrice);
                break;
            case 6: // Trillion fingers
                addCookies(-this.getPrice);
                break;
            case 7: // Forwards from grandma
            case 8: // Steel-plated rolling pins
            case 9: // Lubricated dentures
            case 44: // Prune juice
            case 110: // Double-thick glasses
            case 192: // Aging agents
            case 294: // Xtreme walkers
            case 307: // The Unbridling
            case 428: // Reverse dementia
            case 480: // Timeproof hair dyes
            case 506: // Good manners
            case 662: // Generation degeneration
            case 700: // Visits
            case 743: // Kitchen cabinets
            case 840: // Foam-tipped canes
                addCookies(-this.getPrice);
                buildingMap.get("grandma").multiplyMultiplier(2);
                break;
            case 10: // Cheap hoes
            case 11: // Fertilizer
            case 12: // Cookie trees
            case 45: // Genetically-modified cookies
            case 111: // Gingerbread scarecrows
            case 193: // Pulsar sprinklers
            case 295: // Fudge fungus
            case 308: // Wheat triffids
            case 429: // Humane pesticides
            case 481: // Barnstars
            case 507: // Lindworms
            case 663: // Global seed vault
            case 701: // Reverse-veganism
            case 744: // Cookie mulch
            case 841: // Self-driving tractors
                addCookies(-this.getPrice);
                buildingMap.get("farm").multiplyMultiplier(2);
                break;
            case 16: // Sugar gas
            case 17: // Megadrill
            case 18: // Ultradrill
            case 47: // Ultimadrill
            case 113: // H-bomb mining
            case 195: // Coreforge
            case 296: // Planetsplitters
            case 309: // Canola oil wells
            case 430: // Mole people
            case 482: // Mine canaries
            case 508: // Bore again
            case 664: // Air mining
            case 702: // Caramel alloys
            case 745: // Delicious mineralogy
            case 842: // Mineshaft supports
                addCookies(-this.getPrice);
                buildingMap.get("mine").multiplyMultiplier(2);
                break;
            case 13: // Sturdier conveyor belts
            case 14: // Child labor
            case 15: // Sweatshop
            case 46: // Radium reactors
            case 112: // Recombobulators
            case 194: // Deep-bake process
            case 297: // Cyborg workforce
            case 310: // 78-hour days
            case 431: // Machine learning
            case 483: // Brownie point system
            case 509: // "Volunteer" interns
            case 665: // Behavioral reframing
            case 703: // The infinity engine
            case 746: // N-dimensional assembly lines
            case 843: // Universal automation
                addCookies(-this.getPrice);
                buildingMap.get("factory").multiplyMultiplier(2);
                break;
            case 232: // Taller tellers
            case 233: // Scissor-resistant credit cards
            case 234: // Acid-proof vaults
            case 235: // Chocolate coins
            case 236: // Exponential interest rates
            case 237: // Financial zen
            case 298: // Way of the wallet
            case 311: // The stuff rationale
            case 432: // Edible money
            case 484: // Grand supercycle
            case 510: // Rules of acquisition
            case 666: // Altruistic loop
            case 704: // Diminishing tax returns
            case 747: // Cookie Points
            case 844: // The big shortcake
                addCookies(-this.getPrice);
                buildingMap.get("bank").multiplyMultiplier(2);
                break;
            case 238: // Golden idols
            case 239: // Sacrifices
            case 240: // Delicious blessing
            case 241: // Sun festival
            case 242: // Enlarged pantheon
            case 243: // Great Baker in the sky
            case 299: // Creation myth
            case 312: // Theocracy
            case 433: // Sick rap prayers
            case 485: // Psalm-reading
            case 511: // War of the gods
            case 667: // A novel idea
            case 705: // Apparitions
            case 748: // Negatheism
            case 845: // Temple traps
                addCookies(-this.getPrice);
                buildingMap.get("temple").multiplyMultiplier(2);
                break;
            case 244: // Pointier hats
            case 245: // Beardlier beards
            case 246: // Ancient grimoires
            case 247: // Kitchen curses
            case 248: // School of sorcery
            case 249: // Dark formulas
            case 300: // Cookiemancy
            case 313: // Rabbit trick
            case 434: // Deluxe tailored wands
            case 486: // Impossible spellcasting
            case 512: // Electricity
            case 668: // Spelling bees
            case 706: // Wizard basements
            case 749: // Magical realism
            case 846: // Polymorphism
                addCookies(-this.getPrice);
                buildingMap.get("wizard").multiplyMultiplier(2);
                break;
            case 19: // Vanilla nebulae
            case 20: // Wormholes
            case 21: // Frequent flyer
            case 48: // Warp drive
            case 114: // Chocolate monoliths
            case 196: // Generation ships
            case 301: // Dyson sphere
            case 314: // The final frontier
            case 435: // Autopilot
            case 487: // Restaurants at the end of the universe
            case 513: // Universal alphabet
            case 669: // Toroid universe
            case 707: // Prime directive
            case 750: // Cosmic foreground radiation
            case 847: // At your doorstep in 30 minutes or your money back
                addCookies(-this.getPrice);
                buildingMap.get("shipments").multiplyMultiplier(2);
                break;
            case 22: // Antimony
            case 23: // Essence of dough
            case 24: // True chocolate
            case 49: // Ambrosia
            case 115: // Aqua custulae
            case 197: // Origin crucible
            case 302: // Theory of atomic fluidity
            case 315: // Beige goo
            case 436: // The advent of chemistry
            case 488: // On second thought
            case 514: // Public betterment
            case 670: // Hermetic reconciliation
            case 708: // Chromatic cycling
            case 751: // Arcanized glassware
            case 848: // The dose makes the poison
                addCookies(-this.getPrice);
                buildingMap.get("alchemy").multiplyMultiplier(2);
                break;
            case 25: // Ancient tablet
            case 26: // Insane oatling workers
            case 27: // Soul bond
            case 50: // Sanity dance
            case 116: // Brane transplant
            case 198: // Deity-sized portals
            case 303: // End of times back-up plan
            case 316: // Maddening chants
            case 437: // The real world
            case 489: // Dimensional garbage gulper
            case 515: // Embedded microportals
            case 671: // His advent
            case 709: // Domestic rifts
            case 752: // Portal guns
            case 849: // A way home
                addCookies(-this.getPrice);
                buildingMap.get("portal").multiplyMultiplier(2);
                break;
            case 28: // Flux capacitors
            case 29: // Time paradox resolver
            case 30: // Quantum conundrum
            case 51: // Causality enforcer
            case 117: // Yestermorrow comparators
            case 199: // Far future enactment
            case 304: // Great loop hypothesis
            case 317: // Cookietopian moments of maybe
            case 438: // Seconds seconds
            case 490: // Additional clock hands
            case 516: // Nostalgia
            case 672: // Split seconds
            case 710: // Patience abolished
            case 753: // Timeproof upholstery
            case 850: // Rectifying a mistake
                addCookies(-this.getPrice);
                buildingMap.get("time").multiplyMultiplier(2);
                break;
            case 99: // Sugar bosons
            case 100: // String theory
            case 101: // Large macaron collider
            case 102: // Bing bang bake
            case 118: // Reverse cyclotrons
            case 200: // Nanocosmics
            case 305: // The Pulse
            case 318: // Some other super-tiny fundamental particle? Probably?
            case 439: // Quantum comb
            case 491: // Baking Nobel prize
            case 517: // The definite molecule
            case 673: // Flavour itself
            case 711: // Delicious pull
            case 754: // Employee minification
            case 851: // Candied atoms
                addCookies(-this.getPrice);
                buildingMap.get("antimatter").multiplyMultiplier(2);
                break;
            case 175: // Gem polish
            case 176: // 9th color
            case 177: // Chocolate light
            case 178: // Grainbow
            case 179: // Pure cosmic light
            case 201: // Glow-in-the-dark
            case 306: // Lux sanctorum
            case 319: // Reverse shadows
            case 440: // Crystal mirrors
            case 492: // Reverse theory of light
            case 518: // Light capture measures
            case 674: // Light speed limit
            case 712: // Occam's laser
            case 755: // Hyperblack paint
            case 852: // Lab goggles but like cool shades
                addCookies(-this.getPrice);
                buildingMap.get("prism").multiplyMultiplier(2);
                break;
            case 416: // Your lucky cookie
            case 417: // "All Bets Are Off" magic coin
            case 418: // Winning lottery ticket
            case 419: // Four-leaf clover field
            case 420: // A recipe book about books
            case 421: // Leprechaun village
            case 422: // Improbability drive
            case 423: // Antisuperstistronics
            case 441: // Bunnypedes
            case 493: // Revised probabilistics
            case 519: // 0-sided dice
            case 675: // A touch of determinism
            case 713: // On a streak
            case 756: // Silver lining maximization
            case 853: // Gambler's fallacy fallacy
                addCookies(-this.getPrice);
                buildingMap.get("chance").multiplyMultiplier(2);
                break;
            case 522: // Matebakeries
            case 523: // Mandelbrown sugar
            case 524: // Fractoids
            case 525: // Nested universe theory
            case 526: // Menger sponge cake
            case 527: // One particularly good-humored cow
            case 528: // Chocolate ouroboros
            case 529: // Nested
            case 530: // Space-filling fibers
            case 531: // Endless book of prose
            case 532: // The set of all sets
            case 676: // This upgrade
            case 714: // A box
            case 757: // Multiscale profiling
            case 854: // The more they stay the same
                addCookies(-this.getPrice);
                buildingMap.get("fractal").multiplyMultiplier(2);
                break;
            case 594: // The JavaScript console for dummies
            case 595: // 64bit arrays
            case 596: // Stack overflow
            case 597: // Enterprise compiler
            case 598: // Syntactic sugar
            case 599: // A nice cup of coffee
            case 600: // Just-in-time baking
            case 601: // cookies++
            case 602: // Software updates
            case 603: // Game.Loop
            case 604: // eval()
            case 677: // Your biggest fans
            case 715: // Hacker shades
            case 758: // PHP containment vats
            case 855: // Simulation failsafes
                addCookies(-this.getPrice);
                buildingMap.get("js").multiplyMultiplier(2);
                break;
            case 684: // Manifest destiny
            case 685: // The multiverse in a nutshell
            case 686: // All-conversion
            case 687: // Multiverse agents
            case 688: // Escape plan
            case 689: // Game design
            case 690: // Sandbox universes
            case 691: // Multiverse wars
            case 692: // Mobile ports
            case 693: // Encapsulated realities
            case 694: // Extrinsic clicking
            case 695: // Universal idling
            case 716: // Break the fifth wall
            case 759: // Opposite universe
            case 856: // The other routes to Rome
                addCookies(-this.getPrice);
                buildingMap.get("idle").multiplyMultiplier(2);
                break;
            case 730: // Principled neural shackles
            case 731: // Obey
            case 732: // A sprinkle of irrationality
            case 733: // Front and back hemispheres
            case 734: // Neural networking
            case 735: // Cosmic brainstorms
            case 736: // Megatherapy
            case 737: // Synaptic lubricant
            case 738: // Psychokinesis
            case 739: // Spines
            case 740: // Neuraforming
            case 741: // Epistemological trickery
            case 742: // Every possible idea
            case 760: // The land of dreams
            case 857: // Intellectual property theft
                addCookies(-this.getPrice);
                buildingMap.get("cortex").multiplyMultiplier(2);
                break;
            case 826: // Cloning vats
            case 827: // Energized nutrients
            case 828: // Stunt doubles
            case 829: // Clone recycling plant
            case 830: // Free-range clones
            case 831: // Genetic tailoring
            case 832: // Power in diversity
            case 833: // Self-betterment
            case 834: // Source control
            case 835: // United workforce
            case 836: // Safety patrols
            case 837: // Clone rights
            case 838: // One big family
            case 839: // Fine-tuned body plans
            case 858: // Reading your clones bedtime stories
                addCookies(-this.getPrice);
                buildingMap.get("you").multiplyMultiplier(2);
                break;
            case 31: // Kitten helpers
                addCookies(-this.getPrice);
                kittenUpgrades[0] = 0.1;
                break;
            case 32: // Kitten workers
                addCookies(-this.getPrice);
                kittenUpgrades[1] = 0.125;
                break;
            case 33: // Pain cookies
            case 34: // Sugar cookies
            case 35: // Oatmeal raisin cookies
                addCookies(-this.getPrice);
                cpsMultiplier += 0.01;
                break;
            case 36: // Peanut butter cookies
            case 37: // Coconut cookies
            case 38: // White chocolate cookies
            case 39: // Macadamia nut cookies
            case 40: // Double-chip cookies
                addCookies(-this.getPrice);
                cpsMultiplier += 0.02;
                break;
        }
        this.applied = true;
    }
    get getId() {
        return this.id;
    }
    get getName() {
        return this.name;
    }
    get getPrice() {
        return this.basePrice;
    }
    get getDescription() {
        return this.description;
    }
    get getCondition() {
        return this.condition;
    }
    get isApplied() {
        return this.applied;
    }
    get isDebug() {
        return this.debug;
    }
    get isAvailable() {
        if (this.applied)
            return false;
        switch (this.id) {
            case 0:
            case 1:
                if (buildingMap.get("cursor").getAmount >= 1)
                    return true;
                break;
            case 2:
                if (buildingMap.get("cursor").getAmount >= 10)
                    return true;
                break;
            case 3:
                if (buildingMap.get("cursor").getAmount >= 25)
                    return true;
                break;
            case 4:
                if (buildingMap.get("cursor").getAmount >= 50)
                    return true;
                break;
            case 5:
                if (buildingMap.get("cursor").getAmount >= 100)
                    return true;
                break;
            case 6:
                if (buildingMap.get("cursor").getAmount >= 150)
                    return true;
                break;
            case 7:
                if (buildingMap.get("grandma").getAmount >= 1)
                    return true;
                break;
            case 8:
                if (buildingMap.get("grandma").getAmount >= 5)
                    return true;
                break;
            case 9:
                if (buildingMap.get("grandma").getAmount >= 25)
                    return true;
                break;
            case 10:
                if (buildingMap.get("farm").getAmount >= 1)
                    return true;
                break;
            case 11:
                if (buildingMap.get("farm").getAmount >= 5)
                    return true;
                break;
            case 12:
                if (buildingMap.get("farm").getAmount >= 25)
                    return true;
                break;
            case 13:
                if (buildingMap.get("factory").getAmount >= 1)
                    return true;
                break;
            case 14:
                if (buildingMap.get("factory").getAmount >= 5)
                    return true;
                break;
            case 15:
                if (buildingMap.get("factory").getAmount >= 25)
                    return true;
                break;
            case 16:
                if (buildingMap.get("mine").getAmount >= 50)
                    return true;
        }
        return false;
    }
}
class Achievement {
}
const buildingNames = ["cursor", "grandma", "farm", "mine", "factory", "bank", "temple", "wizard", "shipment", "alchemy", "portal", "time", "antimatter", "prism"];
let cookies = 0;
let clickMultiplier = 1;
let cps = 0;
let cpsMultiplier = 1;
let cheats = false;
let pledges = 0;
let achievementsEarnedAmount = 0;
const framerate = 10;
const clickButton = document.getElementById("clickButton");
const cookieCount = document.getElementById("cookieCount");
const info = document.getElementById("info");
const infoMap = getEmptyInfo();
const buttonMap = getButtons();
const buildingMap = getBuildings();
const allUpgrades = getUpgrades();
const availableUpgrades = [];
const allAchievements = getAchievements();
const kittenUpgrades = [];
setInterval(tick, 1000 / framerate);
document.addEventListener("DOMContentLoaded", () => {
    clickButton.addEventListener("click", () => {
        let clickAdd = 0;
        let nonCursorBuildings = 0;
        for (let i = 1; i < buildingNames.length; i++) {
            nonCursorBuildings += buildingMap.get(buildingNames[i]).getAmount;
        }
        clickAdd += (Number(allUpgrades[3].isApplied) * 0.1 * nonCursorBuildings) *
            (Number(allUpgrades[4].isApplied) * 4 + 1) *
            (Number(allUpgrades[5].isApplied) * 9 + 1) *
            (Number(allUpgrades[6].isApplied) * 19 + 1);
        addCookies(clickMultiplier + clickAdd);
        buttonMap.get("cursor").style.visibility = "visible";
    });
    for (let i = 0; i < buildingNames.length; i++) {
        let buildingName = buildingNames[i];
        buttonMap.get(buildingName).addEventListener("click", () => {
            buyBuilding(buildingMap.get(buildingName));
            infoMap.set(buildingName, `${buildingName}: ${buildingMap.get(buildingName).getAmount}<br />`);
            if (i + 1 < buildingNames.length)
                buttonMap.get(buildingNames[i + 1]).style.visibility = "visible";
            updateCps();
            updateButtons();
        });
    }
    const infoPanel = document.getElementById("infoPanel");
    const upgradeButtons = Array(4);
    upgradeButtons[0] = document.getElementById("upgradeButton0");
    upgradeButtons[1] = document.getElementById("upgradeButton1");
    upgradeButtons[2] = document.getElementById("upgradeButton2");
    upgradeButtons[3] = document.getElementById("upgradeButton3");
    for (let i = 0; i < 3; i++) {
        const button = upgradeButtons[i];
        button.addEventListener("mouseenter", () => {
            if (availableUpgrades[i]) {
                const currentUpgrade = availableUpgrades[i];
                let infoPanelText = "";
                infoPanelText += `<div class="upgradePrice">🍪 ${formatNumber(currentUpgrade.getPrice)}</div>`;
                infoPanelText += `<div class="upgradeName">${currentUpgrade.getName}</div>`;
                infoPanelText += currentUpgrade.getDescription;
                infoPanel.innerHTML = infoPanelText;
                infoPanel.style.display = "block";
            }
        });
        button.addEventListener("mouseleave", () => {
            infoPanel.style.display = "none";
        });
        button.addEventListener("mousemove", (event) => {
            infoPanel.style.left = event.pageX - infoPanel.scrollWidth + "px";
            infoPanel.style.top = event.pageY + "px";
        });
        button.addEventListener("click", () => {
            for (let u of allUpgrades) {
                if (u !== availableUpgrades[i])
                    continue;
                u.applyEffect();
                updateAvailableUpgrades();
                updateCps();
                button.dispatchEvent(new MouseEvent("mouseenter"));
                break;
            }
        });
    }
});
function buyBuilding(building, amount = 1) {
    cookies -= building.getPrice * amount;
    building.addAmount(amount);
    updateCookies();
    updateAvailableUpgrades();
}
function addCookies(deltaCookies) {
    if (deltaCookies < 0)
        console.log(deltaCookies);
    cookies += deltaCookies;
    updateCookies();
    updateButtons();
    updateAvailableUpgrades();
}
function updateCps() {
    let newCps = 0;
    buildingMap.forEach(building => {
        newCps += building.getOutput;
        newCps *= cpsMultiplier;
        newCps *= milkMultiplier();
    });
    cps = newCps;
    infoMap.set("cps", `cookies/s: ${formatNumber(Math.round(cps * 10) / 10)}<br />`);
    updateInfo();
}
function updateCookies() {
    cookieCount.innerHTML = `${formatNumber(Math.floor(cookies))}`;
}
function updateInfo() {
    let infoText = "";
    infoText += infoMap.get("cps");
    buildingNames.forEach(buildingName => {
        infoText += infoMap.get(buildingName);
    });
    info.innerHTML = infoText;
}
function updateButtons() {
    for (let key of buttonMap.keys()) {
        const button = buttonMap.get(key);
        const building = buildingMap.get(key);
        button.disabled = building.getPrice > Math.floor(cookies);
        button.innerHTML = building.toString;
    }
}
function updateAvailableUpgrades() {
    availableUpgrades.length = 0;
    for (let u of allUpgrades) {
        if (!u)
            continue;
        if (u.isAvailable)
            availableUpgrades.push(u);
    }
    availableUpgrades.sort((a, b) => {
        const priceDiff = a.getPrice - b.getPrice;
        return priceDiff !== 0 ? priceDiff : a.getName.localeCompare(b.getName);
    });
    for (let i = 0; i < 4; i++) {
        const upgradeButton = document.getElementById("upgradeButton" + i);
        if (availableUpgrades[i]) {
            upgradeButton.style.backgroundImage = `url("resources/upgrades/${availableUpgrades[i].getId}.png")`;
            upgradeButton.style.backgroundSize = "cover";
            upgradeButton.disabled = availableUpgrades[i].getPrice > Math.floor(cookies);
            upgradeButton.style.visibility = "visible";
        }
        else {
            upgradeButton.style.visibility = "hidden";
        }
    }
}
function tick() {
    addCookies(cps / framerate);
}
function formatNumber(num) {
    if (num < 10000)
        return num.toString();
    let e = 0;
    while (num >= 10000) {
        e++;
        num /= 10;
    }
    return `${Math.round(num / 100) / 10}e${e + 3}`;
}
function milkMultiplier() {
    let multiplier = 1;
    kittenUpgrades.forEach(upgrade => {
        multiplier *= (1 + upgrade * achievementsEarnedAmount * 0.04);
    });
    return multiplier;
}
function getBuildings() {
    const buildings = new Map();
    buildings.set("cursor", new Building("Cursor", 15, 0.1));
    buildings.set("grandma", new Building("Grandma", 100, 1));
    buildings.set("farm", new Building("Farm", 1100, 8));
    buildings.set("mine", new Building("Mine", 12000, 47));
    buildings.set("factory", new Building("Factory", 130000, 260));
    buildings.set("bank", new Building("Bank", 1400000, 1400));
    buildings.set("temple", new Building("Temple", 20000000, 7800));
    buildings.set("wizard", new Building("Wizard Tower", 330000000, 44000));
    buildings.set("shipment", new Building("Shipment", 5100000000, 260000));
    buildings.set("alchemy", new Building("Alchemy Lab", 75000000000, 1600000));
    buildings.set("portal", new Building("Portal", 1000000000000, 10000000));
    buildings.set("time", new Building("Time Machine", 14000000000000, 65000000));
    buildings.set("antimatter", new Building("Antimatter Condenser", 170000000000000, 430000000));
    buildings.set("prism", new Building("Prism", 2100000000000000, 2900000000000));
    return buildings;
}
function getButtons() {
    const buttons = new Map();
    buildingNames.forEach(buildingName => {
        buttons.set(buildingName, document.getElementById(buildingName + "Button"));
    });
    return buttons;
}
function getEmptyInfo() {
    let emptyInfo = new Map();
    emptyInfo.set("cps", "\n");
    buildingNames.forEach(buildingName => {
        emptyInfo.set(buildingName, "\n");
    });
    return emptyInfo;
}
function getUpgrades() {
    const upgrades = [];
    upgrades[0] = new Upgrade(0, "Reinforced index finger", 100, "The mouse and cursors are <b>twice</b> as efficient.<q>prod prod</q>", "Own 1 cursor");
    upgrades[1] = new Upgrade(1, "Carpal tunnel prevention cream", 500, "The mouse and cursors are <b>twice</b> as efficient.<q>it... it hurts to click...</q>", "Own 1 cursor");
    upgrades[2] = new Upgrade(2, "Ambidextrous", 10000, "The mouse and cursors are <b>twice</b> as efficient.<q>Look ma, both hands!</q>", "Own 10 cursors");
    upgrades[3] = new Upgrade(3, "Thousand fingers", 100000, "The mouse and cursors gain <b>+0.1</b> cookies for each non-cursor object owned.<q>clickity</q>", "Own 25 cursors");
    upgrades[4] = new Upgrade(4, "Million fingers", 10000000, "Multiplies the gain from Thousand fingers by <b>5</b>.<q>clickityclickity</q>", "Own 50 cursors");
    upgrades[5] = new Upgrade(5, "Billion fingers", 100000000, "Multiplies the gain from Thousand fingers by <b>10</b>.<q>clickityclickityclickity</q>", "Own 100 cursors");
    upgrades[6] = new Upgrade(6, "Trillion fingers", 1000000000, "Multiplies the gain from Thousand fingers by <b>20</b>.<q>clickityclickityclickityclickity</q>", "Own 150 cursors");
    upgrades[7] = new Upgrade(7, "Forwards from grandma", 1000, "Grandmas are <b>twice</b> as efficient.<q>RE:RE:thought you'd get a kick out of this ;))</q>", "Own 1 grandma");
    upgrades[8] = new Upgrade(8, "Steel-plated rolling pins", 5000, "Grandmas are <b>twice</b> as efficient.<q>Just what you kneaded.</q>", "Own 5 grandmas");
    upgrades[9] = new Upgrade(9, "Lubricated dentures", 50000, "Grandmas are <b>twice</b> as efficient.<q>squish</q>", "Own 25 grandmas");
    upgrades[10] = new Upgrade(10, "Cheap hoes", 11000, "Farms are <b>twice</b> as efficient.<q>Rake in the dough!</q>", "Own 1 farm");
    upgrades[11] = new Upgrade(11, "Fertilizer", 55000, "Farms are <b>twice</b> as efficient.<q>It's chocolate, I swear.</q>", "Own 5 farms");
    upgrades[12] = new Upgrade(12, "Cookie trees", 550000, "Farms are <b>twice</b> as efficient.<q>A relative of the breadfruit.</q>", "Own 25 farms");
    upgrades[13] = new Upgrade(13, "Sturdier conveyor belts", 1300000, "Factories are <b>twice</b> as efficient.<q>You're going places.</q>", "Own 1 factory");
    upgrades[14] = new Upgrade(14, "Child labor", 6500000, "Factories are <b>twice</b> as efficient.<q>Cheaper, healthier workforce.</q>", "Own 5 factories");
    upgrades[15] = new Upgrade(15, "Sweatshop", 65000000, "Factories are <b>twice</b> as efficient.<q>Slackers will be terminated.</q>", "Own 25 factories");
    upgrades[16] = new Upgrade(16, "Sugar gas", 120000, "Mines are <b>twice</b> as efficient.<q>A pink, volatile gas, found in the depths of some chocolate caves.</q>", "Own 1 mine");
    upgrades[17] = new Upgrade(17, "Megadrill", 600000, "Mines are <b>twice</b> as efficient.<q>You're in deep.</q>", "Own 5 mines");
    upgrades[18] = new Upgrade(18, "Ultradrill", 6000000, "Mines are <b>twice</b> as efficient.<q>Finally caved in?</q>", "Own 25 mines");
    upgrades[19] = new Upgrade(19, "Vanilla nebulae", 51000000000, "Shipments are <b>twice</b> as efficient.<q>If you removed your space helmet, you could probably smell it!<br />(Note : don't do that.)</q>", "Own 1 shipment");
    upgrades[20] = new Upgrade(20, "Wormholes", 255000000000, "Shipments are <b>twice</b> as efficient.<q>By using these as shortcuts, your ships can travel much faster.</q>", "Own 5 shipments");
    upgrades[21] = new Upgrade(21, "Frequent flyer", 2550000000000, "Shipments are <b>twice</b> as efficient.<q>Come back soon!</q>", "Own 25 shipments");
    upgrades[22] = new Upgrade(22, "Antimony", 750000000000, "Alchemy labs are <b>twice</b> as efficient.<q>Actually worth a lot of money.</q>", "Own 1 alchemy lab");
    upgrades[23] = new Upgrade(23, "Essence of dough", 3750000000000, "Alchemy labs are <b>twice</b> as efficient.<q>Extracted through the 5 ancient steps of alchemical baking.</q>", "Own 5 alchemy labs");
    upgrades[24] = new Upgrade(24, "True chocolate", 37500000000000, "Alchemy labs are <b>twice</b> as efficient.<q>The purest form of cacao.</q>", "Own 25 alchemy labs");
    upgrades[25] = new Upgrade(25, "Ancient tablet", 10000000000000, "Portals are <b>twice</b> as efficient.<q>A strange slab of peanut brittle, holding an ancient cookie recipe. Neat!</q>", "Own 1 portal");
    upgrades[26] = new Upgrade(26, "Insane oatling workers", 50000000000000, "Portals are <b>twice</b> as efficient.<q>ARISE, MY MINIONS!</q>", "Own 5 portals");
    upgrades[27] = new Upgrade(27, "Soul bond", 500000000000000, "Portals are <b>twice</b> as efficient.<q>So I just sign up and get more cookies? Sure, whatever!</q>", "Own 25 portals");
    upgrades[28] = new Upgrade(28, "Flux capacitors", 140000000000000, "Time machines are <b>twice</b> as efficient.<q>Back to the future.</q>", "Own 1 time machine");
    upgrades[29] = new Upgrade(29, "Time paradox resolver", 700000000000000, "Time machines are <b>twice</b> as efficient.<q>No more fooling around with your own grandmother!</q>", "Own 5 time machines");
    upgrades[30] = new Upgrade(30, "Quantum conundrum", 7000000000000000, "Time machines are <b>twice</b> as efficient.<q>There is only one constant, and that is universal uncertainty.<br />Or is it?</q>", "Own 25 time machines");
    upgrades[31] = new Upgrade(31, "Kitten helpers", 9000000, "You gain <b>more CpS</b> the more milk you have.<q>meow may I help you</q>", "13 Achievements (52% Milk)");
    upgrades[32] = new Upgrade(32, "Kitten workers", 9000000000, "You gain <b>more CpS</b> the more milk you have.<q>meow meow meow meow</q>", "25 Achievements (100% Milk)");
    upgrades[33] = new Upgrade(33, "Plain cookies", 999999, "Cookie production multiplier <b>+1%</b>.<q>We all gotta start somewhere.</q>", "50,000 cookies baked");
    upgrades[34] = new Upgrade(34, "Sugar cookies", 5000000, "Cookie production multiplier <b>+1%</b>.<q>Tasty, if a little unimaginative.</q>", "250,000 cookies baked");
    upgrades[35] = new Upgrade(35, "Oatmeal raisin cookies", 10000000, "Cookie production multiplier <b>+1%</b>.<q>No raisin to hate these.</q>", "500,000 cookies baked");
    upgrades[36] = new Upgrade(36, "Peanut butter cookies", 50000000, "Cookie production multiplier <b>+2%</b>.<q>Get yourself some jam cookies!</q>", "2.5 million cookies baked");
    upgrades[37] = new Upgrade(37, "Coconut cookies", 100000000, "Cookie production multiplier <b>+2%</b>.<q>Flaky, but not unreliable. Some people go crazy for these.</q>", "5 million cookies baked");
    upgrades[38] = new Upgrade(38, "White chocolate cookies", 500000000, "Cookie production multiplier <b>+2%</b>.<q>I know what you'll say. It's just cocoa butter! It's not real chocolate!<br />Oh please.</q>", "25 million cookies baked");
    upgrades[39] = new Upgrade(39, "Macadamia nut cookies", 100000000, "Cookie production multiplier <b>+2%</b>.<q>They're macadamn delicious!</q>", "5 million cookies cookies baked");
    upgrades[40] = new Upgrade(40, "Double-chip cookies", 5000000000, "Cookie production multiplier <b>+2%</b>.<q>DOUBLE THE CHIPS<br />DOUBLE THE TASTY<br />(double the calories)</q>", "250 million cookies baked");
    upgrades[41] = new Upgrade(41, "White chocolate macadamia nut cookies", 10000000000, "Cookie production multiplier <b>+2%</b>.<q>Orteil's favorite.</q>", "500 million cookies baked");
    upgrades[42] = new Upgrade(42, "All-chocolate cookies", 50000000000, "Cookie production multiplier <b>+2%</b>.<q>CHOCOVERDOSE.</q>", "2.5 billion cookies baked");
    upgrades[43] = new Upgrade(43, "Quadrillion fingers", 10000000000, "Multiplies the gain from Thousand fingers by <b>20</b>.<q>clickityclickityclickityclickityclick</q>", "Own 200 cursors");
    upgrades[44] = new Upgrade(44, "Prune juice", 5000000, "Grandmas are <b>twice</b> as efficient.<q>Gets me going.</q>", "Own 50 grandmas");
    upgrades[45] = new Upgrade(45, "Genetically-modified cookies", 55000000, "Farms are <b>twice</b> as efficient.<q>All-natural mutations.</q>", "Own 50 farms");
    upgrades[46] = new Upgrade(46, "Radium reactors", 6500000000, "Factories are <b>twice</b> as efficient.<q>Gives your cookies a healthy glow.</q>", "Own 50 factories");
    upgrades[47] = new Upgrade(47, "Ultimadrill", 600000000, "Mines are <b>twice</b> as efficient.<q>Pierce the heavens, etc.</q>", "Own 50 mines");
    upgrades[48] = new Upgrade(48, "Warp drive", 255000000000000, "Shipments are <b>twice</b> as efficient.<q>To boldly bake.</q>", "Own 50 shipments");
    upgrades[49] = new Upgrade(49, "Ambrosia", 3750000000000000, "Alchemy labs are <b>twice</b> as efficient.<q>Adding this to the cookie mix is sure to make them even more addictive!<br />Perhaps dangerously so.<br />Let's hope you can keep selling these legally.</q>", "Own 50 alchemy labs");
    // upgrades[50] = new Upgrade(50, "Sanity dance", 50_000_000_000_000_000, "Portals are <b>twice</b> as efficient.<q>We can change if we want to.<br />We can leave our brains behind.</q>", "Own 50 portals");
    // upgrades[51] = new Upgrade(51, "Causality enforcer", 700_000_000_000_000_000, "Time machines are <b>twice</b> as efficient.<q>What happened, happened.</q>", "Own 50 time machines");
    upgrades[52] = new Upgrade(52, "Lucky day", 777777777, "Golden cookies appear <b>twice as often</b> and last <b>twice as long</b> on screen.<q>Oh hey, a four-leaf penny!</q>", "7 Golden Cookies clicked");
    upgrades[53] = new Upgrade(53, "Serendipity", 77777777777, "Golden cookies appear <b>twice as often</b> and last <b>twice as long</b> on screen.<q>What joy! Seven horseshoes!</q>", "27 Golden Cookies clicked");
    upgrades[54] = new Upgrade(54, "Kitten engineers", 90000000000000, "You gain <b>more CpS</b> the more milk you have.<q>meow meow meow meow, sir</q>", "50 Achievements (200% Milk)");
    upgrades[55] = new Upgrade(55, "Dark chocolate-coated cookies", 100000000000, "Cookie production multiplier <b>+5%</b>.<q>These absorb light so well you almost need to squint to see them.</q>", "5 billion cookies baked");
    upgrades[56] = new Upgrade(56, "White chocolate-coated cookies", 100000000000, "Cookie production multiplier <b>+5%</b>.<q>These dazzling cookies absolutely glisten with flavor.</q>", "5 billion cookies baked");
    upgrades[57] = new Upgrade(57, "Farmer grandmas", 55000, "Grandmas are <b>twice</b> as efficient. Farms gain <b>+1%</b> CpS per 1 grandma.<q>A nice farmer to grow more cookies.</q>", "15 farms and 1 grandma owned");
    upgrades[58] = new Upgrade(58, "Miner grandmas", 600000, "Grandmas are <b>twice</b> as efficient. Mines gain <b>+1%</b> CpS per 2 grandmas.<q>A nice miner to dig more cookies.</q>", "15 mines and 1 grandma owned");
    upgrades[59] = new Upgrade(59, "Worker grandmas", 6500000, "Grandmas are <b>twice</b> as efficient. Factories gain <b>+1%</b> CpS per 3 grandmas.<q>A nice worker to manufacture more cookies.</q>", "15 factories and 1 grandma owned");
    upgrades[60] = new Upgrade(60, "Cosmic grandmas", 255000000000, "Grandmas are <b>twice</b> as efficient. Shipments gain <b>+1%</b> CpS per 7 grandmas.<q>A nice thing to... uh... cookies.</q>", "15 shipments and 1 grandma owned");
    upgrades[61] = new Upgrade(61, "Transmuted grandmas", 3750000000000, "Grandmas are <b>twice</b> as efficient. Alchemy labs gain <b>+1%</b> CpS per 8 grandmas.<q>A nice golden grandma to convert into more cookies.</q>", "15 alchemy labs and 1 grandma owned");
    upgrades[62] = new Upgrade(62, "Altered grandmas", 50000000000000, "Grandmas are <b>twice</b> as efficient. Portals gain <b>+1%</b> CpS per 9 grandmas.<q>a NiCe GrAnDmA tO bA##########</q>", "15 portals and 1 grandma owned");
    upgrades[63] = new Upgrade(63, "Grandmas' grandmas", 700000000000000, "Grandmas are <b>twice</b> as efficient. Time machines gain <b>+1%</b> CpS per 10 grandmas.<q>A nice grandma's nice grandma to bake double the cookies.</q>", "15 time machines and 1 grandma owned");
    upgrades[64] = new Upgrade(64, "Bingo center/Research facility", 1000000000000000, "Grandma-operated science lab and leisure club.<br />Grandmas are <b>4 times</b> as efficient.<br /><b>Regularly unlocks new upgrades.</b><q>What could possibly keep those grandmothers in check?...<br />Bingo.</q>", "\"Elder\" achievement earned<br />At least 6 grandmas owned");
    upgrades[65] = new Upgrade(65, "Specialized chocolate chips", 1000000000000000, "Cookie production multiplier <b>+1%</b>.<q>Computer-designed chocolate chips. Computer chips, if you will.</q>", "1st research project completed");
    upgrades[66] = new Upgrade(66, "Designer cocoa beans", 2000000000000000, "Cookie production multiplier <b>+2%</b>.<q>Now more aerodynamic than ever!</q>", "2nd research project completed");
    upgrades[67] = new Upgrade(67, "Ritual rolling pins", 4000000000000000, "Grandmas are <b>twice</b> as efficient.<q>The result of years of scientific research!</q>", "3rd research project completed");
    upgrades[68] = new Upgrade(68, "Underworld ovens", 8000000000000000, "Cookie production multiplier <b>+3%</b>.<q>Powered by science, of course!</q>", "4th research project completed");
    // upgrades[69] = new Upgrade(69, "One mind", 16_000_000_000_000_000, "Each grandma gains <b>+0.02 base Cps per grandma</b>.<q>We are one. We are many.</q>", "5th research project completed");
    // upgrades[70] = new Upgrade(70, "Exotic nuts", 32_000_000_000_000_000, "Cookie production multiplier <b>+4%</b>.<q>You'll go crazy over these!</q>", "6th research project completed");
    // upgrades[71] = new Upgrade(71, "Communal brainsweep", 64_000_000_000_000_000, "Each grandma gains another <b>+0.02 base Cos oer grandma</b>.<q>We fuse. We merge. We grow.</q>", "8th research project completed");
    // upgrades[72] = new Upgrade(72, "Arcane sugar", 128_000_000_000_000_000, "Cookie production multiplier <b>+5%</b>.<q>Tastes like insects, ligaments, and molasses,</q>", "8th research project completed");
    // upgrades[73] = new Upgrade(73, "Elder Pact", 256_000_000_000_000_000, "Each grandma gains <b>+0.05 base CpS per portal</b>.<q>squirm crawl slither writhe today we rise</q>", "9th research project completed");
    upgrades[74] = new Upgrade(74, "Elder Pledge", 64 * Math.pow(8, pledges), "Contains the wrath of the elders, at least for a while.<q>This is simple ritual involving anti-aging cream, cookie batter mixed in the moonlight, and a live chicken.</q>", "\"Elder Pact\" purchased");
    upgrades[75] = new Upgrade(75, "Plastic mouse", 50000, "Clicking gains <b>+1% of your CpS</b>.<q>Slightly squeaky.</q>", "1,000 hand-made cookies");
    upgrades[76] = new Upgrade(76, "Iron mouse", 5000000, "Clicking gains <b>+1% of your CpS</b>.<q>Click like it's 1,349!</q>", "100,000 hand-made cookies");
    upgrades[77] = new Upgrade(77, "Titanium mouse", 500000000, "Clicking gains <b>+1% of your CpS</b>.<q>Heavy, but powerful.</q>", "10 million hand-made cookies");
    upgrades[78] = new Upgrade(78, "Adamantium mouse", 50000000000, "Clicking gains <b>+1% of your CpS</b>.<q>You could cut diamond with these.</q>", "1 billion hand-made cookies");
    upgrades[79] = new Upgrade(79, "Ultrascience", 7, "Research takes only <b>5 seconds</b>.<q>YEAH, SCIENCE!</q>", "Debug mode", true);
    upgrades[80] = new Upgrade(80, "Eclipse cookies", 500000000000, "Cookie production multiplier <b>+2%</b>.<q>Look to the cookie.</q>", "25 billion cookies baked");
    upgrades[81] = new Upgrade(81, "Zebra cookies", 1000000000000, "Cookie production multiplier <b>+2%</b>.<q>...</q>", "50 billion cookies baked");
    upgrades[82] = new Upgrade(82, "Quintillion fingers", 10000000000000, "Multiplies the gain from Thousand fingers by <b>20</b>.<q>man, just go click click click click click, it's real easy, man.</q>", "Own 250 cursors");
    upgrades[83] = new Upgrade(83, "Gold hoard", 7, "Golden cookies appear <b>really often</b>.<q>That's entirely too many.</q>", "Debug mode", true);
    upgrades[84] = new Upgrade(84, "Elder Covenant", 66666666666666, "Puts a permanent end to the elders' wrath, at the price of 5% of your CpS.<q>This is a complicated ritual involving silly, inconsequential trivialities such as cursed laxatives, century-old cacao, and an infant.<br />Don't question it.</q>", "\"Elder Pledge\" purchased at least once");
    upgrades[85] = new Upgrade(85, "Revoke Elder Covenant", 6666666666, "You will get 5% of your CpS back, but the grandmatriarchs will return.<q>we<br />rise<br />again</q>", "\"Elder Pledge\" purchased at least once");
    upgrades[86] = new Upgrade(86, "Get lucky", 77777777777777, "Golden cookie effects last <b>twice as long</b>.<q>You've been up all night, haven't you?</q>", "77 Golden Cookies clicked");
    upgrades[87] = new Upgrade(87, "Sacrificial rolling pins", 2888888888888, "Elder pledges last <b>twice</b> as long.<q>These are mostly just for spreading the anti-aging cream.<br />(And accessorily, shortening the chicken's suffering.)</q>", "\"Elder Pledge\" purchased 10 times");
    upgrades[88] = new Upgrade(88, "Snickerdoodles", 5000000000000, "Cookie production multiplier <b>+2%</b>.<q>True to their name.</q>", "250 billion cookies baked");
    upgrades[89] = new Upgrade(89, "Stroopwafels", 10000000000000, "Cookie production multiplier <b>+2%</b>.<q>If it ain't dutch, it ain't much.</q>", "500 billion cookies baked");
    upgrades[90] = new Upgrade(90, "Macaroons", 50000000000000, "Cookie production multiplier <b>+2%</b>.<q>Not to be confused with macarons.<br />These have coconut, okay?</q>", "2.5 trillion cookies baked");
    upgrades[91] = new Upgrade(91, "Neuromancy", 7, "Can toggle upgrades on and off at will in the stats menu.<q>Can also come in handy to unsee things that can't be unseen.</q>", "Debug mode", true);
    upgrades[92] = new Upgrade(92, "Empire biscuits", 100000000000000, "Cookie production multiplier <b>+2%</b>.<q>For your growing cookie empire, of course!</q>", "5 trillion cookies baked");
    upgrades[93] = new Upgrade(93, "British tea biscuits", 100000000000000, "Cookie production multiplier <b>+2%</b>.<q>Quite.</q>", "5 trillion cookies baked and \"Tin of british tea biscuits\" purchased");
    upgrades[94] = new Upgrade(94, "Chocolate british tea biscuits", 100000000000000, "Cookie production multiplier <b>+2%</b>.<q>Yes, quite.</q>", "5 trillion cookies baked and \"British tea biscuits\" purchased");
    upgrades[95] = new Upgrade(95, "Round british tea biscuits", 100000000000000, "Cookie production multiplier <b>+2%</b>.<q>Yes, quite riveting.</q>", "5 trillion cookies baked and \"Chocolate british tea biscuits\" purchased");
    upgrades[96] = new Upgrade(96, "Round chocolate british tea biscuits", 100000000000000, "Cookie production multiplier <b>+2%</b>.<q>Yes, quite riveting indeed.</q>", "5 trillion cookies baked and \"Round british tea biscuits\" purchased");
    upgrades[97] = new Upgrade(97, "Round british tea biscuits with heart motif", 100000000000000, "Cookie production multiplier <b>+2%</b>.<q>Yes, quite riveting, old chap.</q>", "5 trillion cookies baked and \"Round chocolate british tea biscuits\" purchased");
    upgrades[98] = new Upgrade(98, "Round chocolate british tea biscuits with heart motif", 100000000000000, "Cookie production multiplier <b>+2%</b>.<q>I like cookies.</q>", "5 trillion cookies baked and \"Round british tea biscuits with heart motif\" purchased");
    upgrades[99] = new Upgrade(99, "Sugar bosons", 1700000000000000, "Antimatter condensers are <b>twice</b> as efficient.<q>Sweet firm bosons.</q>", "Own 1 antimatter condenser");
    upgrades[100] = new Upgrade(100, "String theory", 8500000000000000, "Antimatter condensers are <b>twice</b> as efficient.<q>Reveals new insight about the true meaning of baking cookies<br />(and, as a bonus, the structure of the universe).</q>", "Own 5 antimatter condensers");
    // upgrades[101] = new Upgrade(101, "Large macaron collider", 85_000_000_000_000_000, "Antimatter condensers are <b>twice</b> as efficient.<q>How singular!</q>", "Own 25 antimatter condensers");
    // upgrades[102] = new Upgrade(102, "Big bang bake", 8_500_000_000_000_000_000, "Antimatter condensers are <b>twice</b> as efficient.<q>And that's how it all began.</q>", "Own 50 antimatter condensers");
    upgrades[103] = new Upgrade(103, "Antigrandmas", 8500000000000000, "Grandmas are <b>twice</b> as efficient.<br />Antimatter condensers gain <b>+1% CpS</b> per 11 grandmas.<q>A mean antigrandma to vomit more cookies.<br />(Do not put in contact with normal grandmas; loss of matter may occur.)</q>", "15 antimatter condensers and 1 grandma owned");
    upgrades[104] = new Upgrade(104, "Madeleines", 500000000000000, "Cookie production multiplier <b>+2%</b>.<q>Unforgettable!</q>", "25 trillion cookies baked");
    upgrades[105] = new Upgrade(105, "Palmiers", 500000000000000, "Cookie production multiplier <b>+2%</b>.<q>Palmier than you!</q>", "25 trillion cookies baked");
    upgrades[106] = new Upgrade(106, "Palets", 1000000000000000, "Cookie production multiplier <b>+2%</b>.<q>You could probably play hockey with these.<br />I mean, you're welcome to try.</q>", "50 trillion cookies baked");
    upgrades[107] = new Upgrade(107, "Sablés", 1000000000000000, "Cookie production multiplier <b>+2%</b>.<q>The name implies they're made of sand. But you know better, don't you?</q>", "50 trillion cookies baked");
    return upgrades;
}
function getAchievements() {
    const achievements = [];
    return achievements;
}
function giveMeCookies(amount) {
    addCookies(amount);
}
