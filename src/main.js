class Building {
    constructor(name, basePrice, production) {
        this.name = name;
        this.basePrice = basePrice;
        this.production = production;
        this.amount = 0;
        this.upgradeMultiplier = 1.15;
    }
    get getName() {
        return this.name;
    }
    get getPrice() {
        return this.basePrice * Math.pow(this.upgradeMultiplier, this.amount);
    }
    get getOutput() {
        return (this.production * this.amount);
    }
    get getAmount() {
        return this.amount;
    }
    multiplyProduction(multiplierMultiplier) {
        this.production *= multiplierMultiplier;
    }
    get toString() {
        return `${this.name}: ${formatNumber(Math.ceil(this.getPrice))}`;
    }
    addAmount(amount) {
        this.amount += amount;
    }
}
class Upgrade {
    constructor(id, name, basePrice, description, quote, condition) {
        this.id = id;
        this.name = name;
        this.basePrice = basePrice;
        this.description = description;
        this.quote = quote;
        this.condition = condition;
        this.applied = false;
    }
    applyEffect() {
        switch (this.id) {
            case 2:
                addCookies(-9400);
            // Fall through
            case 1:
                addCookies(-400);
            // Fall through
            case 0:
                addCookies(-100);
                buildingMap.get("cursor").multiplyProduction(2);
                clickMultiplier *= 2;
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
    get getBasePrice() {
        return this.basePrice;
    }
    get getDescription() {
        return this.description;
    }
    get getQuote() {
        return this.quote;
    }
    get getCondition() {
        return this.condition;
    }
    get isApplied() {
        return this.applied;
    }
    get isAvailable() {
        if (this.applied)
            return false;
        switch (this.id) {
            case 0:
            case 1:
                if (buildingMap.get("cursor").getAmount > 0)
                    return true;
        }
        return false;
    }
}
let cookies = 0;
let clickMultiplier = 1;
let cps = 0;
let cpsMultiplier = 1;
const framerate = 10;
const normalUpgradeAmount = 716;
const debugUpgrades = 13;
const clickButton = document.getElementById("clickButton");
const cookieCount = document.getElementById("cookieCount");
const info = document.getElementById("info");
const infoMap = getEmptyInfo();
const buttonMap = getButtons();
const buildingMap = getBuildings();
const normalUpgrades = getNormalUpgrades();
const availableUpgrades = [];
setInterval(tick, 1000 / framerate);
document.addEventListener("DOMContentLoaded", () => {
    clickButton.addEventListener("click", () => {
        addCookies(clickMultiplier);
        buttonMap.get("cursor").style.visibility = "visible";
    });
    buttonMap.get("cursor").addEventListener("click", () => {
        buyBuilding(buildingMap.get("cursor"));
        infoMap.set("cursor", `cursors: ${buildingMap.get("cursor").getAmount}<br />`);
        buttonMap.get("grandma").style.visibility = "visible";
        updateCps();
        updateButtons();
    });
    buttonMap.get("grandma").addEventListener("click", () => {
        buyBuilding(buildingMap.get("grandma"));
        infoMap.set("grandma", `grandmas: ${buildingMap.get("grandma").getAmount}<br />`);
        buttonMap.get("farm").style.visibility = "visible";
        updateCps();
        updateButtons();
    });
    buttonMap.get("farm").addEventListener("click", () => {
        buyBuilding(buildingMap.get("farm"));
        infoMap.set("farm", `farms: ${buildingMap.get("farm").getAmount}<br />`);
        buttonMap.get("mine").style.visibility = "visible";
        updateCps();
        updateButtons();
    });
    buttonMap.get("mine").addEventListener("click", () => {
        buyBuilding(buildingMap.get("mine"));
        infoMap.set("mine", `mines: ${buildingMap.get("mine").getAmount}<br />`);
        //buttonMap.get("factory")!.style.visibility = "visible";
        updateCps();
        updateButtons();
    });
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
                let infoPanelText = "";
                infoPanelText += availableUpgrades[i].getName + "<br />";
                infoPanelText += formatNumber(availableUpgrades[i].getBasePrice) + "<br />";
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
            for (let u of normalUpgrades) {
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
function addCookies(addCookies) {
    cookies += addCookies;
    updateCookies();
    updateButtons();
    updateAvailableUpgrades();
}
function updateCps() {
    let newCps = 0;
    buildingMap.forEach(building => {
        newCps += building.getOutput;
        newCps *= cpsMultiplier;
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
    infoText += infoMap.get("cursor");
    infoText += infoMap.get("grandma");
    infoText += infoMap.get("farm");
    infoText += infoMap.get("mine");
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
    for (let u of normalUpgrades) {
        if (!u)
            continue;
        if (u.isAvailable)
            availableUpgrades.push(u);
    }
    availableUpgrades.sort((a, b) => {
        const priceDiff = a.getBasePrice - b.getBasePrice;
        return priceDiff !== 0 ? priceDiff : a.getName.localeCompare(b.getName);
    });
    for (let i = 0; i < 4; i++) {
        const upgradeButton = document.getElementById("upgradeButton" + i);
        if (availableUpgrades[i]) {
            upgradeButton.style.backgroundImage = `url("resources/upgrades/${availableUpgrades[i].getId}.png")`;
            upgradeButton.style.backgroundSize = "cover";
            upgradeButton.disabled = availableUpgrades[i].getBasePrice > Math.floor(cookies);
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
    buttons.set("cursor", document.getElementById("cursorButton"));
    buttons.set("grandma", document.getElementById("grandmaButton"));
    buttons.set("farm", document.getElementById("farmButton"));
    buttons.set("mine", document.getElementById("mineButton"));
    return buttons;
}
function getEmptyInfo() {
    let emptyInfo = new Map();
    emptyInfo.set("cps", "\n");
    emptyInfo.set("cursor", "\n");
    emptyInfo.set("grandma", "\n");
    emptyInfo.set("farm", "\n");
    emptyInfo.set("mine", "\n");
    return emptyInfo;
}
function getNormalUpgrades() {
    const upgrades = Array(normalUpgradeAmount);
    upgrades[0] = new Upgrade(0, "Reinforced index finger", 100, "The mouse and cursors are twice as efficient", "prod prod", "Own 1 cursor");
    upgrades[1] = new Upgrade(1, "Carpal tunnel prevention cream", 500, "The mouse and cursors are twice as efficient.", "it... it hurts to click...", "Own 1 cursor");
    return upgrades;
}
function giveMeCookies(amount) {
    addCookies(amount);
}
