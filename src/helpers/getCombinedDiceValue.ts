import { Dice, isDice } from "../types/Dice";
import { Die } from "../types/Die";
import { isDie } from "../types/Die";

import { useDiceControlsStore } from "../controls/store";
import { useDiceRollStore } from "../dice/store";
import { generateDiceId } from "./generateDiceId";
import { DiceRoll } from "../types/DiceRoll";

const TO_HIT_STYLE = "GLASS"
const DMG_STYLE = "SUNSET"

/**
 * Check if the dice is a classical D100 roll with a D100
 * for the 10s unit and a D10 for the single digit.
 * If it is return the combined result.
 */
function checkD100Combination(
  dice: Dice,
  values: Record<string, number>
): number | null {
// ): number | string | null {
  const bonus = dice.bonus || 0;
  if (
    dice.dice.length === 2 &&
    (dice.combination === undefined || dice.combination === "SUM")
  ) {
    const d1 = dice.dice[0];
    const d2 = dice.dice[1];
    if (isDie(d1) && isDie(d2) && d1.type === "D100" && d2.type === "D10") {
      const v1 = values[d1.id];
      const v2 = values[d2.id];
      if (v1 !== undefined && v2 !== undefined) {
        if (v1 === 0 && v2 === 0) {
          return 100 + bonus;
        } else {
          return v1 + v2 + bonus;
        }
      }
    }
  }
  return null;
}

const countOccurrences = (arr: any[], val: any) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

/**
 * Recursively get the final result for a roll of dice
 * @param dice
 * @param values A mapping of Die ID to their rolled value
 * @returns
 */
export function getCombinedDiceValue(
  dice: Dice,
  values: Record<string, number>,
  flipped: boolean | undefined,
): number | null {
// ): number | string | null {
  const d100Value = checkD100Combination(dice, values);
  if (d100Value !== null) {
    return d100Value;
  }

  let currentValues: number[] = [];
  let currentValuesToHit: number[] = [];
  let currentValuesDmg: number[] = [];

  console.log()

  for (const dieOrDice of dice.dice) {
    if (isDie(dieOrDice)) {
      const value = values[dieOrDice.id];
      if (value !== undefined) {
        if (value === 0 && dieOrDice.type === "D10") {
          // dieOrDice.style
          if (dieOrDice.style === TO_HIT_STYLE){
            currentValuesToHit.push(10)
          } else if (dieOrDice.style === DMG_STYLE){
            currentValuesDmg.push(10)
          } else {
            currentValues.push(10)
          }
        } else {
          if (dieOrDice.style === TO_HIT_STYLE){
            currentValuesToHit.push(value)
          } else if (dieOrDice.style === DMG_STYLE){
            currentValuesDmg.push(value)
          } else {
            currentValues.push(value)
          }
        }
      }
    // } else if (isDice(dieOrDice)) {
    //   const value = getCombinedDiceValue(dieOrDice, values, flipped);
    //   if (value !== null) {
    //     // currentValues.push(value);
    //   }
    }
  }

  let output: string = "";
  let res: number = -1

  // if (!(currentValues.length === 0)){
  //   output += "Skill: ";
  //   if (flipped){
  //     res = Math.min(...currentValues);
  //   } else {
  //     res = Math.max(...currentValues);
  //   }
  //   output += res
  //   if(res === 10 || res == 1){
  //     output += "!"
  //   }
  //   output += "\n";
  // }
  // if (!(currentValuesToHit.length === 0)){
  //   output += "Attack: ";
  //   if (flipped){
  //     res = Math.min(...currentValuesToHit);
  //   } else {
  //     res = Math.max(...currentValuesToHit);
  //   }
  //   output += res
  //   if(res === 10){
  //     output += "!"
  //     // START BONUS DIE ROLL LOGIC
  //     // let firstRoll = useDiceRollStore((state) => state.firstThrow)
  //     // if (firstRoll){
  //     //   useDiceRollStore((state) => state.firstThrow = false)
  //     //   firstRoll = false
  //     //   const newId = generateDiceId()
  //     //   const newDie: Die = {id: newId, style: DMG_STYLE, type: "D10"}
  //     //   // const cddice = useDiceRollStore((state) => state.roll?.dice)
  //     //   // if(cddice){
  //     //   //   const ddice: (Die | Dice)[] = cddice.concat(newDie)
  //     //   //   const droll: DiceRoll = {dice: ddice}
  //     //     // useDiceRollStore((state) => state.roll = droll)
  //     //     const addDie =  useDiceRollStore((state) => state.addDie);
  //     //     const reroll = useDiceRollStore((state) => state.reroll);
  //     //     addDie(newDie)
  //     //     // console.log("a")
  //     //     reroll([newId])
  //     //   // }
  //     // }
  //     // END BONUS DICE ROLL LOGIC
  //   }
  //   output += "\n"
  // }
  // if (!(currentValuesDmg.length === 0)){
  //   output += "Damage: ";
  //   if (flipped){
  //     res = Math.min(...currentValuesDmg);
  //   } else {
  //     res = Math.max(...currentValuesDmg);
  //   }
  //   output += res;
  //   if(res === 10){
  //     output += "!";
  //     var occ = countOccurrences(currentValuesDmg, 10);
  //     if(occ > 0){
  //       output += "\n+";
  //       output += occ.toString();
  //       if(occ === 1){
  //         output += " Extra Wound!";
  //       } else{
  //         output += " Extra Wounds!";
  //       }
  //     }
  //   }
  // }

  if (flipped){
    return Math.min(...currentValues);
  } else {
    return Math.max(...currentValues);
  }

  // return output;
}
