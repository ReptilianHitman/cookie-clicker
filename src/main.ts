class Building {
    private readonly name: string;
    private readonly basePrice: number;
    private baseProduction: number;
    private amount: number;
    private readonly upgradeMultiplier: number;
    private baseMultiplier: number;
    private multMult: number;

    constructor(name: string, basePrice: number, baseProduction: number) {
        this.name = name;
        this.basePrice = basePrice;
        this.baseProduction = baseProduction;
        this.amount = 0;
        this.upgradeMultiplier = 1.15;
        this.baseMultiplier = 1;
        this.multMult = 1;
    }

    get getName(): string {
        return this.name;
    }

    get getPrice(): number {
        return this.basePrice * this.upgradeMultiplier ** this.amount;
    }

    get getOutput() {
        let addBeforeMult: number = 0;
        let addAfterMult: number = 0;
        let nonCursorBuildings: number = 0;

        for (let i: number = 1; i < buildingNames.length; i++) {
            nonCursorBuildings += buildingMap.get(buildingNames[i])!.getAmount;
        }

        addAfterMult += (Number(this.getName == "Cursor")) *
            (Number(allUpgrades[3].isApplied) * 0.1 * nonCursorBuildings) *
            (Number(allUpgrades[4].isApplied) * 4 + 1) *
            (Number(allUpgrades[5].isApplied) * 9 + 1) *
            (Number(allUpgrades[6].isApplied) * 19 + 1);

        return ((this.baseProduction + addBeforeMult) * this.baseMultiplier * this.multMult + addAfterMult) * this.amount;
    }

    multiplyMultiplier(multiplier: number) {
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

    addAmount(amount: number) {
        this.amount += amount;
    }
}
class Upgrade {
    private readonly id: number;
    private readonly name: string;
    private readonly basePrice: number;
    private readonly description: string;
    private readonly condition: string;
    private applied: boolean;
    private readonly debug: boolean;

    constructor(id: number, name: string, basePrice: number, description: string, condition: string, debug: boolean = false) {
        this.id = id;
        this.name = name;
        this.basePrice = basePrice;
        this.description = description;
        this.condition = condition;
        this.applied = false;
        this.debug = debug;
    }

    applyEffect(): void {
        switch (this.id) {
            case 2:
                addCookies(-9_500);
            // Fall through
            case 1:
                addCookies(-400);
            // Fall through
            case 0:
                addCookies(-100);
                buildingMap.get("cursor")!.multiplyMultiplier(2);
                clickMultiplier *= 2;
                break;
            case 3:
                addCookies(-100_000);
                break;
            case 4:
                addCookies(-10_000_000);
                break;
            case 5:
                addCookies(-100_000_000);
                break;
            case 6:
                addCookies(-1_000_000_000);
                break;
            case 9:
                addCookies(-45_000);
                // Fall through
            case 8:
                addCookies(-4_000);
                // Fall through
            case 7:
                addCookies(-1_000);
                buildingMap.get("grandma")!.multiplyMultiplier(2);
                break;
            case 12:
                addCookies(-484_000);
                // Fall through
            case 11:
                addCookies(-44_000);
                // Fall through
            case 10:
                addCookies(-11_000);
                buildingMap.get("farm")!.multiplyMultiplier(2);
                break;
        }

        this.applied = true;
    }

    get getId(): number {
        return this.id;
    }

    get getName(): string {
        return this.name;
    }

    get getBasePrice(): number {
        return this.basePrice;
    }

    get getDescription(): string {
        return this.description;
    }

    get getCondition(): string {
        return this.condition;
    }

    get isApplied(): boolean {
        return this.applied;
    }

    get isDebug(): boolean {
        return this.debug;
    }

    get isAvailable(): boolean {
        if (this.applied)
            return false;

        switch (this.id) {
            case 0:
            case 1:
                if (buildingMap.get("cursor")!.getAmount >= 1)
                    return true;
                break;
            case 2:
                if (buildingMap.get("cursor")!.getAmount >= 10)
                    return true;
                break;
            case 3:
                if (buildingMap.get("cursor")!.getAmount >= 25)
                    return true;
                break;
            case 4:
                if (buildingMap.get("cursor")!.getAmount >= 50)
                    return true;
                break;
            case 5:
                if (buildingMap.get("cursor")!.getAmount >= 100)
                    return true;
                break;
            case 6:
                if (buildingMap.get("cursor")!.getAmount >= 150)
                    return true;
                break;
            case 7:
                if (buildingMap.get("grandma")!.getAmount >= 1)
                    return true;
                break;
            case 8:
                if (buildingMap.get("grandma")!.getAmount >= 5)
                    return true;
                break;
            case 9:
                if (buildingMap.get("grandma")!.getAmount >= 25)
                    return true;
                break;
            case 10:
                if (buildingMap.get("farm")!.getAmount >= 1)
                    return true;
                break;
            case 11:
                if (buildingMap.get("farm")!.getAmount >= 5)
                    return true;
                break;
            case 12:
                if (buildingMap.get("farm")!.getAmount >= 25)
                    return true;
                break;
        }

        return false;
    }
}

const buildingNames: string[] = ["cursor", "grandma", "farm", "mine", "factory", "bank", "temple", "wizard", "shipment", "alchemy", "portal", "time", "antimatter", "prism"];

let cookies: number = 0
let clickMultiplier: number = 1;
let cps: number = 0;
let cpsMultiplier: number = 1;
let cheats: boolean = false;

const framerate = 10;
const normalUpgradeAmount = 716;
const debugUpgrades = 13;

const clickButton = document.getElementById("clickButton") as HTMLButtonElement;
const cookieCount = document.getElementById("cookieCount") as HTMLLabelElement;
const info = document.getElementById("info") as HTMLParagraphElement;

const infoMap: Map<string, string> = getEmptyInfo();
const buttonMap: Map<string, HTMLButtonElement> = getButtons();
const buildingMap: Map<string, Building> = getBuildings();

const allUpgrades: Upgrade[] = getUpgrades();
const availableUpgrades: Upgrade[] = [];

setInterval(tick, 1000 / framerate);

document.addEventListener("DOMContentLoaded", () => {
    clickButton.addEventListener("click", () => {
        let clickAdd: number = 0;
        let nonCursorBuildings: number = 0;

        for (let i: number = 1; i < buildingNames.length; i++) {
            nonCursorBuildings += buildingMap.get(buildingNames[i])!.getAmount;
        }

        clickAdd += (Number(allUpgrades[3].isApplied) * 0.1 * nonCursorBuildings) *
            (Number(allUpgrades[4].isApplied) * 4 + 1) *
            (Number(allUpgrades[5].isApplied) * 9 + 1) *
            (Number(allUpgrades[6].isApplied) * 19 + 1);

        addCookies(clickMultiplier + clickAdd);
        buttonMap.get("cursor")!.style.visibility = "visible";
    });

    for (let i: number = 0; i < buildingNames.length; i++) {
        let buildingName: string = buildingNames[i];

        buttonMap.get(buildingName)!.addEventListener("click", () => {
            buyBuilding(buildingMap.get(buildingName)!);
            infoMap.set(buildingName, `${buildingName}: ${buildingMap.get(buildingName)!.getAmount}<br />`);
            if (i + 1 < buildingNames.length) buttonMap.get(buildingNames[i + 1])!.style.visibility = "visible";
            updateCps();
            updateButtons();
        });
    }

    const infoPanel = document.getElementById("infoPanel") as HTMLDivElement;

    const upgradeButtons: HTMLButtonElement[] = Array(4);
    upgradeButtons[0] = document.getElementById("upgradeButton0") as HTMLButtonElement;
    upgradeButtons[1] = document.getElementById("upgradeButton1") as HTMLButtonElement;
    upgradeButtons[2] = document.getElementById("upgradeButton2") as HTMLButtonElement;
    upgradeButtons[3] = document.getElementById("upgradeButton3") as HTMLButtonElement;

    for (let i: number = 0; i < 3; i++) {
        const button: HTMLButtonElement = upgradeButtons[i];

        button.addEventListener("mouseenter", () => {
            if (availableUpgrades[i]) {
                const currentUpgrade: Upgrade = availableUpgrades[i];
                let infoPanelText: string = "";

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

        button.addEventListener("mousemove", (event: MouseEvent) => {
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

function buyBuilding(building: Building, amount: number = 1) {
    cookies -= building.getPrice * amount;
    building.addAmount(amount);
    updateCookies();
    updateAvailableUpgrades();
}

function addCookies(addCookies: number): void {
    cookies += addCookies;
    updateCookies();
    updateButtons();
    updateAvailableUpgrades();
}

function updateCps() {
    let newCps: number = 0;

    buildingMap.forEach(building => {
        newCps += building.getOutput;
        newCps *= cpsMultiplier;
    });

    cps = newCps;
    infoMap.set("cps", `cookies/s: ${formatNumber(Math.round(cps * 10) / 10)}<br />`);
    updateInfo();
}

function updateCookies(): void {
    cookieCount.innerHTML = `${formatNumber(Math.floor(cookies))}`;
}

function updateInfo(): void {
    let infoText: string = "";

    infoText += infoMap.get("cps");

    buildingNames.forEach(buildingName => {
        infoText += infoMap.get(buildingName);
    })

    info.innerHTML = infoText;
}

function updateButtons(): void {
    for (let key of buttonMap.keys()) {
        const button = buttonMap.get(key) as HTMLButtonElement;
        const building = buildingMap.get(key) as Building;
        button.disabled = building.getPrice > Math.floor(cookies);
        button.innerHTML = building.toString;
    }
}

function updateAvailableUpgrades(): void {
    availableUpgrades.length = 0;

    for (let u of allUpgrades) {
        if (!u)
            continue;

        if (u.isAvailable)
            availableUpgrades.push(u);
    }

    availableUpgrades.sort((a: Upgrade, b: Upgrade) => {
        const priceDiff: number = a.getBasePrice - b.getBasePrice;
        return priceDiff !== 0 ? priceDiff : a.getName.localeCompare(b.getName);
    });

    for (let i: number = 0; i < 4; i++) {
        const upgradeButton = document.getElementById("upgradeButton" + i) as HTMLButtonElement;
        if (availableUpgrades[i]) {
            upgradeButton.style.backgroundImage = `url("resources/upgrades/${availableUpgrades[i].getId}.png")`;
            upgradeButton.style.backgroundSize = "cover";
            upgradeButton.disabled = availableUpgrades[i].getBasePrice > Math.floor(cookies);
            upgradeButton.style.visibility = "visible";
        } else {
            upgradeButton.style.visibility = "hidden";
        }
    }
}

function tick(): void {
    addCookies(cps / framerate);
}

function formatNumber(num: number): string {
    if (num < 10000)
        return num.toString();

    let e = 0;

    while (num >= 10000) {
        e++;
        num /= 10;
    }

    return `${Math.round(num / 100) / 10}e${e + 3}`;
}

function getBuildings(): Map<string, Building> {
    const buildings = new Map<string, Building>();

    buildings.set("cursor", new Building("Cursor", 15, 0.1));
    buildings.set("grandma", new Building("Grandma", 100, 1));
    buildings.set("farm", new Building("Farm", 1_100, 8));
    buildings.set("mine", new Building("Mine", 12_000, 47));
    buildings.set("factory", new Building("Factory", 130_000, 260));
    buildings.set("bank", new Building("Bank", 1_400_000, 1_400));
    buildings.set("temple", new Building("Temple", 20_000_000, 7_800));
    buildings.set("wizard", new Building("Wizard Tower", 330_000_000, 44_000));
    buildings.set("shipment", new Building("Shipment", 5_100_000_000, 260_000));
    buildings.set("alchemy", new Building("Alchemy Lab", 75_000_000_000, 1_600_000));
    buildings.set("portal", new Building("Portal", 1_000_000_000_000, 10_000_000));
    buildings.set("time", new Building("Time Machine", 14_000_000_000_000, 65_000_000));
    buildings.set("antimatter", new Building("Antimatter Condenser", 170_000_000_000_000, 430_000_000));
    buildings.set("prism", new Building("Prism", 2_100_000_000_000_000, 2_900_000_000_000));

    return buildings;
}

function getButtons(): Map<string, HTMLButtonElement> {
    const buttons: Map<string, HTMLButtonElement> = new Map<string, HTMLButtonElement>();

    buildingNames.forEach(buildingName => {
        buttons.set(buildingName, document.getElementById(buildingName + "Button") as HTMLButtonElement);
    });

    return buttons;
}

function getEmptyInfo(): Map<string, string> {
    let emptyInfo: Map<string, string> = new Map<string, string>();

    emptyInfo.set("cps", "\n");

    buildingNames.forEach(buildingName => {
        emptyInfo.set(buildingName, "\n");
    });

    return emptyInfo;
}

function getUpgrades(): Upgrade[] {
    const upgrades: Upgrade[] = Array(normalUpgradeAmount);

    upgrades[0] = new Upgrade(0, "Reinforced index finger", 100, "The mouse and cursors are <b>twice</b> as efficient.<q>prod prod</q>", "Own 1 cursor");
    upgrades[1] = new Upgrade(1, "Carpal tunnel prevention cream", 500, "The mouse and cursors are <b>twice</b> as efficient.<q>it... it hurts to click...</q>", "Own 1 cursor");
    upgrades[2] = new Upgrade(2, "Ambidextrous", 10_000, "The mouse and cursors are <b>twice</b> as efficient.<q>Look ma, both hands!</q>", "Own 10 cursors");
    upgrades[3] = new Upgrade(3, "Thousand fingers", 100_000, "The mouse and cursors gain <b>+0.1</b> cookies for each non-cursor object owned.<q>clickity</q>", "Own 25 cursors");
    upgrades[4] = new Upgrade(4, "Million fingers", 10_000_000, "Multiplies the gain from Thousand fingers by <b>5</b>.<q>clickityclickity</q>", "Own 50 cursors");
    upgrades[5] = new Upgrade(5, "Billion fingers", 100_000_000, "Multiplies the gain from Thousand fingers by <b>10</b>.<q>clickityclickityclickity</q>", "Own 100 cursors");
    upgrades[6] = new Upgrade(6, "Trillion fingers", 1_000_000_000, "Multiplies the gain from Thousand fingers by <b>20</b>.<q>clickityclickityclickityclickity</q>", "Own 150 cursors");
    upgrades[7] = new Upgrade(7, "Forwards from grandma", 1_000, "Grandmas are <b>twice</b> as efficient.<q>RE:RE:thought you'd get a kick out of this ;))</q>", "Own 1 grandma");
    upgrades[8] = new Upgrade(8, "Steel-plated rolling pins", 5_000, "Grandmas are <b>twice</b> as efficient.<q>Just what you kneaded.</q>", "Own 5 grandmas");
    upgrades[9] = new Upgrade(9, "Lubricated dentures", 50_000, "Grandmas are <b>twice</b> as efficient.<q>squish</q>", "Own 25 grandmas");
    upgrades[10] = new Upgrade(10, "Cheap hoes", 11_000, "Farms are <b>twice</b> as efficient.<q>Rake in the dough!</q>", "Own 1 farm");
    upgrades[11] = new Upgrade(11, "Fertilizer", 55_000, "Farms are <b>twice</b> as efficient.<q>It's chocolate, I swear.</q>", "Own 5 farms");
    upgrades[12] = new Upgrade(12, "Cookie trees", 550_000, "Farms are <b>twice</b> as efficient.<q>A relative of the breadfruit.</q>", "Own 25 farms");

    return upgrades;
}

function giveMeCookies(amount: number): void {
    addCookies(amount);
}
