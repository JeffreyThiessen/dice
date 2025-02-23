import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import PlusOneRoundedIcon from '@mui/icons-material/PlusOneRounded';
import CasinoRoundedIcon from '@mui/icons-material/CasinoRounded';

import { useDiceControlsStore } from "./store";
import { useDiceRollStore } from "../dice/store";
import { generateDiceId } from "../helpers/generateDiceId";
import { Die } from "../types/Die";

const DMG_STYLE = "SUNSET"

export function DiceAdd() {
  const firstRoll = useDiceRollStore((state) => state.firstThrow)
  const setFirstRoll = useDiceRollStore((state) => state.setFirstRoll)
  const addDie = useDiceRollStore((state) => state.addDie);
  const reroll = useDiceRollStore((state) => state.reroll);

  return (
    <Tooltip
    title="Add Extra Damage Die"
    placement="top"
      disableInteractive
    >
      <IconButton
        onClick={() => {
          if (firstRoll){
            setFirstRoll(false)
            const newId = generateDiceId()
            const newDie: Die = {id: newId, style: DMG_STYLE, type: "D10"}
            addDie(newDie)
            reroll([newId])
          }
        }}
      >
        <PlusOneRoundedIcon />
        <CasinoRoundedIcon />
      </IconButton>
    </Tooltip>
  );
}
