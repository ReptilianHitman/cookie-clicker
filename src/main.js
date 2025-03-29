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
            return `${this.name}: ${Math.round(this.baseProduction / this.getPrice * 100000) / 100}<br />🍪 ${formatNumber(Math.ceil(this.getPrice))}`;
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
            case 2:
                addCookies(-9500);
            // Fall through
            case 1:
                addCookies(-400);
            // Fall through
            case 0:
                addCookies(-100);
                buildingMap.get("cursor").multiplyMultiplier(2);
                clickMultiplier *= 2;
                break;
            case 3:
                addCookies(-100000);
                break;
            case 4:
                addCookies(-10000000);
                break;
            case 5:
                addCookies(-100000000);
                break;
            case 6:
                addCookies(-1000000000);
                break;
            case 9:
                addCookies(-45000);
            // Fall through
            case 8:
                addCookies(-4000);
            // Fall through
            case 7:
                addCookies(-1000);
                buildingMap.get("grandma").multiplyMultiplier(2);
                break;
            case 12:
                addCookies(-484000);
            // Fall through
            case 11:
                addCookies(-44000);
            // Fall through
            case 10:
                addCookies(-11000);
                buildingMap.get("farm").multiplyMultiplier(2);
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
        }
        return false;
    }
}
const buildingNames = ["cursor", "grandma", "farm", "mine", "factory", "bank", "temple", "wizard", "shipment", "alchemy", "portal", "time", "antimatter", "prism"];
let cookies = 0;
let clickMultiplier = 1;
let cps = 0;
let cpsMultiplier = 1;
let cheats = false;
const framerate = 10;
const normalUpgradeAmount = 716;
const debugUpgrades = 13;
const clickButton = document.getElementById("clickButton");
const cookieCount = document.getElementById("cookieCount");
const info = document.getElementById("info");
const infoMap = getEmptyInfo();
const buttonMap = getButtons();
const buildingMap = getBuildings();
const allUpgrades = getUpgrades();
const availableUpgrades = [];
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
                infoPanelText += `<div class="upgradePrice">🍪 ${formatNumber(currentUpgrade.getBasePrice)}</div>`;
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
    const upgrades = Array(normalUpgradeAmount);
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
    return upgrades;
}
function giveMeCookies(amount) {
    addCookies(amount);
}
