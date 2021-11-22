// const { performance } = require('perf_hooks');
// const {
//   generateCombinations,
//   generateFinalCombinations,
//   getFinalCombination,
// } = require('./product.service');

import generateFinalCombinations from './generateFinalCombinations';
import getFinalCombination from './getFinalCombination';
import generateCombinations from './generateCombinations';

import OutcomeData from './dtos/OutcomeData';
import SuboutcomeData from './dtos/SuboutcomeData';
import NutraceuticalData from './dtos/NutraceuticalData';
import InfluenceData from './dtos/InfluenceData';
import InteractionData from './dtos/InteractionData';
import CombinationData from './dtos/CombinationData';
import RejectedCombinationsData from './dtos/RejectedCombinationsData';
import FinalCombinationData from './dtos/FinalCombinationData';
import FinalCombinationsData from './dtos/FinalCombinationsData';
import SettingData from './dtos/SettingData';

class CombinationsManager {
  outcomes;

  suboutcomes;

  nutraceuticals: NutraceuticalData[];

  nutraceuticalInfluences;

  nutraceuticalInteractionsWithSuboutcomes;

  private combinations = new Map<number, CombinationData[]>(); // Todas as combinacoes possiveis

  private rejectedCombinations = new Map<number, RejectedCombinationsData[]>(); // Todas as combinacoes rejeitadas

  private filteredCombinations = new Map<number, CombinationData[]>(); // Todas as combinacoes filtradas de acordo com a blacklist

  private filteredRejectedCombinations = new Map<
    number,
    RejectedCombinationsData[]
  >(); // Todas as combinacoes rejeitadas filtradas de acordo com a blacklist

  private activeCombinations = new Map<number, CombinationData>(); // Todas as combinacoes ativas pelo usuario no sankey

  private activeRejectedCombinations = new Map<
    number,
    RejectedCombinationsData
  >(); // Todas as combinacoes rejeitadas e ativas pelo usuario no sankey

  private blacklist: string[] = []; // Lista de nomes de nutraceuticos que o usuario nao quer

  private settings: SettingData[] = []; // Lista de settings ativas pelo sankey (o que o usuario quer e em qual nivel ele quer (min, med, max))

  private finalCombinations: FinalCombinationsData[] = []; // Lista de combinacoes finais para debugging

  private rejectedFinalCombinations: FinalCombinationsData[] = []; // Lista de combinacoes finais rejeitadas para debugging

  private finalCombination: FinalCombinationData = {}; // Combinacao final apos todas as operacoes

  /*
    Recebe entradas de acordo com outputexample.txt
  */
  constructor(
    outcomes: OutcomeData[],
    suboutcomes: SuboutcomeData[],
    nutraceuticals: NutraceuticalData[],
    nutraceuticalInfluences: InfluenceData[],
    nutraceuticalInteractionsWithSuboutcomes: InteractionData[],
  ) {
    this.outcomes = outcomes;
    this.suboutcomes = suboutcomes;
    this.nutraceuticals = nutraceuticals;
    this.nutraceuticalInfluences = nutraceuticalInfluences;
    this.nutraceuticalInteractionsWithSuboutcomes =
      nutraceuticalInteractionsWithSuboutcomes;

    this.bootstrapCombinations();
    this.filterWithBlacklist();
  }

  /*
    Retorna a combinação final para ser exibida pro usuário
  */
  get final(): FinalCombinationData {
    return this.finalCombination;
  }

  // getLogs() {
  //   const basicCombinations = Object.fromEntries(this.activeCombinations);
  //   const rejectedBasicCombinations = Object.fromEntries(
  //     this.activeRejectedCombinations,
  //   );
  //   const { finalCombinations } = this;
  //   const { rejectedFinalCombinations } = this;

  //   return {
  //     basicCombinations,
  //     rejectedBasicCombinations,
  //     finalCombinations,
  //     rejectedFinalCombinations,
  //   };
  // }

  /*
    Recebe o nome do nutraceutico pra adicionar na blacklist
  */
  addInBlacklist(nutraceutical: string): void {
    if (!nutraceutical) return;

    this.blacklist.push(nutraceutical);

    this.filterWithBlacklist();
    this.getActiveCombinations();

    const { finalCombinations, rejectedFinalCombinations } =
      generateFinalCombinations(
        this.activeCombinations,
        this.nutraceuticalInfluences,
        this.nutraceuticalInteractionsWithSuboutcomes,
        this.settings,
      );

    this.finalCombinations = finalCombinations;
    this.rejectedFinalCombinations = rejectedFinalCombinations;

    this.finalCombination = getFinalCombination(
      this.finalCombinations,
      this.suboutcomes,
      this.outcomes,
    );
  }

  /*
    Recebe o nome do nutraceutico pra adicionar na blacklist
  */
  removeFromBlacklist(nutraceutical: string): void {
    if (!nutraceutical) return;

    const index = this.blacklist.indexOf(nutraceutical);
    if (index === -1) return;

    this.blacklist.splice(index);

    this.filterWithBlacklist();
    this.getActiveCombinations();

    const { finalCombinations, rejectedFinalCombinations } =
      generateFinalCombinations(
        this.activeCombinations,
        this.nutraceuticalInfluences,
        this.nutraceuticalInteractionsWithSuboutcomes,
        this.settings,
      );

    this.finalCombinations = finalCombinations;
    this.rejectedFinalCombinations = rejectedFinalCombinations;

    this.finalCombination = getFinalCombination(
      this.finalCombinations,
      this.suboutcomes,
      this.outcomes,
    );
  }

  /*
    Recebe a setting da forma:
    {
      ID - ID do suboutcome desejado
      level - Int que representa o nivel de output desejado, sendo:
        0 (desativar a setting)
        1 (min)
        2 (med)
        3 (max)
    }
  */
  addSetting(setting: SettingData): void {
    if (!setting) return;

    if (setting.level === 0) {
      const index = this.settings.findIndex(item => {
        return item.ID === setting.ID;
      });

      if (index !== -1) this.settings.splice(index);
    } else if (setting.level > 0 && setting.level <= 3) {
      const index = this.settings.findIndex(item => {
        return item.ID === setting.ID;
      });

      if (index !== -1) this.settings[index] = setting;
      else this.settings.push(setting);
    }

    this.getActiveCombinations();

    const { finalCombinations, rejectedFinalCombinations } =
      generateFinalCombinations(
        this.activeCombinations,
        this.nutraceuticalInfluences,
        this.nutraceuticalInteractionsWithSuboutcomes,
        this.settings,
      );

    this.finalCombinations = finalCombinations;
    this.rejectedFinalCombinations = rejectedFinalCombinations;

    this.finalCombination = getFinalCombination(
      this.finalCombinations,
      this.suboutcomes,
      this.outcomes,
    );
  }

  // printCombinations(map) {
  //   if (!map) return;

  //   switch (map) {
  //     case 1:
  //       this.#printMap(this.#combinations);
  //       break;
  //     case 2:
  //       this.#printMap(this.#filteredCombinations);
  //       break;
  //   }
  // }

  private bootstrapCombinations() {
    this.suboutcomes.forEach(suboutcome => {
      this.combinations.set(suboutcome.ID, []);
      this.rejectedCombinations.set(suboutcome.ID, []);

      let level: number;

      for (level = 1; level <= 3; level += 1) {
        const { combinations, rejectedCombinations } = generateCombinations(
          this.nutraceuticals,
          suboutcome,
          level,
          this.nutraceuticalInfluences,
        );

        let tmpValue = this.combinations.get(suboutcome.ID);
        let rejectedTmpValue = this.rejectedCombinations.get(suboutcome.ID);

        if (tmpValue) {
          tmpValue = [...tmpValue, ...combinations];
          this.combinations.set(suboutcome.ID, tmpValue);
        }

        if (rejectedTmpValue) {
          rejectedTmpValue = [...rejectedTmpValue, ...rejectedCombinations];
          this.rejectedCombinations.set(suboutcome.ID, rejectedTmpValue);
        }
      }
    });
  }

  // private printMap(map) {
  //   for (const [key, value] of map) {
  //     console.log(`/////KEY: ${key}/////`);

  //     value.forEach((item, index) => {
  //       console.log(`Level ${index + 1}:`);
  //       // UNCOMMENT THE FOLLOWING 2 LINES TO GET A HIGHER LEVEL LOGGING
  //       // console.log(item);
  //       // return;

  //       item.forEach(comb => {
  //         console.log(comb.nutraceuticals);
  //       });
  //     });
  //   }
  // }

  private filterWithBlacklist() {
    this.combinations.forEach((value, key) => {
      this.filteredCombinations.set(key, []);
      this.filteredRejectedCombinations.set(key, []);

      value.forEach((level, levelIndex) => {
        const rejected: RejectedCombinationsData[] = [];

        const newLevel = Object.values(level).filter(
          (comb: CombinationData) => {
            const { nutraceuticals } = comb;

            const found = nutraceuticals.find(nutraceutical => {
              // eslint-disable-next-line consistent-return
              this.blacklist.forEach(name => {
                if (nutraceutical && name === nutraceutical.Nutraceutico) {
                  return true;
                }
              });

              return false;
            });

            if (found)
              rejected.push({
                reason: `Blacklisted`,
                ...comb,
              });

            return !found;
          },
        );

        let tmpItem = this.filteredCombinations.get(key);
        // const tmpRejectedItem = this.filteredRejectedCombinations.get(key);

        // const currentRejected = this.rejectedCombinations.get(key);

        if (tmpItem) {
          tmpItem = [...tmpItem, ...newLevel];
          this.filteredCombinations.set(key, tmpItem);
        }

        // tmpRejectedItem.push([...currentRejected, ...rejected]);
        // this.filteredRejectedCombinations.set(key, tmpRejectedItem);
      });
    });

    // for (const [key, value] of this.combinations) {
    //   this.filteredCombinations.set(key, []);
    //   this.filteredRejectedCombinations.set(key, []);

    //   value.forEach((level, levelIndex) => {
    //     const rejected = [];

    //     const newLevel = level.filter(comb => {
    //       const found = comb.nutraceuticals.find(nutraceutical => {
    //         for (const name of this.#blacklist) {
    //           if (name == nutraceutical.Nutraceutico) {
    //             return true;
    //           }
    //         }

    //         return false;
    //       });

    //       if (found)
    //         rejected.push({
    //           reason: `Blacklisted`,
    //           ...comb,
    //         });

    //       return !found;
    //     });

    //     const tmpItem = this.filteredCombinations.get(key);
    //     const tmpRejectedItem = this.filteredRejectedCombinations.get(key);

    //     const currentRejected = this.rejectedCombinations.get(key)[levelIndex];

    //     tmpItem.push(newLevel);
    //     tmpRejectedItem.push([...currentRejected, ...rejected]);

    //     this.filteredCombinations.set(key, tmpItem);
    //     this.filteredRejectedCombinations.set(key, tmpRejectedItem);
    //   });
    // }
  }

  private getActiveCombinations() {
    this.settings.forEach(setting => {
      if (setting.level > 0 && setting.level <= 3) {
        const sub = this.filteredCombinations.get(setting.ID);
        const rsub = this.filteredRejectedCombinations.get(setting.ID);

        if (sub) {
          this.activeCombinations.set(setting.ID, sub[setting.level - 1]);
        }

        if (rsub) {
          this.activeRejectedCombinations.set(
            setting.ID,
            rsub[setting.level - 1],
          );
        }
      } else if (setting.level === 0) {
        this.activeCombinations.delete(setting.ID);
        this.activeRejectedCombinations.delete(setting.ID);
      }
    });
  }
}

export default CombinationsManager;
