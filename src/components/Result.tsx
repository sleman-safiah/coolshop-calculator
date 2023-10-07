import { useAtomValue } from "jotai";
import React, { useMemo } from "react";
import { RowsAtom } from "./atoms/atom";

export default function Result() {
  const rows = useAtomValue(RowsAtom);

  console.log(rows);
  const result = useMemo(() => {
    return rows
      .filter((row) => !row.disabled)
      .reduce(
        (acc, curr) => acc + (curr.sign === "-" ? -1 : 1) * curr.value,
        0
      );
  }, [rows]);

  return (
    <div className="flex items-center justify-center w-full h-12 text-gray-600 border rounded-md shadow-sm botder-gray-300">
      {Math.abs(Math.floor(result) - result) < 0.0000001
        ? result.toFixed(0)
        : result.toFixed(2)}
    </div>
  );
}
