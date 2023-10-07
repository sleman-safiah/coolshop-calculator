import React from "react";
import { Button } from "./@/components/ui/button";
import { useAtom } from "jotai";
import { RowsAtom } from "./atoms/atom";
import { nanoid } from "nanoid";

export default function AddNewRow() {
  const [rows, setRows] = useAtom(RowsAtom);

  return (
    <div className="flex items-center justify-end w-full">
      <Button
        className="w-full px-10 py-6"
        onClick={() => {
          setRows([
            ...rows,
            { id: nanoid(), sign: "+", value: 0, disabled: false },
          ]);
        }}
      >
        Add Row
      </Button>
    </div>
  );
}
