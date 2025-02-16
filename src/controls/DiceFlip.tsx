import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import HiddenOnIcon from "@mui/icons-material/VisibilityOffRounded";
import HiddenOffIcon from "@mui/icons-material/VisibilityRounded";
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';

import { useDiceControlsStore } from "./store";
import { useDiceRollStore } from "../dice/store";

export function DiceFlip() {
  const flipped = useDiceControlsStore((state) => state.diceFlipped);
  const toggleDiceFlipped = useDiceControlsStore(
    (state) => state.toggleDiceFlipped
  );

  const clearRoll = useDiceRollStore((state) => state.clearRoll);
  const roll = useDiceRollStore((state) => state.roll);
  function clearRollIfNeeded() {
    if (roll) {
      clearRoll();
    }
  }

  return (
    <Tooltip
    // title={hidden ? "Set Disadvantage" : "Set Advantage"}
    title={flipped ? "Set Advantage" : "Set Disadvantage"}
    placement="top"
      disableInteractive
    >
      <IconButton
        onClick={() => {
          toggleDiceFlipped();
          clearRollIfNeeded();
        }}
      >
        {flipped ? <ArrowDownwardRoundedIcon /> : <ArrowUpwardRoundedIcon />}
      </IconButton>
    </Tooltip>
  );
}
