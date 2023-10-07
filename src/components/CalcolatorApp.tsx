import AddNewRow from "./AddNewRow";
import Result from "./Result";
import RowList from "./RowList";
import Title from "./Title";

export default function CalcolatorApp() {
  return (
    <div className="box-border flex justify-center w-full h-screen p-8 overflow-hidden md:p-20 pt-44">
      <div className="flex flex-col items-center sm:items-start gap-x-11 md:flex-row gap-y-11">
        <div className="flex flex-col items-center gap-y-6">
          <Title />
          <AddNewRow />
          <Result />
        </div>

        <RowList />
      </div>
    </div>
  );
}
