import React, { useEffect, useState } from "react";
import { Button } from "./@/components/ui/button";
import { Input } from "./@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./@/components/ui/select";
import { IRow, SignType } from "./interfaces/row";
import { useAtom, useAtomValue } from "jotai";
import { RowsAtom } from "./atoms/atom";

export default function RowList() {
  const rows = useAtomValue(RowsAtom);

  if (rows.length === 0) return;

  return (
    <div className="flex flex-col items-center gap-y-6 max-h-[400px] overflow-y-scroll rounded-md shadow-sm border border-gray-200 p-3">
      <ul className="flex flex-col gap-y-5 ">
        {rows.map((row: IRow) => (
          <Row key={row.id} {...row} />
        ))}
      </ul>
    </div>
  );
}

function Row(row: IRow) {
  const [, setRows] = useAtom(RowsAtom);
  const [inputValue, setInputValue] = useState<string>("0");

  const handlerDisabled = () => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id === row.id) {
          return {
            ...r,
            disabled: !row.disabled,
          };
        }
        return r;
      })
    );
  };

  const handleRemove = () => {
    setRows((prev) =>
      prev.filter((r) => {
        return r.id !== row.id;
      })
    );
  };

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setRows((prev) =>
        prev.map((r) => {
          if (r.id === row.id) {
            return {
              ...r,
              value: inputValue.length === 0 ? 0 : parseFloat(inputValue),
            };
          }
          return r;
        })
      );
    }, 400);
    console.log("render");
    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue]);

  return (
    <div className="flex flex-wrap items-center sm:flex-nowrap gap-x-3 gap-y-4">
      <div className="flex items-center flex-grow w-full gap-x-3">
        <Select
          disabled={row.disabled}
          onValueChange={(e: SignType) => {
            setRows((prev) =>
              prev.map((r) => {
                if (r.id === row.id) {
                  return {
                    ...r,
                    sign: e,
                  };
                }
                return r;
              })
            );
          }}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="+" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="+">+</SelectItem>
            <SelectItem value="-">-</SelectItem>
          </SelectContent>
        </Select>

        <Input
          disabled={row.disabled}
          placeholder="0"
          value={inputValue}
          type="number"
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className="flex items-center w-full sm:w-fit gap-x-3">
        <Button
          disabled={row.disabled}
          onClick={handleRemove}
          className="w-full sm:w-[100px]"
        >
          Delete
        </Button>
        <Button className="w-full sm:w-[100px]" onClick={handlerDisabled}>
          {row.disabled ? "Activate" : "Disable"}
        </Button>
      </div>
    </div>
  );
}
