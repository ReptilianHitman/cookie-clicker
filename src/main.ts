class Building {
    private readonly name: string;
    private readonly basePrice: number;
    private production: number;
    private amount: number;
    private readonly upgradeMultiplier: number;

    constructor(name: string, basePrice: number, production: number) {
        this.name = name;
        this.basePrice = basePrice;
        this.production = production;
        this.amount = 0;
        this.upgradeMultiplier = 1.15;
    }

    get getName(): string {
        return this.name;
    }

    get getPrice(): number {
        return this.basePrice * this.upgradeMultiplier ** this.amount;
    }

    get getOutput() {
        return (this.production * this.amount);
    }

    get getAmount() {
        return this.amount;
    }

    multiplyProduction(multiplierMultiplier: number): void {
        this.production *= multiplierMultiplier;
    }

    get toString() {
        return `${this.name}: ${formatNumber(Math.ceil(this.getPrice))}`;
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
    private readonly quote: string;
    private readonly condition: string;
    private applied: boolean;

    constructor(id: number, name: string, basePrice: number, description: string, quote: string, condition: string) {
        this.id = id;
        this.name = name;
        this.basePrice = basePrice;
        this.description = description;
        this.quote = quote;
        this.condition = condition;
        this.applied = false;
    }

    applyEffect(): void {
        switch (this.id) {
            case 2:
                addCookies(-9_400);
                // Fall through
            case 1:
                addCookies(-400);
                // Fall through
            case 0:
                addCookies(-100);
                buildingMap.get("cursor")!.multiplyProduction(2);
                clickMultiplier *= 2;
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

    get getQuote(): string {
        return this.quote;
    }

    get getCondition(): string {
        return this.condition;
    }

    get isApplied(): boolean {
        return this.applied;
    }

    get isAvailable(): boolean {
        if (this.applied)
            return false;

        switch (this.id) {
            case 0:
            case 1:
                if (buildingMap.get("cursor")!.getAmount > 0)
                    return true;
        }

        return false;
    }
}

let cookies: number = 0
let clickMultiplier: number = 1;
let cps: number = 0;
let cpsMultiplier: number = 1;

const framerate = 10;
const normalUpgradeAmount = 716;
const debugUpgrades = 13;

const clickButton = document.getElementById("clickButton") as HTMLButtonElement;
const cookieCount = document.getElementById("cookieCount") as HTMLLabelElement;
const info = document.getElementById("info") as HTMLParagraphElement;

const infoMap: Map<string, string> = getEmptyInfo();
const buttonMap: Map<string, HTMLButtonElement> = getButtons();
const buildingMap: Map<string, Building> = getBuildings();

const normalUpgrades: Upgrade[] = getNormalUpgrades();
const availableUpgrades: Upgrade[] = [];

setInterval(tick, 1000 / framerate);

document.addEventListener("DOMContentLoaded", () => {
    clickButton.addEventListener("click", () => {
        addCookies(clickMultiplier);
        buttonMap.get("cursor")!.style.visibility = "visible";
    });

    buttonMap.get("cursor")!.addEventListener("click", () => {
        buyBuilding(buildingMap.get("cursor")!);
        infoMap.set("cursor", `cursors: ${buildingMap.get("cursor")!.getAmount}<br />`);
        buttonMap.get("grandma")!.style.visibility = "visible";
        updateCps();
        updateButtons();
    });
    buttonMap.get("grandma")!.addEventListener("click", () => {
        buyBuilding(buildingMap.get("grandma")!);
        infoMap.set("grandma", `grandmas: ${buildingMap.get("grandma")!.getAmount}<br />`);
        buttonMap.get("farm")!.style.visibility = "visible";
        updateCps();
        updateButtons();
    });
    buttonMap.get("farm")!.addEventListener("click", () => {
        buyBuilding(buildingMap.get("farm")!);
        infoMap.set("farm", `farms: ${buildingMap.get("farm")!.getAmount}<br />`);
        buttonMap.get("mine")!.style.visibility = "visible";
        updateCps();
        updateButtons();
    });
    buttonMap.get("mine")!.addEventListener("click", () => {
        buyBuilding(buildingMap.get("mine")!);
        infoMap.set("mine", `mines: ${buildingMap.get("mine")!.getAmount}<br />`);
        //buttonMap.get("factory")!.style.visibility = "visible";
        updateCps();
        updateButtons();
    });

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
                let infoPanelText: string = "";
                infoPanelText += `${availableUpgrades[i].getName}<br />`;
                infoPanelText += `Cost: ${formatNumber(availableUpgrades[i].getBasePrice)}<br />`;

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
    infoText += infoMap.get("cursor");
    infoText += infoMap.get("grandma");
    infoText += infoMap.get("farm");
    infoText += infoMap.get("mine");

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

    for (let u of normalUpgrades) {
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

    buttons.set("cursor", document.getElementById("cursorButton") as HTMLButtonElement);
    buttons.set("grandma", document.getElementById("grandmaButton") as HTMLButtonElement);
    buttons.set("farm", document.getElementById("farmButton") as HTMLButtonElement);
    buttons.set("mine", document.getElementById("mineButton") as HTMLButtonElement);

    return buttons;
}

function getEmptyInfo(): Map<string, string> {
    let emptyInfo: Map<string, string> = new Map<string, string>();

    emptyInfo.set("cps", "\n");
    emptyInfo.set("cursor", "\n");
    emptyInfo.set("grandma", "\n");
    emptyInfo.set("farm", "\n");
    emptyInfo.set("mine", "\n");

    return emptyInfo;
}

function getNormalUpgrades(): Upgrade[] {
    const upgrades: Upgrade[] = Array(normalUpgradeAmount);

    upgrades[0] = new Upgrade(0, "Reinforced index finger", 100, "The mouse and cursors are twice as efficient", "prod prod", "Own 1 cursor");
    upgrades[1] = new Upgrade(1, "Carpal tunnel prevention cream", 500, "The mouse and cursors are twice as efficient.", "it... it hurts to click...", "Own 1 cursor");

    return upgrades;
}

function giveMeCookies(amount: number): void {
    addCookies(amount);
}
