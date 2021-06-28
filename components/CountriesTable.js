import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const orderBy = (countries, value, direction) => {
  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }
  if (direction === "desc") {
    return <ChevronDownIcon className="h-6 text-red-500" />;
  } else if (direction === "asc") {
    return <ChevronUpIcon className="h-6 text-red-500" />;
  } else {
    setDirection(null);
  }
};

function CountriesTable({ countries }) {
  const [direction, setDirection] = useState("desc");
  const [value, setValue] = useState("name");

  let orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction || direction === "asc") {
      setDirection("desc");
    } else {
      setDirection("asc");
    }
  };

  const setValueAndDirection = value => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className="flex p-3 ">
        <div className="flex items-center w-5/12">
          <div className="mr-1 text-2xl font-bold " onClick={() => setValueAndDirection("name")} cursor="pointer">
            Name
          </div>
          {value === "name" && <SortArrow direction={direction} />}
        </div>
        <div
          className="flex items-center justify-center flex-1 mr-4"
          onClick={() => setValueAndDirection("population")}>
          <p className="mr-1 text-2xl font-bold">Population</p>
          {value === "population" && <SortArrow direction={direction} />}
        </div>
        <div className="flex items-center justify-center flex-1 mr-4 " onClick={() => setValueAndDirection("area")}>
          <p className="mr-1 text-2xl font-bold">Area</p>
          {value === "area" && <SortArrow direction={direction} />}
        </div>
        <div className="flex items-center justify-center flex-1 mr-4" onClick={() => setValueAndDirection("gini")}>
          <p className="mr-1 text-2xl font-bold">Gini</p>
          {value === "gini" && <SortArrow direction={direction} />}
        </div>
      </div>
      {orderedCountries.map((c, index) => (
        <Link href={c?.alpha3Code} key={index}>
          <div className="flex p-3 mb-4 transition duration-300 transform bg-white rounded-md hover:-translate-y-1 hover:shadow-md dark:bg-gray-500">
            <Image src={c?.flag} alt={c.name} height={30} width={60} />
            <div className="w-5/12 ml-2">{c.name}</div>
            <div className="w-1/5 ">{c.population.toLocaleString("ru-RU") || 0}</div>
            <div className="w-1/5 text-center">{(+c.area).toLocaleString("ru-RU") || 0}</div>
            <div className="w-1/5 text-center">{c.gini || 0}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CountriesTable;
