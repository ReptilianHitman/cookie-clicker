class Building {
    private readonly name: string;
    private readonly basePrice: number;
    private baseProduction: number;
    private amount: number;
    private readonly upgradeMultiplier: number;
    private multiplierMultiplier: number;

    constructor(name: string, basePrice: number, baseProduction: number) {
        this.name = name;
        this.basePrice = basePrice;
        this.baseProduction = baseProduction;
        this.amount = 0;
        this.upgradeMultiplier = 1.15;
        this.multiplierMultiplier = 1;
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
        let numberOfGrandmas: number = buildingMap.get("grandma")!.getAmount;
        let nonCursorBuildings: number = numberOfGrandmas;
        let baseMultiplier: number = 1;

        for (let i: number = 2; i < buildingNames.length; i++) {
            nonCursorBuildings += buildingMap.get(buildingNames[i])!.getAmount;
        }

        addAfterMult += (Number(this.getName == "Cursor")) *
            (Number(allUpgrades[3].isApplied) * 0.1 * nonCursorBuildings) *
            (Number(allUpgrades[4].isApplied) * 4 + 1) *
            (Number(allUpgrades[5].isApplied) * 9 + 1) *
            (Number(allUpgrades[6].isApplied) * 19 + 1);

        if (this.getName == "Grandma") {
            if (allUpgrades[69].isApplied || allUpgrades[71].isApplied) {
                for (let i: number = 0; i < numberOfGrandmas; i++) {
                    addAfterMult += 0.02 * Number(allUpgrades[69].isApplied);
                    addAfterMult += 0.02 * Number(allUpgrades[71].isApplied);
                }
            }

            if (allUpgrades[73].isApplied) {
                for (let i: number = 0; i < buildingMap.get("portal")!.getAmount; i++) {
                    addAfterMult += 0.05;
                }
            }
        } else if (this.getName == "Farm") {
            if (allUpgrades[57].isApplied) {
                for (let i: number = 0; i < numberOfGrandmas; i++) {
                    baseMultiplier += 0.01;
                }
            }
        } else if (this.getName == "Mine") {
            if (allUpgrades[58].isApplied) {
                for (let i: number = 0; i < numberOfGrandmas; i++) {
                    baseMultiplier += 0.01 / 2;
                }
            }
        } else if (this.getName == "Factory") {
            if (allUpgrades[59].isApplied) {
                for (let i: number = 0; i < numberOfGrandmas; i++) {
                    baseMultiplier += 0.01 / 3;
                }
            }
        } else if (this.getName == "Shipment") {
            if (allUpgrades[60].isApplied) {
                for (let i: number = 0; i < numberOfGrandmas; i++) {
                    baseMultiplier += 0.01 / 7;
                }
            }
        } else if (this.getName == "Alchemy Lab") {
            if (allUpgrades[61].isApplied) {
                for (let i: number = 0; i < numberOfGrandmas; i++) {
                    baseMultiplier += 0.01 / 8;
                }
            }
        } else if (this.getName == "Portal") {
            if (allUpgrades[62].isApplied) {
                for (let i: number = 0; i < numberOfGrandmas; i++) {
                    baseMultiplier += 0.01 / 9;
                }
            }
        } else if (this.getName == "Time Machine") {
            if (allUpgrades[63].isApplied) {
                for (let i: number = 0; i < numberOfGrandmas; i++) {
                    baseMultiplier += 0.01 / 10;
                }
            }
        } else if (this.getName == "Antimatter Condenser") {
            if (allUpgrades[103].isApplied) {
                for (let i: number = 0; i < numberOfGrandmas; i++) {
                    baseMultiplier += 0.01 / 11;
                }
            }
        }

        return ((this.baseProduction + addBeforeMult) * baseMultiplier * this.multiplierMultiplier + addAfterMult) * this.amount;
    }

    multiplyMultiplierMultiplier(multiplierMultiplierMultiplier: number) {
        this.multiplierMultiplier *= multiplierMultiplierMultiplier;
    }

    get getAmount() {
        return this.amount;
    }

    get toString() {
        return debug ? `${this.name}: ${Math.round((this.getAmount > 0 ? this.getOutput / (this.getAmount) : this.baseProduction) / this.getPrice * 100000) / 100}<br />🍪 ${formatNumber(Math.ceil(this.getPrice))}` : `${this.name}<br />🍪 ${formatNumber(Math.ceil(this.getPrice))}`;
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
            case 0:     // Reinforced index finger
            case 1:     // Carpal tunnel prevention cream
            case 2:     // Ambidextrous
                buildingMap.get("cursor")!.multiplyMultiplierMultiplier(2);
                clickMultiplier *= 2;
                break;
            case 7:     // Forwards from grandma
            case 8:     // Steel-plated rolling pins
            case 9:     // Lubricated dentures
            case 44:    // Prune juice
            case 110:   // Double-thick glasses
            case 192:   // Aging agents
            case 294:   // Xtreme walkers
            case 307:   // The Unbridling
            case 428:   // Reverse dementia
            case 480:   // Timeproof hair dyes
            case 506:   // Good manners
            case 662:   // Generation degeneration
            case 700:   // Visits
            case 743:   // Kitchen cabinets
            case 840:   // Foam-tipped canes

            case 57:    // Farmer grandmas
            case 58:    // Miner grandmas
            case 59:    // Worker grandmas
            case 60:    // Cosmic grandmas
            case 61:    // Transmuted grandmas
            case 62:    // Altered grandmas
            case 63:    // Grandmas' grandmas
            case 103:   // Antigrandmas

            case 67:    // Ritual rolling pins
                buildingMap.get("grandma")!.multiplyMultiplierMultiplier(2);
                break;
            case 10:    // Cheap hoes
            case 11:    // Fertilizer
            case 12:    // Cookie trees
            case 45:    // Genetically-modified cookies
            case 111:   // Gingerbread scarecrows
            case 193:   // Pulsar sprinklers
            case 295:   // Fudge fungus
            case 308:   // Wheat triffids
            case 429:   // Humane pesticides
            case 481:   // Barnstars
            case 507:   // Lindworms
            case 663:   // Global seed vault
            case 701:   // Reverse-veganism
            case 744:   // Cookie mulch
            case 841:   // Self-driving tractors
                buildingMap.get("farm")!.multiplyMultiplierMultiplier(2);
                break;
            case 16:    // Sugar gas
            case 17:    // Megadrill
            case 18:    // Ultradrill
            case 47:    // Ultimadrill
            case 113:   // H-bomb mining
            case 195:   // Coreforge
            case 296:   // Planetsplitters
            case 309:   // Canola oil wells
            case 430:   // Mole people
            case 482:   // Mine canaries
            case 508:   // Bore again
            case 664:   // Air mining
            case 702:   // Caramel alloys
            case 745:   // Delicious mineralogy
            case 842:   // Mineshaft supports
                buildingMap.get("mine")!.multiplyMultiplierMultiplier(2);
                break;
            case 13:    // Sturdier conveyor belts
            case 14:    // Child labor
            case 15:    // Sweatshop
            case 46:    // Radium reactors
            case 112:   // Recombobulators
            case 194:   // Deep-bake process
            case 297:   // Cyborg workforce
            case 310:   // 78-hour days
            case 431:   // Machine learning
            case 483:   // Brownie point system
            case 509:   // "Volunteer" interns
            case 665:   // Behavioral reframing
            case 703:   // The infinity engine
            case 746:   // N-dimensional assembly lines
            case 843:   // Universal automation
                buildingMap.get("factory")!.multiplyMultiplierMultiplier(2);
                break;
            case 232:   // Taller tellers
            case 233:   // Scissor-resistant credit cards
            case 234:   // Acid-proof vaults
            case 235:   // Chocolate coins
            case 236:   // Exponential interest rates
            case 237:   // Financial zen
            case 298:   // Way of the wallet
            case 311:   // The stuff rationale
            case 432:   // Edible money
            case 484:   // Grand supercycle
            case 510:   // Rules of acquisition
            case 666:   // Altruistic loop
            case 704:   // Diminishing tax returns
            case 747:   // Cookie Points
            case 844:   // The big shortcake
                buildingMap.get("bank")!.multiplyMultiplierMultiplier(2);
                break;
            case 238:   // Golden idols
            case 239:   // Sacrifices
            case 240:   // Delicious blessing
            case 241:   // Sun festival
            case 242:   // Enlarged pantheon
            case 243:   // Great Baker in the sky
            case 299:   // Creation myth
            case 312:   // Theocracy
            case 433:   // Sick rap prayers
            case 485:   // Psalm-reading
            case 511:   // War of the gods
            case 667:   // A novel idea
            case 705:   // Apparitions
            case 748:   // Negatheism
            case 845:   // Temple traps
                buildingMap.get("temple")!.multiplyMultiplierMultiplier(2);
                break;
            case 244:   // Pointier hats
            case 245:   // Beardlier beards
            case 246:   // Ancient grimoires
            case 247:   // Kitchen curses
            case 248:   // School of sorcery
            case 249:   // Dark formulas
            case 300:   // Cookiemancy
            case 313:   // Rabbit trick
            case 434:   // Deluxe tailored wands
            case 486:   // Impossible spellcasting
            case 512:   // Electricity
            case 668:   // Spelling bees
            case 706:   // Wizard basements
            case 749:   // Magical realism
            case 846:   // Polymorphism
                buildingMap.get("wizard")!.multiplyMultiplierMultiplier(2);
                break;
            case 19:    // Vanilla nebulae
            case 20:    // Wormholes
            case 21:    // Frequent flyer
            case 48:    // Warp drive
            case 114:   // Chocolate monoliths
            case 196:   // Generation ships
            case 301:   // Dyson sphere
            case 314:   // The final frontier
            case 435:   // Autopilot
            case 487:   // Restaurants at the end of the universe
            case 513:   // Universal alphabet
            case 669:   // Toroid universe
            case 707:   // Prime directive
            case 750:   // Cosmic foreground radiation
            case 847:   // At your doorstep in 30 minutes or your money back
                buildingMap.get("shipment")!.multiplyMultiplierMultiplier(2);
                break;
            case 22:    // Antimony
            case 23:    // Essence of dough
            case 24:    // True chocolate
            case 49:    // Ambrosia
            case 115:   // Aqua custulae
            case 197:   // Origin crucible
            case 302:   // Theory of atomic fluidity
            case 315:   // Beige goo
            case 436:   // The advent of chemistry
            case 488:   // On second thought
            case 514:   // Public betterment
            case 670:   // Hermetic reconciliation
            case 708:   // Chromatic cycling
            case 751:   // Arcanized glassware
            case 848:   // The dose makes the poison
                buildingMap.get("alchemy")!.multiplyMultiplierMultiplier(2);
                break;
            case 25:    // Ancient tablet
            case 26:    // Insane oatling workers
            case 27:    // Soul bond
            case 50:    // Sanity dance
            case 116:   // Brane transplant
            case 198:   // Deity-sized portals
            case 303:   // End of times back-up plan
            case 316:   // Maddening chants
            case 437:   // The real world
            case 489:   // Dimensional garbage gulper
            case 515:   // Embedded microportals
            case 671:   // His advent
            case 709:   // Domestic rifts
            case 752:   // Portal guns
            case 849:   // A way home
                buildingMap.get("portal")!.multiplyMultiplierMultiplier(2);
                break;
            case 28:    // Flux capacitors
            case 29:    // Time paradox resolver
            case 30:    // Quantum conundrum
            case 51:    // Causality enforcer
            case 117:   // Yestermorrow comparators
            case 199:   // Far future enactment
            case 304:   // Great loop hypothesis
            case 317:   // Cookietopian moments of maybe
            case 438:   // Seconds seconds
            case 490:   // Additional clock hands
            case 516:   // Nostalgia
            case 672:   // Split seconds
            case 710:   // Patience abolished
            case 753:   // Timeproof upholstery
            case 850:   // Rectifying a mistake
                buildingMap.get("time")!.multiplyMultiplierMultiplier(2);
                break;
            case 99:    // Sugar bosons
            case 100:   // String theory
            case 101:   // Large macaron collider
            case 102:   // Bing bang bake
            case 118:   // Reverse cyclotrons
            case 200:   // Nanocosmics
            case 305:   // The Pulse
            case 318:   // Some other super-tiny fundamental particle? Probably?
            case 439:   // Quantum comb
            case 491:   // Baking Nobel prize
            case 517:   // The definite molecule
            case 673:   // Flavour itself
            case 711:   // Delicious pull
            case 754:   // Employee minification
            case 851:   // Candied atoms
                buildingMap.get("antimatter")!.multiplyMultiplierMultiplier(2);
                break;
            case 175:   // Gem polish
            case 176:   // 9th color
            case 177:   // Chocolate light
            case 178:   // Grainbow
            case 179:   // Pure cosmic light
            case 201:   // Glow-in-the-dark
            case 306:   // Lux sanctorum
            case 319:   // Reverse shadows
            case 440:   // Crystal mirrors
            case 492:   // Reverse theory of light
            case 518:   // Light capture measures
            case 674:   // Light speed limit
            case 712:   // Occam's laser
            case 755:   // Hyperblack paint
            case 852:   // Lab goggles but like cool shades
                buildingMap.get("prism")!.multiplyMultiplierMultiplier(2);
                break;
            case 416:   // Your lucky cookie
            case 417:   // "All Bets Are Off" magic coin
            case 418:   // Winning lottery ticket
            case 419:   // Four-leaf clover field
            case 420:   // A recipe book about books
            case 421:   // Leprechaun village
            case 422:   // Improbability drive
            case 423:   // Antisuperstistronics
            case 441:   // Bunnypedes
            case 493:   // Revised probabilistics
            case 519:   // 0-sided dice
            case 675:   // A touch of determinism
            case 713:   // On a streak
            case 756:   // Silver lining maximization
            case 853:   // Gambler's fallacy fallacy
                buildingMap.get("chance")!.multiplyMultiplierMultiplier(2);
                break;
            case 522:   // Matebakeries
            case 523:   // Mandelbrown sugar
            case 524:   // Fractoids
            case 525:   // Nested universe theory
            case 526:   // Menger sponge cake
            case 527:   // One particularly good-humored cow
            case 528:   // Chocolate ouroboros
            case 529:   // Nested
            case 530:   // Space-filling fibers
            case 531:   // Endless book of prose
            case 532:   // The set of all sets
            case 676:   // This upgrade
            case 714:   // A box
            case 757:   // Multiscale profiling
            case 854:   // The more they stay the same
                buildingMap.get("fractal")!.multiplyMultiplierMultiplier(2);
                break;
            case 594:   // The JavaScript console for dummies
            case 595:   // 64bit arrays
            case 596:   // Stack overflow
            case 597:   // Enterprise compiler
            case 598:   // Syntactic sugar
            case 599:   // A nice cup of coffee
            case 600:   // Just-in-time baking
            case 601:   // cookies++
            case 602:   // Software updates
            case 603:   // Game.Loop
            case 604:   // eval()
            case 677:   // Your biggest fans
            case 715:   // Hacker shades
            case 758:   // PHP containment vats
            case 855:   // Simulation failsafes
                buildingMap.get("js")!.multiplyMultiplierMultiplier(2);
                break;
            case 684:   // Manifest destiny
            case 685:   // The multiverse in a nutshell
            case 686:   // All-conversion
            case 687:   // Multiverse agents
            case 688:   // Escape plan
            case 689:   // Game design
            case 690:   // Sandbox universes
            case 691:   // Multiverse wars
            case 692:   // Mobile ports
            case 693:   // Encapsulated realities
            case 694:   // Extrinsic clicking
            case 695:   // Universal idling
            case 716:   // Break the fifth wall
            case 759:   // Opposite universe
            case 856:   // The other routes to Rome
                buildingMap.get("idle")!.multiplyMultiplierMultiplier(2);
                break;
            case 730:   // Principled neural shackles
            case 731:   // Obey
            case 732:   // A sprinkle of irrationality
            case 733:   // Front and back hemispheres
            case 734:   // Neural networking
            case 735:   // Cosmic brainstorms
            case 736:   // Megatherapy
            case 737:   // Synaptic lubricant
            case 738:   // Psychokinesis
            case 739:   // Spines
            case 740:   // Neuraforming
            case 741:   // Epistemological trickery
            case 742:   // Every possible idea
            case 760:   // The land of dreams
            case 857:   // Intellectual property theft
                buildingMap.get("cortex")!.multiplyMultiplierMultiplier(2);
                break;
            case 826:   // Cloning vats
            case 827:   // Energized nutrients
            case 828:   // Stunt doubles
            case 829:   // Clone recycling plant
            case 830:   // Free-range clones
            case 831:   // Genetic tailoring
            case 832:   // Power in diversity
            case 833:   // Self-betterment
            case 834:   // Source control
            case 835:   // United workforce
            case 836:   // Safety patrols
            case 837:   // Clone rights
            case 838:   // One big family
            case 839:   // Fine-tuned body plans
            case 858:   // Reading your clones bedtime stories
                buildingMap.get("you")!.multiplyMultiplierMultiplier(2);
                break;
            case 31:    // Kitten helpers
                kittenUpgrades[0] = 0.1;
                break;
            case 32:    // Kitten workers
                kittenUpgrades[1] = 0.125;
                break;
            case 54:    // Kitten engineers
                kittenUpgrades[2] = 0.15;
                break;
            case 33:    // Pain cookies
            case 34:    // Sugar cookies
            case 35:    // Oatmeal raisin cookies
            case 65:    // Specialized chocolate chips
                cpsMultiplier += 0.01;
                break;
            case 36:    // Peanut butter cookies
            case 37:    // Coconut cookies
            case 38:    // White chocolate cookies
            case 39:    // Macadamia nut cookies
            case 40:    // Double-chip cookies
            case 41:    // White chocolate macadamia nut cookies
            case 42:    // All-chocolate cookies
            case 66:    // Designer cocoa beans
            case 80:    // Eclipse cookies
            case 81:    // Zebra cookies
            case 88:    // Snickerdoodles
            case 89:    // Stroopwafels
            case 90:    // Macaroons
            case 92:    // Empire biscuits
            case 93:    // British tea biscuits
            case 94:    // Chocolate british tea biscuits
            case 95:    // Round british tea biscuits
            case 96:    // Round chocolate british tea biscuits
            case 97:    // Round british tea biscuits with heart motif
            case 98:    // Round chocolate british tea biscuits with heart motif
            case 104:   // Madeleines
            case 105:   // Palmiers
            case 106:   // Palets
            case 107:   // Sablés
                cpsMultiplier += 0.02;
                break;
            case 68:    // Underworld ovens
                cpsMultiplier += 0.03;
                break;
            case 70:    // Exotic nuts
                cpsMultiplier += 0.04;
                break;
            case 72:    // Arcane sugar
                cpsMultiplier += 0.05;
                break;
            case 3:     // Thousand fingers
            case 4:     // Million fingers
            case 5:     // Billion fingers
            case 6:     // Trillion fingers
            case 43:    // Quadrillion fingers
            case 82:    // Quintillion fingers

            case 75:    // Plastic mouse
            case 76:    // Iron mouse
            case 77:    // Titanium mouse
            case 78:    // Adamantium mouse
                break;
            case 52:    // Lucky day
            case 53:    // Serendipity
            case 86:    // Get lucky
                goldenCookieDurationMultiplier *= 2;
                goldenCookieChanceMultiplier *= 2;
                break;
            case 55:    // Dark chocolate-coated cookies
            case 56:    // White chocolate-coated cookies
                cpsMultiplier += 0.05;
                break;
            case 64:    // Bingo center/Research facility
                buildingMap.get("grandma")!.multiplyMultiplierMultiplier(4);
                break;
            case 74:    // Elder Pledge
                addCookies(-(68 * 8 ** pledges));
                // TODO Implement Elder Pledge
                break;
            case 79:    // Ultrascience
                // TODO Make research only last 5 seconds (grandmapocalypse stuff)
                break;
            case 83:    // Gold hoard
                // TODO Make golden cookies appear really often
                break;
            case 84:    // Elder Covenant
                // TODO End the elders' wrath?
                elderCovenant = 0.95;
                break;
            case 85:    // Revoke Elder Covenant
                // TODO Implement the return of the grandmatriarchs????
                elderCovenant = 1;
                break;
            case 87:    // Sacrificial rolling pins
                elderPledgeDurationMinutes = 60;
                break;
            case 91:    // Neuromancy
                // TODO Make all upgrades toggleable at will in the stats menu
                break;
        }

        addCookies(-this.getPrice);
        this.applied = true;
        updateAll();
    }

    get getId(): number {
        return this.id;
    }

    get getName(): string {
        return this.name;
    }

    get getPrice(): number {
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
                if (buildingMap.get("cursor")!.getAmount >= 1) return true;
                break;
            case 2:
                if (buildingMap.get("cursor")!.getAmount >= 10) return true;
                break;
            case 3:
                if (buildingMap.get("cursor")!.getAmount >= 25) return true;
                break;
            case 4:
                if (buildingMap.get("cursor")!.getAmount >= 50) return true;
                break;
            case 5:
                if (buildingMap.get("cursor")!.getAmount >= 100) return true;
                break;
            case 6:
                if (buildingMap.get("cursor")!.getAmount >= 150) return true;
                break;
            case 7:
                if (buildingMap.get("grandma")!.getAmount >= 1) return true;
                break;
            case 8:
                if (buildingMap.get("grandma")!.getAmount >= 5) return true;
                break;
            case 9:
                if (buildingMap.get("grandma")!.getAmount >= 25) return true;
                break;
            case 10:
                if (buildingMap.get("farm")!.getAmount >= 1) return true;
                break;
            case 11:
                if (buildingMap.get("farm")!.getAmount >= 5) return true;
                break;
            case 12:
                if (buildingMap.get("farm")!.getAmount >= 25) return true;
                break;
            case 13:
                if (buildingMap.get("factory")!.getAmount >= 1) return true;
                break;
            case 14:
                if (buildingMap.get("factory")!.getAmount >= 5) return true;
                break;
            case 15:
                if (buildingMap.get("factory")!.getAmount >= 25) return true;
                break;
            case 16:
                if (buildingMap.get("mine")!.getAmount >= 1) return true;
                break;
            case 17:
                if (buildingMap.get("mine")!.getAmount >= 5) return true;
                break;
            case 18:
                if (buildingMap.get("mine")!.getAmount >= 25) return true;
                break;
            case 19:
                if (buildingMap.get("shipment")!.getAmount >= 1) return true;
                break;
            case 20:
                if (buildingMap.get("shipment")!.getAmount >= 5) return true;
                break;
            case 21:
                if (buildingMap.get("shipment")!.getAmount >= 25) return true;
                break;
            case 22:
                if (buildingMap.get("alchemy")!.getAmount >= 1) return true;
                break;
            case 23:
                if (buildingMap.get("alchemy")!.getAmount >= 5) return true;
                break;
            case 24:
                if (buildingMap.get("alchemy")!.getAmount >= 25) return true;
                break;
            case 25:
                if (buildingMap.get("portal")!.getAmount >= 1) return true;
                break;
            case 26:
                if (buildingMap.get("portal")!.getAmount >= 5) return true;
                break;
            case 27:
                if (buildingMap.get("portal")!.getAmount >= 25) return true;
                break;
            case 28:
                if (buildingMap.get("time")!.getAmount >= 1) return true;
                break;
            case 29:
                if (buildingMap.get("time")!.getAmount >= 5) return true;
                break;
            case 30:
                if (buildingMap.get("time")!.getAmount >= 25) return true;
                break;
            case 31:
                if (achievementsEarnedAmount >= 13) return true;
                break;
            case 32:
                if (achievementsEarnedAmount >= 25) return true;
                break;
            case 33:
                if (allTimeCookies >= 50_000) return true;
                break;
            case 34:
                if (allTimeCookies >= 250_000) return true;
                break;
            case 35:
                if (allTimeCookies >= 500_000) return true;
                break;
            case 36:
                if (allTimeCookies >= 2_500_000) return true;
                break;
            case 37:
                if (allTimeCookies >= 5_000_000) return true;
                break;
            case 38:
                if (allTimeCookies >= 25_000_000) return true;
                break;
            case 39:
                if (allTimeCookies >= 5_000_000) return true;
                break;
            case 40:
                if (allTimeCookies >= 250_000_000) return true;
                break;
            case 41:
                if (allTimeCookies >= 500_000_000) return true;
                break;
            case 42:
                if (allTimeCookies >= 2_500_000_000) return true;
                break;
            case 43:
                if (buildingMap.get("cursor")!.getAmount >= 200) return true;
                break;
            case 44:
                if (buildingMap.get("grandma")!.getAmount >= 50) return true;
                break;
            case 45:
                if (buildingMap.get("farm")!.getAmount >= 50) return true;
                break;
            case 46:
                if (buildingMap.get("factory")!.getAmount >= 50) return true;
                break;
            case 47:
                if (buildingMap.get("mine")!.getAmount >= 50) return true;
                break;
            case 48:
                if (buildingMap.get("shipment")!.getAmount >= 50) return true;
                break;
            case 49:
                if (buildingMap.get("alchemy")!.getAmount >= 50) return true;
                break;
            case 50:
                if (buildingMap.get("portal")!.getAmount >= 50) return true;
                break;
            case 51:
                if (buildingMap.get("time")!.getAmount >= 50) return true;
                break;
            case 52:
                if (goldenCookiesClicked >= 7) return true;
                break;
            case 53:
                if (goldenCookiesClicked >= 27) return true;
                break;
            case 54:
                if (achievementsEarnedAmount >= 50) return true;
                break;
            case 55:
                if (allTimeCookies >= 5_000_000_000) return true;
                break;
            case 56:
                if (allTimeCookies >= 5_000_000_000) return true;
                break;
            case 57:
                if (buildingMap.get("farm")!.getAmount >= 15 && buildingMap.get("grandma")!.getAmount >= 1) return true;
                break;
            case 58:
                if (buildingMap.get("mine")!.getAmount >= 15 && buildingMap.get("grandma")!.getAmount >= 1) return true;
                break;
            case 59:
                if (buildingMap.get("factory")!.getAmount >= 15 && buildingMap.get("grandma")!.getAmount >= 1) return true;
                break;
            case 60:
                if (buildingMap.get("shipment")!.getAmount >= 15 && buildingMap.get("grandma")!.getAmount >= 1) return true;
                break;
            case 61:
                if (buildingMap.get("alchemy")!.getAmount >= 15 && buildingMap.get("grandma")!.getAmount >= 1) return true;
                break;
            case 62:
                if (buildingMap.get("portal")!.getAmount >= 15 && buildingMap.get("grandma")!.getAmount >= 1) return true;
                break;
            case 63:
                if (buildingMap.get("time")!.getAmount >= 15 && buildingMap.get("grandma")!.getAmount >= 1) return true;
                break;
            case 64:
                // TODO Check if "Elder" achievement earned (use its index when it's implemented) and own at least 6 grandmas
                break;
            case 65:
                // TODO Check if 1st research project completed
                break;
            case 66:
                // TODO Check if 2nd research project completed
                break;
            case 67:
                // TODO Check if 3rd research project completed
                break;
            case 68:
                // TODO Check if 4th research project completed
                break;
            case 69:
                // TODO Check if 5th research project completed
                break;
            case 70:
                // TODO Check if 6th research project completed
                break;
            case 71:
                // TODO Check if 7th research project completed
                break;
            case 72:
                // TODO Check if 8th research project completed
                break;
            case 73:
                // TODO Check if 9th research project completed
                break;
            case 74:
                // TODO Check if "Elder Pact" purchased and Elder Covenant not active
                break;
            case 75:
                if (allTimeClickedCookies >= 1_000) return true;
                break;
            case 76:
                if (allTimeClickedCookies >= 100_000) return true;
                break;
            case 77:
                if (allTimeClickedCookies >= 10_000_000) return true;
                break;
            case 78:
                if (allTimeClickedCookies >= 1_000_000_000) return true;
                break;
            case 79:
                return debug;
            case 80:
                if (allTimeCookies >= 25_000_000_000) return true;
                break;
            case 81:
                if (allTimeCookies >= 50_000_000_000) return true;
                break;
            case 82:
                if (buildingMap.get("cursor")!.getAmount >= 250) return true;
                break;
            case 83:
                return debug;
            case 84:
                // TODO Check if "Elder Pledge" purchased at least once
                break;
            case 85:
                // TODO Check if "Elder Pledge" purchased at least once
                break;
            case 86:
                if (goldenCookiesClicked >= 77) return true;
                break;
            case 87:
                if (pledges >= 10) return true;
                break;
            case 88:
                if (allTimeCookies >= 250_000_000_000) return true;
                break;
            case 89:
                if (allTimeCookies >= 500_000_000_000) return true;
                break;
            case 90:
                if (allTimeCookies >= 2_500_000_000_000) return true;
                break;
            case 91:
                return debug;
            case 92:
                if (allTimeCookies >= 5_000_000_000_000) return true;
                break;
            case 93:
                // TODO Check if "Tin of british tea biscuits" purchased
                break;
            case 94:
                // TODO Check if "British tea biscuits" purchased
                break;
            case 95:
                // TODO Check if "Chocolate british tea biscuits" purchased
                break;
            case 96:
                // TODO Check if "Round british tea biscuits" purchased
                break;
            case 97:
                // TODO Check if "Round chocolate british tea biscuits" purchased
                break;
            case 98:
                // TODO Check if "Round british tea biscuits with heart motif" purchased
                break;
            case 99:
                if (buildingMap.get("antimatter")!.getAmount >= 1) return true;
                break;
            case 100:
                if (buildingMap.get("antimatter")!.getAmount >= 5) return true;
                break;
            case 101:
                if (buildingMap.get("antimatter")!.getAmount >= 25) return true;
                break;
            case 102:
                if (buildingMap.get("antimatter")!.getAmount >= 50) return true;
                break;
            case 103:
                if (buildingMap.get("antimatter")!.getAmount >= 15 && buildingMap.get("grandma")!.getAmount >= 1) return true;
                break;
            case 104:
                if (allTimeCookies >= 25_000_000_000_000) return true;
                break;
            case 105:
                if (allTimeCookies >= 25_000_000_000_000) return true;
                break;
            case 106:
                if (allTimeCookies >= 50_000_000_000_000) return true;
                break;
            case 107:
                if (allTimeCookies >= 50_000_000_000_000) return true;
                break;
        }

        return false;
    }
}

class Achievement {
    private readonly id: number;
    private readonly name: string;
    private readonly description: string;
    private achieved: boolean;
    private readonly shadow: boolean;

    constructor(id: number, name: string, description: string, shadow: boolean = false) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.achieved = false;
        this.shadow = shadow;
    }

    get getName() {
        return this.name;
    }

    get getDescription() {
        return this.description;
    }

    get isAchieved() {
        return this.achieved;
    }

    get isShadow() {
        return this.shadow;
    }
}

const buildingNames: string[] = ["cursor", "grandma", "farm", "mine", "factory", "bank", "temple", "wizard", "shipment", "alchemy", "portal", "time", "antimatter", "prism"];
const buildingLegalNames: string[] = ["Cursor", "Grandma", "Farm", "Mine", "Factory", "Bank", "Temple", "Wizard Tower", "Shipment", "Alchemy Lab", "Portal", "Time Machine", "Antimatter Condenser", "Prism"];

let cookies: number = 0;
let clickMultiplier: number = 1;
let cps: number = 0;
let cpsMultiplier: number = 1;
let debug: boolean = false;
let goldenCookieDurationMultiplier: number = 1;
let goldenCookieChanceMultiplier: number = 1;
let elderCovenant: number = 1;
let elderPledgeDurationMinutes: number = 30;

// All time trackers

let pledges: number = 0;
let achievementsEarnedAmount: number = 0;
let allTimeCookies: number = 0;
let allTimeClickedCookies: number = 0;
let goldenCookiesClicked: number = 0;

const framerate = 30;

const clickButton = document.getElementById("clickButton") as HTMLButtonElement;
const cookieCount = document.getElementById("cookieCount") as HTMLLabelElement;
const info = document.getElementById("info") as HTMLParagraphElement;

const infoMap: Map<string, string> = getEmptyInfo();
const buttonMap: Map<string, HTMLButtonElement> = getButtons();
const buildingMap: Map<string, Building> = getBuildings();

const allUpgrades: Upgrade[] = getUpgrades();
const availableUpgrades: Upgrade[] = [];
const allAchievements: Achievement[] = getAchievements();
const kittenUpgrades: number[] = [];

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
            (Number(allUpgrades[6].isApplied) * 19 + 1) *
            (Number(allUpgrades[82].isApplied) * 19 + 1);

        updateCps();

        for (let i: number = 75; i < 79; i++)
            clickAdd += (Number(allUpgrades[i].isApplied) * 0.01 * cps);

        addCookies(clickMultiplier + clickAdd);
        allTimeClickedCookies += clickMultiplier + clickAdd;
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

    for (let i: number = 0; i < 4; i++) {
        const button: HTMLButtonElement = upgradeButtons[i];

        button.addEventListener("mouseenter", () => {
            if (availableUpgrades[i]) {
                const currentUpgrade: Upgrade = availableUpgrades[i];
                let infoPanelText: string = "";

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

function addCookies(deltaCookies: number): void {
    if (deltaCookies < 0) console.log(deltaCookies);
    cookies += deltaCookies;
    allTimeCookies += deltaCookies;
    updateCookies();
    updateButtons();
    updateAvailableUpgrades();
}

function updateCps() {
    let newCps: number = 0;

    buildingMap.forEach(building => {
        newCps += building.getOutput;
    });

    newCps *= cpsMultiplier;
    newCps *= milkMultiplier();
    newCps *= elderCovenant;

    cps = newCps;
    infoMap.set("cps", `cookies/s: ${Math.round(cps * 10) / 10}<br />`);
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
        const priceDiff: number = a.getPrice - b.getPrice;
        return priceDiff !== 0 ? priceDiff : a.getName.localeCompare(b.getName);
    });

    for (let i: number = 0; i < 4; i++) {
        const upgradeButton = document.getElementById("upgradeButton" + i) as HTMLButtonElement;
        if (availableUpgrades[i]) {
            upgradeButton.style.backgroundImage = `url("resources/upgrades/${availableUpgrades[i].getId}.png")`;
            upgradeButton.style.backgroundSize = "cover";
            upgradeButton.disabled = availableUpgrades[i].getPrice > Math.floor(cookies);
            upgradeButton.style.visibility = "visible";
        } else {
            upgradeButton.style.visibility = "hidden";
        }
    }
}

function updateAll(): void {
    updateCps();
    updateCookies();
    updateInfo();
    updateButtons();
    updateAvailableUpgrades();
}

function tick(): void {
    addCookies(cps / framerate);
}

function formatNumber(num: number): string {
    if (num < 10000)
        return num.toString();

    let e: number = 0;

    while (num >= 10000) {
        e++;
        num /= 10;
    }

    return `${Math.round(num / 100) / 10}e${e + 3}`;
}

function milkMultiplier(): number {
    let multiplier: number = 1;

    kittenUpgrades.forEach(upgrade => {
        multiplier *= (1 + upgrade * achievementsEarnedAmount * 0.04);
    });

    return multiplier;
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
    const upgrades: Upgrade[] = [];

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
    upgrades[13] = new Upgrade(13, "Sturdier conveyor belts", 1_300_000, "Factories are <b>twice</b> as efficient.<q>You're going places.</q>", "Own 1 factory");
    upgrades[14] = new Upgrade(14, "Child labor", 6_500_000, "Factories are <b>twice</b> as efficient.<q>Cheaper, healthier workforce.</q>", "Own 5 factories");
    upgrades[15] = new Upgrade(15, "Sweatshop", 65_000_000, "Factories are <b>twice</b> as efficient.<q>Slackers will be terminated.</q>", "Own 25 factories");
    upgrades[16] = new Upgrade(16, "Sugar gas", 120_000, "Mines are <b>twice</b> as efficient.<q>A pink, volatile gas, found in the depths of some chocolate caves.</q>", "Own 1 mine");
    upgrades[17] = new Upgrade(17, "Megadrill", 600_000, "Mines are <b>twice</b> as efficient.<q>You're in deep.</q>", "Own 5 mines");
    upgrades[18] = new Upgrade(18, "Ultradrill", 6_000_000, "Mines are <b>twice</b> as efficient.<q>Finally caved in?</q>", "Own 25 mines");
    upgrades[19] = new Upgrade(19, "Vanilla nebulae", 51_000_000_000, "Shipments are <b>twice</b> as efficient.<q>If you removed your space helmet, you could probably smell it!<br />(Note : don't do that.)</q>", "Own 1 shipment");
    upgrades[20] = new Upgrade(20, "Wormholes", 255_000_000_000, "Shipments are <b>twice</b> as efficient.<q>By using these as shortcuts, your ships can travel much faster.</q>", "Own 5 shipments");
    upgrades[21] = new Upgrade(21, "Frequent flyer", 2_550_000_000_000, "Shipments are <b>twice</b> as efficient.<q>Come back soon!</q>", "Own 25 shipments");
    upgrades[22] = new Upgrade(22, "Antimony", 750_000_000_000, "Alchemy labs are <b>twice</b> as efficient.<q>Actually worth a lot of money.</q>", "Own 1 alchemy lab");
    upgrades[23] = new Upgrade(23, "Essence of dough", 3_750_000_000_000, "Alchemy labs are <b>twice</b> as efficient.<q>Extracted through the 5 ancient steps of alchemical baking.</q>", "Own 5 alchemy labs");
    upgrades[24] = new Upgrade(24, "True chocolate", 37_500_000_000_000, "Alchemy labs are <b>twice</b> as efficient.<q>The purest form of cacao.</q>", "Own 25 alchemy labs");
    upgrades[25] = new Upgrade(25, "Ancient tablet", 10_000_000_000_000, "Portals are <b>twice</b> as efficient.<q>A strange slab of peanut brittle, holding an ancient cookie recipe. Neat!</q>", "Own 1 portal");
    upgrades[26] = new Upgrade(26, "Insane oatling workers", 50_000_000_000_000, "Portals are <b>twice</b> as efficient.<q>ARISE, MY MINIONS!</q>", "Own 5 portals");
    upgrades[27] = new Upgrade(27, "Soul bond", 500_000_000_000_000, "Portals are <b>twice</b> as efficient.<q>So I just sign up and get more cookies? Sure, whatever!</q>", "Own 25 portals");
    upgrades[28] = new Upgrade(28, "Flux capacitors", 140_000_000_000_000, "Time machines are <b>twice</b> as efficient.<q>Back to the future.</q>", "Own 1 time machine");
    upgrades[29] = new Upgrade(29, "Time paradox resolver", 700_000_000_000_000, "Time machines are <b>twice</b> as efficient.<q>No more fooling around with your own grandmother!</q>", "Own 5 time machines");
    upgrades[30] = new Upgrade(30, "Quantum conundrum", 7_000_000_000_000_000, "Time machines are <b>twice</b> as efficient.<q>There is only one constant, and that is universal uncertainty.<br />Or is it?</q>", "Own 25 time machines");
    upgrades[31] = new Upgrade(31, "Kitten helpers", 9_000_000, "You gain <b>more CpS</b> the more milk you have.<q>meow may I help you</q>", "13 Achievements (52% Milk)");
    upgrades[32] = new Upgrade(32, "Kitten workers", 9_000_000_000, "You gain <b>more CpS</b> the more milk you have.<q>meow meow meow meow</q>", "25 Achievements (100% Milk)");
    upgrades[33] = new Upgrade(33, "Plain cookies", 999_999, "Cookie production multiplier <b>+1%</b>.<q>We all gotta start somewhere.</q>", "50,000 cookies baked");
    upgrades[34] = new Upgrade(34, "Sugar cookies", 5_000_000, "Cookie production multiplier <b>+1%</b>.<q>Tasty, if a little unimaginative.</q>", "250,000 cookies baked");
    upgrades[35] = new Upgrade(35, "Oatmeal raisin cookies", 10_000_000, "Cookie production multiplier <b>+1%</b>.<q>No raisin to hate these.</q>", "500,000 cookies baked");
    upgrades[36] = new Upgrade(36, "Peanut butter cookies", 50_000_000, "Cookie production multiplier <b>+2%</b>.<q>Get yourself some jam cookies!</q>", "2.5 million cookies baked");
    upgrades[37] = new Upgrade(37, "Coconut cookies", 100_000_000, "Cookie production multiplier <b>+2%</b>.<q>Flaky, but not unreliable. Some people go crazy for these.</q>", "5 million cookies baked");
    upgrades[38] = new Upgrade(38, "White chocolate cookies", 500_000_000, "Cookie production multiplier <b>+2%</b>.<q>I know what you'll say. It's just cocoa butter! It's not real chocolate!<br />Oh please.</q>", "25 million cookies baked");
    upgrades[39] = new Upgrade(39, "Macadamia nut cookies", 100_000_000, "Cookie production multiplier <b>+2%</b>.<q>They're macadamn delicious!</q>", "5 million cookies cookies baked");
    upgrades[40] = new Upgrade(40, "Double-chip cookies", 5_000_000_000, "Cookie production multiplier <b>+2%</b>.<q>DOUBLE THE CHIPS<br />DOUBLE THE TASTY<br />(double the calories)</q>", "250 million cookies baked");
    upgrades[41] = new Upgrade(41, "White chocolate macadamia nut cookies", 10_000_000_000, "Cookie production multiplier <b>+2%</b>.<q>Orteil's favorite.</q>", "500 million cookies baked");
    upgrades[42] = new Upgrade(42, "All-chocolate cookies", 50_000_000_000, "Cookie production multiplier <b>+2%</b>.<q>CHOCOVERDOSE.</q>", "2.5 billion cookies baked");
    upgrades[43] = new Upgrade(43, "Quadrillion fingers", 10_000_000_000, "Multiplies the gain from Thousand fingers by <b>20</b>.<q>clickityclickityclickityclickityclick</q>", "Own 200 cursors");
    upgrades[44] = new Upgrade(44, "Prune juice", 5_000_000, "Grandmas are <b>twice</b> as efficient.<q>Gets me going.</q>", "Own 50 grandmas");
    upgrades[45] = new Upgrade(45, "Genetically-modified cookies", 55_000_000, "Farms are <b>twice</b> as efficient.<q>All-natural mutations.</q>", "Own 50 farms");
    upgrades[46] = new Upgrade(46, "Radium reactors", 6_500_000_000, "Factories are <b>twice</b> as efficient.<q>Gives your cookies a healthy glow.</q>", "Own 50 factories");
    upgrades[47] = new Upgrade(47, "Ultimadrill", 600_000_000, "Mines are <b>twice</b> as efficient.<q>Pierce the heavens, etc.</q>", "Own 50 mines");
    upgrades[48] = new Upgrade(48, "Warp drive", 255_000_000_000_000, "Shipments are <b>twice</b> as efficient.<q>To boldly bake.</q>", "Own 50 shipments");
    upgrades[49] = new Upgrade(49, "Ambrosia", 3_750_000_000_000_000, "Alchemy labs are <b>twice</b> as efficient.<q>Adding this to the cookie mix is sure to make them even more addictive!<br />Perhaps dangerously so.<br />Let's hope you can keep selling these legally.</q>", "Own 50 alchemy labs");
    upgrades[50] = new Upgrade(50, "Sanity dance", /*50_000_000_000_000_000*/0, "Portals are <b>twice</b> as efficient.<q>We can change if we want to.<br />We can leave our brains behind.</q>", "Own 50 portals");
    upgrades[51] = new Upgrade(51, "Causality enforcer", /*700_000_000_000_000_000*/0, "Time machines are <b>twice</b> as efficient.<q>What happened, happened.</q>", "Own 50 time machines");
    upgrades[52] = new Upgrade(52, "Lucky day", 777_777_777, "Golden cookies appear <b>twice as often</b> and last <b>twice as long</b> on screen.<q>Oh hey, a four-leaf penny!</q>", "7 Golden Cookies clicked");
    upgrades[53] = new Upgrade(53, "Serendipity", 77_777_777_777, "Golden cookies appear <b>twice as often</b> and last <b>twice as long</b> on screen.<q>What joy! Seven horseshoes!</q>", "27 Golden Cookies clicked");
    upgrades[54] = new Upgrade(54, "Kitten engineers", 90_000_000_000_000, "You gain <b>more CpS</b> the more milk you have.<q>meow meow meow meow, sir</q>", "50 Achievements (200% Milk)");
    upgrades[55] = new Upgrade(55, "Dark chocolate-coated cookies", 100_000_000_000, "Cookie production multiplier <b>+5%</b>.<q>These absorb light so well you almost need to squint to see them.</q>", "5 billion cookies baked");
    upgrades[56] = new Upgrade(56, "White chocolate-coated cookies", 100_000_000_000, "Cookie production multiplier <b>+5%</b>.<q>These dazzling cookies absolutely glisten with flavor.</q>", "5 billion cookies baked");
    upgrades[57] = new Upgrade(57, "Farmer grandmas", 55_000, "Grandmas are <b>twice</b> as efficient. Farms gain <b>+1%</b> CpS per 1 grandma.<q>A nice farmer to grow more cookies.</q>", "15 farms and 1 grandma owned");
    upgrades[58] = new Upgrade(58, "Miner grandmas", 600_000, "Grandmas are <b>twice</b> as efficient. Mines gain <b>+1%</b> CpS per 2 grandmas.<q>A nice miner to dig more cookies.</q>", "15 mines and 1 grandma owned");
    upgrades[59] = new Upgrade(59, "Worker grandmas", 6_500_000, "Grandmas are <b>twice</b> as efficient. Factories gain <b>+1%</b> CpS per 3 grandmas.<q>A nice worker to manufacture more cookies.</q>", "15 factories and 1 grandma owned");
    upgrades[60] = new Upgrade(60, "Cosmic grandmas", 255_000_000_000, "Grandmas are <b>twice</b> as efficient. Shipments gain <b>+1%</b> CpS per 7 grandmas.<q>A nice thing to... uh... cookies.</q>", "15 shipments and 1 grandma owned");
    upgrades[61] = new Upgrade(61, "Transmuted grandmas", 3_750_000_000_000, "Grandmas are <b>twice</b> as efficient. Alchemy labs gain <b>+1%</b> CpS per 8 grandmas.<q>A nice golden grandma to convert into more cookies.</q>", "15 alchemy labs and 1 grandma owned");
    upgrades[62] = new Upgrade(62, "Altered grandmas", 50_000_000_000_000, "Grandmas are <b>twice</b> as efficient. Portals gain <b>+1%</b> CpS per 9 grandmas.<q>a NiCe GrAnDmA tO bA##########</q>", "15 portals and 1 grandma owned");
    upgrades[63] = new Upgrade(63, "Grandmas' grandmas", 700_000_000_000_000, "Grandmas are <b>twice</b> as efficient. Time machines gain <b>+1%</b> CpS per 10 grandmas.<q>A nice grandma's nice grandma to bake double the cookies.</q>", "15 time machines and 1 grandma owned");
    upgrades[64] = new Upgrade(64, "Bingo center/Research facility", 1_000_000_000_000_000, "Grandma-operated science lab and leisure club.<br />Grandmas are <b>4 times</b> as efficient.<br /><b>Regularly unlocks new upgrades.</b><q>What could possibly keep those grandmothers in check?...<br />Bingo.</q>", "\"Elder\" achievement earned<br />At least 6 grandmas owned");
    upgrades[65] = new Upgrade(65, "Specialized chocolate chips", 1_000_000_000_000_000, "Cookie production multiplier <b>+1%</b>.<q>Computer-designed chocolate chips. Computer chips, if you will.</q>", "1st research project completed");
    upgrades[66] = new Upgrade(66, "Designer cocoa beans", 2_000_000_000_000_000, "Cookie production multiplier <b>+2%</b>.<q>Now more aerodynamic than ever!</q>", "2nd research project completed");
    upgrades[67] = new Upgrade(67, "Ritual rolling pins", 4_000_000_000_000_000, "Grandmas are <b>twice</b> as efficient.<q>The result of years of scientific research!</q>", "3rd research project completed");
    upgrades[68] = new Upgrade(68, "Underworld ovens", 8_000_000_000_000_000, "Cookie production multiplier <b>+3%</b>.<q>Powered by science, of course!</q>", "4th research project completed");
    upgrades[69] = new Upgrade(69, "One mind", /*16_000_000_000_000_000*/0, "Each grandma gains <b>+0.02 base Cps per grandma</b>.<q>We are one. We are many.</q>", "5th research project completed");
    upgrades[70] = new Upgrade(70, "Exotic nuts", /*32_000_000_000_000_000*/0, "Cookie production multiplier <b>+4%</b>.<q>You'll go crazy over these!</q>", "6th research project completed");
    upgrades[71] = new Upgrade(71, "Communal brainsweep", /*64_000_000_000_000_000*/0, "Each grandma gains another <b>+0.02 base Cos oer grandma</b>.<q>We fuse. We merge. We grow.</q>", "8th research project completed");
    upgrades[72] = new Upgrade(72, "Arcane sugar", /*128_000_000_000_000_000*/0, "Cookie production multiplier <b>+5%</b>.<q>Tastes like insects, ligaments, and molasses,</q>", "8th research project completed");
    upgrades[73] = new Upgrade(73, "Elder Pact", /*256_000_000_000_000_000*/0, "Each grandma gains <b>+0.05 base CpS per portal</b>.<q>squirm crawl slither writhe today we rise</q>", "9th research project completed");
    upgrades[74] = new Upgrade(74, "Elder Pledge", 0, "Contains the wrath of the elders, at least for a while.<q>This is simple ritual involving anti-aging cream, cookie batter mixed in the moonlight, and a live chicken.</q>", "\"Elder Pact\" purchased");
    upgrades[75] = new Upgrade(75, "Plastic mouse", 50_000, "Clicking gains <b>+1% of your CpS</b>.<q>Slightly squeaky.</q>", "1,000 hand-made cookies");
    upgrades[76] = new Upgrade(76, "Iron mouse", 5_000_000, "Clicking gains <b>+1% of your CpS</b>.<q>Click like it's 1,349!</q>", "100,000 hand-made cookies");
    upgrades[77] = new Upgrade(77, "Titanium mouse", 500_000_000, "Clicking gains <b>+1% of your CpS</b>.<q>Heavy, but powerful.</q>", "10 million hand-made cookies");
    upgrades[78] = new Upgrade(78, "Adamantium mouse", 50_000_000_000, "Clicking gains <b>+1% of your CpS</b>.<q>You could cut diamond with these.</q>", "1 billion hand-made cookies");
    upgrades[79] = new Upgrade(79, "Ultrascience", 7, "Research takes only <b>5 seconds</b>.<q>YEAH, SCIENCE!</q>", "Debug mode", true);
    upgrades[80] = new Upgrade(80, "Eclipse cookies", 500_000_000_000, "Cookie production multiplier <b>+2%</b>.<q>Look to the cookie.</q>", "25 billion cookies baked");
    upgrades[81] = new Upgrade(81, "Zebra cookies", 1_000_000_000_000, "Cookie production multiplier <b>+2%</b>.<q>...</q>", "50 billion cookies baked");
    upgrades[82] = new Upgrade(82, "Quintillion fingers", 10_000_000_000_000, "Multiplies the gain from Thousand fingers by <b>20</b>.<q>man, just go click click click click click, it's real easy, man.</q>", "Own 250 cursors");
    upgrades[83] = new Upgrade(83, "Gold hoard", 7, "Golden cookies appear <b>really often</b>.<q>That's entirely too many.</q>", "Debug mode", true);
    upgrades[84] = new Upgrade(84, "Elder Covenant", 66_666_666_666_666, "Puts a permanent end to the elders' wrath, at the price of 5% of your CpS.<q>This is a complicated ritual involving silly, inconsequential trivialities such as cursed laxatives, century-old cacao, and an infant.<br />Don't question it.</q>", "\"Elder Pledge\" purchased at least once");
    upgrades[85] = new Upgrade(85, "Revoke Elder Covenant", 6_666_666_666, "You will get 5% of your CpS back, but the grandmatriarchs will return.<q>we<br />rise<br />again</q>", "\"Elder Pledge\" purchased at least once");
    upgrades[86] = new Upgrade(86, "Get lucky", 77_777_777_777_777, "Golden cookie effects last <b>twice as long</b>.<q>You've been up all night, haven't you?</q>", "77 Golden Cookies clicked");
    upgrades[87] = new Upgrade(87, "Sacrificial rolling pins", 2_888_888_888_888, "Elder pledges last <b>twice</b> as long.<q>These are mostly just for spreading the anti-aging cream.<br />(And accessorily, shortening the chicken's suffering.)</q>", "\"Elder Pledge\" purchased 10 times");
    upgrades[88] = new Upgrade(88, "Snickerdoodles", 5_000_000_000_000, "Cookie production multiplier <b>+2%</b>.<q>True to their name.</q>", "250 billion cookies baked");
    upgrades[89] = new Upgrade(89, "Stroopwafels", 10_000_000_000_000, "Cookie production multiplier <b>+2%</b>.<q>If it ain't dutch, it ain't much.</q>", "500 billion cookies baked");
    upgrades[90] = new Upgrade(90, "Macaroons", 50_000_000_000_000, "Cookie production multiplier <b>+2%</b>.<q>Not to be confused with macarons.<br />These have coconut, okay?</q>", "2.5 trillion cookies baked");
    upgrades[91] = new Upgrade(91, "Neuromancy", 7, "Can toggle upgrades on and off at will in the stats menu.<q>Can also come in handy to unsee things that can't be unseen.</q>", "Debug mode", true);
    upgrades[92] = new Upgrade(92, "Empire biscuits", 100_000_000_000_000, "Cookie production multiplier <b>+2%</b>.<q>For your growing cookie empire, of course!</q>", "5 trillion cookies baked");
    upgrades[93] = new Upgrade(93, "British tea biscuits", 100_000_000_000_000, "Cookie production multiplier <b>+2%</b>.<q>Quite.</q>", "5 trillion cookies baked and \"Tin of british tea biscuits\" purchased");
    upgrades[94] = new Upgrade(94, "Chocolate british tea biscuits", 100_000_000_000_000, "Cookie production multiplier <b>+2%</b>.<q>Yes, quite.</q>", "5 trillion cookies baked and \"British tea biscuits\" purchased");
    upgrades[95] = new Upgrade(95, "Round british tea biscuits", 100_000_000_000_000, "Cookie production multiplier <b>+2%</b>.<q>Yes, quite riveting.</q>", "5 trillion cookies baked and \"Chocolate british tea biscuits\" purchased");
    upgrades[96] = new Upgrade(96, "Round chocolate british tea biscuits", 100_000_000_000_000, "Cookie production multiplier <b>+2%</b>.<q>Yes, quite riveting indeed.</q>", "5 trillion cookies baked and \"Round british tea biscuits\" purchased");
    upgrades[97] = new Upgrade(97, "Round british tea biscuits with heart motif", 100_000_000_000_000, "Cookie production multiplier <b>+2%</b>.<q>Yes, quite riveting, old chap.</q>", "5 trillion cookies baked and \"Round chocolate british tea biscuits\" purchased");
    upgrades[98] = new Upgrade(98, "Round chocolate british tea biscuits with heart motif", 100_000_000_000_000, "Cookie production multiplier <b>+2%</b>.<q>I like cookies.</q>", "5 trillion cookies baked and \"Round british tea biscuits with heart motif\" purchased");
    upgrades[99] = new Upgrade(99, "Sugar bosons", 1_700_000_000_000_000, "Antimatter condensers are <b>twice</b> as efficient.<q>Sweet firm bosons.</q>", "Own 1 antimatter condenser");
    upgrades[100] = new Upgrade(100, "String theory", 8_500_000_000_000_000, "Antimatter condensers are <b>twice</b> as efficient.<q>Reveals new insight about the true meaning of baking cookies<br />(and, as a bonus, the structure of the universe).</q>", "Own 5 antimatter condensers");
    upgrades[101] = new Upgrade(101, "Large macaron collider", /*85_000_000_000_000_000*/0, "Antimatter condensers are <b>twice</b> as efficient.<q>How singular!</q>", "Own 25 antimatter condensers");
    upgrades[102] = new Upgrade(102, "Big bang bake", /*8_500_000_000_000_000_000*/0, "Antimatter condensers are <b>twice</b> as efficient.<q>And that's how it all began.</q>", "Own 50 antimatter condensers");
    upgrades[103] = new Upgrade(103, "Antigrandmas", 8_500_000_000_000_000, "Grandmas are <b>twice</b> as efficient.<br />Antimatter condensers gain <b>+1% CpS</b> per 11 grandmas.<q>A mean antigrandma to vomit more cookies.<br />(Do not put in contact with normal grandmas; loss of matter may occur.)</q>", "15 antimatter condensers and 1 grandma owned");
    upgrades[104] = new Upgrade(104, "Madeleines", 500_000_000_000_000, "Cookie production multiplier <b>+2%</b>.<q>Unforgettable!</q>", "25 trillion cookies baked");
    upgrades[105] = new Upgrade(105, "Palmiers", 500_000_000_000_000, "Cookie production multiplier <b>+2%</b>.<q>Palmier than you!</q>", "25 trillion cookies baked");
    upgrades[106] = new Upgrade(106, "Palets", 1_000_000_000_000_000, "Cookie production multiplier <b>+2%</b>.<q>You could probably play hockey with these.<br />I mean, you're welcome to try.</q>", "50 trillion cookies baked");
    upgrades[107] = new Upgrade(107, "Sablés", 1_000_000_000_000_000, "Cookie production multiplier <b>+2%</b>.<q>The name implies they're made of sand. But you know better, don't you?</q>", "50 trillion cookies baked");

    return upgrades;
}

function getAchievements(): Achievement[] {
    const achievements: Achievement[] = [];

    achievements[0] = new Achievement(0, "Wake and bake", "Bake <b>1</b> cookie in one ascension.");
    achievements[1] = new Achievement(1, "Making some dough", "Bake <b>1,000</b> cookies in one ascension.");
    achievements[2] = new Achievement(2, "So baked right now", "Bake <b>100,000</b> cookies in one ascension.");
    achievements[3] = new Achievement(3, "Fledgling bakery", "Bake <b>1 million</b> cookies in one ascension.");
    achievements[4] = new Achievement(4, "Affluent bakery", "Bake <b>100 million</b> cookies in one ascension.");
    achievements[5] = new Achievement(5, "World-famous bakery", "Bake <b>1 billion</b> cookie in one ascension.");
    achievements[6] = new Achievement(6, "Cosmic bakery", "Bake <b>100 billion</b> cookie in one ascension.");
    achievements[7] = new Achievement(7, "Galactic bakery", "Bake <b>1 trillion</b> cookie in one ascension.");
    achievements[8] = new Achievement(8, "Universal bakery", "Bake <b>100 trillion</b> cookie in one ascension.");
    achievements[9] = new Achievement(9, "Timeless bakery", "Bake <b>1 quadrillion</b> cookie in one ascension.");
    achievements[10] = new Achievement(10, "Infinite bakery", "Bake <b>100 quadrillion</b> cookie in one ascension.");
    achievements[11] = new Achievement(11, "Immortal bakery", "Bake <b>1 quintillion</b> cookie in one ascension.");
    achievements[12] = new Achievement(12, "Don't stop me now", "Bake <b>100 quintillion</b> cookie in one ascension.");
    achievements[13] = new Achievement(13, "You can stop me now", "Bake <b>1 sextillion</b> cookie in one ascension.");
    achievements[14] = new Achievement(14, "Cookies all the way down", "Bake <b>100 sextillion</b> cookie in one ascension.");
    achievements[15] = new Achievement(15, "Overdose", "Bake <b>1 septillion</b> cookie in one ascension.");
    // achievements[] = new Achievement(, "", "Bake <b></b> cookie in one ascension.");
    achievements[16] = new Achievement(16, "Casual baking", "Bake <b>1</b> cookie per second.");
    achievements[17] = new Achievement(17, "Hardcore baking", "Bake <b>10</b> cookies per second.");
    achievements[18] = new Achievement(18, "Steady tasty stream", "Bake <b>100</b> cookies per second.");
    achievements[19] = new Achievement(19, "Cookie monster", "Bake <b>1,000</b> cookies per second.");
    achievements[20] = new Achievement(20, "Mass producer", "Bake <b>10,000</b> cookies per second.");
    achievements[21] = new Achievement(21, "Cookie vortex", "Bake <b>1 million</b> cookies per second.");
    achievements[22] = new Achievement(22, "Cookie pulsar", "Bake <b>10 million</b> cookies per second.");
    achievements[23] = new Achievement(23, "Cookie quasar", "Bake <b>100 million</b> cookies per second.");
    achievements[24] = new Achievement(24, "Oh hey, you're still here", "Bake <b>1 billion</b> cookies per second.");
    achievements[25] = new Achievement(25, "Let's never bake again", "Bake <b>10 billion</b> cookies per second.");
    // achievements[] = new Achievement(, "", "Bake <b></b> cookies per second.");
    achievements[26] = new Achievement(26, "Sacrifice", "Ascend with <b>1 million cookies</b> baked.<q>Easy come, easy go.</q>");
    achievements[27] = new Achievement(27, "Oblivion", "Ascend with <b>1 billion cookies</b> baked.<q>Back to square one.</q>");
    achievements[28] = new Achievement(28, "From scratch", "Ascend with <b>1 trillion cookies</b> baked.<q>It's been fun.</q>");
    // achievements[] = new Achievement(, "", "Ascend with <b></b> baked.<q></q>");
    achievements[29] = new Achievement(29, "Neverclick", "Make <b>1 million cookies</b> by only having clicked <b>15 times</b>.");
    achievements[30] = new Achievement(30, "Clicktastic", "Make <b>1,000 cookies</b> cookies from clicking.");
    achievements[31] = new Achievement(31, "Clickathlon", "Make <b>100,000 cookies</b> cookies from clicking.");
    achievements[32] = new Achievement(32, "Clickolympics", "Make <b>10 million cookies</b> cookies from clicking.");
    achievements[33] = new Achievement(33, "Clickorama", "Make <b>1 billion cookies</b> cookies from clicking.");
    // achievements[] = new Achievement(, "", "Make <b></b> cookies from clicking.");
    achievements[34] = new Achievement(34, "Click", "Have <b>1 cursors</b>.");
    achievements[35] = new Achievement(35, "Double-click", "Have <b>2 cursors</b>.");
    achievements[36] = new Achievement(36, "Mouse wheel", "Have <b>50 cursors</b>.");
    achievements[37] = new Achievement(37, "Of Mice and Men", "Have <b>100 cursors</b>.");
    achievements[38] = new Achievement(38, "The Digital", "Have <b>200 cursors</b>.");
    // achievements[] = new Achievement(, "", "Have <b> cursors</b>.");
    achievements[39] = new Achievement(39, "Just wrong", "Sell a grandma.<q>I thought you loved me.</q>");
    achievements[40] = new Achievement(40, "Grandma's cookies", "Have <b>1 grandma</b>.");
    achievements[41] = new Achievement(41, "Sloppy kisses", "Have <b>50 grandmas</b>.");
    achievements[42] = new Achievement(42, "Retirement home", "Have <b>100 grandmas</b>.");
    // achievements[] = new Achievement(, "", "Have <b> grandmas</b>.");
    achievements[43] = new Achievement(43, "Bought the farm", "Have <b>1 farm</b>.");
    achievements[44] = new Achievement(44, "Reap what you sow", "Have <b>50 farms</b>.");
    achievements[45] = new Achievement(45, "Farm ill", "Have <b>100 farms</b>.");
    // achievements[] = new Achievement(, "", "Have <b> farms</b>.");
    achievements[46] = new Achievement(46, "Production chain", "Have <b>1 factory</b>.");
    achievements[47] = new Achievement(47, "Industrial revolution", "Have <b>50 factories</b>.");
    achievements[48] = new Achievement(48, "Global warming", "Have <b>100 factories</b>.");
    // achievements[] = new Achievement(, "", "Have <b> factories</b>.");
    achievements[49] = new Achievement(49, "You know the drill", "Have <b>1 mine</b>.");
    achievements[50] = new Achievement(50, "Excavation site", "Have <b>50 mines</b>.");
    achievements[51] = new Achievement(51, "Hollow the planet", "Have <b>100 mines</b>.");
    // achievements[] = new Achievement(, "", "Have <b> mines</b>.");
    achievements[52] = new Achievement(52, "Expedition", "Have <b>1 shipment</b>.");
    achievements[53] = new Achievement(53, "Galactic highway", "Have <b>50 shipments</b>.");
    achievements[54] = new Achievement(54, "Far far away", "Have <b>100 shipments</b>.");
    // achievements[] = new Achievement(, "", "Have <b> shipments</b>.");
    achievements[55] = new Achievement(55, "Transmutation", "Have <b>1 alchemy lab</b>.");
    achievements[56] = new Achievement(56, "Transmogrification", "Have <b>50 alchemy labs</b>.");
    achievements[57] = new Achievement(57, "Gold member", "Have <b>100 alchemy labs</b>.");
    // achievements[] = new Achievement(, "", "Have <b> alchemy labs</b>.");
    achievements[58] = new Achievement(58, "A whole new world", "Have <b>1 portal</b>.");
    achievements[59] = new Achievement(59, "Now you're thinking", "Have <b>50 portals</b>.");
    achievements[60] = new Achievement(60, "Dimensional shift", "Have <b>100 portals</b>.");
    // achievements[] = new Achievement(, "", "Have <b> portals</b>.");
    achievements[61] = new Achievement(61, "Time warp", "Have <b>1 time machine</b>.");
    achievements[62] = new Achievement(62, "Alternate timeline", "Have <b>50 time machines</b>.");
    achievements[63] = new Achievement(63, "Rewriting history", "Have <b>100 time machines</b>.");
    // achievements[] = new Achievement(, "", "Have <b> time machines</b>.");
    achievements[64] = new Achievement(64, "One with everything", "Have <b>at least 1</b> of every building");
    achievements[65] = new Achievement(65, "Mathematician", "Have at least <b>1 of the most expensive building, 2 of the second-most expensive, 4 of the next</b> and so on (capped at 128).");
    achievements[66] = new Achievement(66, "Base 10", "Have at least <b>10 of the most expensive building, 20 of the second-most expensive, 30 of the next</b> and so on.");
    achievements[67] = new Achievement(67, "Golden cookie", "Click a <b>golden cookie</b>.");
    achievements[68] = new Achievement(68, "Lucky cookie", "Click <b>7 golden cookies</b>.");
    achievements[69] = new Achievement(69, "A stroke of luck", "Click <b>27 golden cookies</b>.");
    achievements[70] = new Achievement(70, "Cheated cookies taste awful", "Hack in some cookies.", true);
    achievements[71] = new Achievement(71, "Uncanny clicker", "Click really, really fast.<q>Well I'll be!</q>");
    achievements[72] = new Achievement(72, "Builder", "Own <b>100 buildings</b>.");
    achievements[73] = new Achievement(73, "Architect", "Own <b>500 buildings</b>.");
    achievements[74] = new Achievement(74, "Enhancer", "Purchase <b>20 upgrades</b>.");
    achievements[75] = new Achievement(75, "Augmenter", "Purchase <b>50 upgrades</b>.");
    achievements[76] = new Achievement(76, "Engineer", " Own <b>1,000 buildings</b>.");
    achievements[77] = new Achievement(77, "Fortune", "Click <b>77 golden cookies</b>.");
    achievements[78] = new Achievement(78, "True Neverclick", "Make <b>1 million</b> cookies with <b>no</b> cookie clicks.<q>This kinda defeats the whole purpose, doesn't it?</q>");
    achievements[79] = new Achievement(79, "Elder nap", "Appease the grandmatriarchs at least <b>once</b>.<q>we<br />are<br />eternal</q>");
    achievements[80] = new Achievement(80, "Elder slumber", "Appease the grandmatriarchs at least <b>once</b>.<br />our mind<br />outlives<br />the universe");
    achievements[81] = new Achievement(81, "Elder", "Own at least <b>7</b> grandma types.");
    achievements[82] = new Achievement(82, "Elder calm", "Declare a covenant with the grandmatriarchs.<q>we<br />have<br />fed</q>");
    achievements[84] = new Achievement(84, "Leprechaun", "Click <b>777 golden cookies</b>.");
    achievements[85] = new Achievement(85, "Black cat's paw", "Click <b>7777 golden cookies</b>.");
    achievements[86] = new Achievement(86, "Nihilism", "Ascend with <b>1 quadrillion cookies</b> baked.<q>There are many things that needed to be erased</q>");
    achievements[87] = new Achievement(87, "Antibatter", "Have <b>1 antimatter condenser</b>.");
    achievements[88] = new Achievement(88, "Quirky quarks", "Have <b>50 antimatter condensers</b>.");
    achievements[89] = new Achievement(89, "It does matter!", "Have <b>100 antimatter condensers</b>.");
    // achievements[] = new Achievement(, "", "Have <b> antimatter condensers</b>.");
    achievements[90] = new Achievement(90, "Upgrader", "Purchase <b>100 upgrades</b>.");
    achievements[91] = new Achievement(91, "Centennial", "Purchase <b>100 of everything</b>.");
    achievements[92] = new Achievement(92, "Hardcore", "Get to <b>1 billion cookies</b> baked with <b>no upgrades purchased</b>.");
    achievements[93] = new Achievement(93, "Speed baking I", "Get to <b>1 million</b> cookies baked in <b>35 minutes</b>.");
    achievements[94] = new Achievement(94, "Speed baking II", "Get to <b>1 million</b> cookies baked in <b>25 minutes</b>.");
    achievements[95] = new Achievement(95, "Speed baking III", "Get to <b>1 million</b> cookies baked in <b>15 minutes</b>.");

    return achievements;
}

function giveMeCookies(amount: number): void {
    addCookies(amount);
}
