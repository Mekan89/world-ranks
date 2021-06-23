import CountriesTable from "../components/CountriesTable";
import { useState } from "react";
import Layout from "../components/Layout";
import { SearchIcon } from "@heroicons/react/outline";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const filteredCountries = countries.filter(
    country =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  return (
    <Layout>
      <p className="font-bold text-center text-xl">Found {countries.length} countries</p>

      <label className="flex shadow-lg p-1 rounded-md bg-white m-3 border-2 border-transparent focus-within:border-blue-400">
        <SearchIcon className="text-gray-500 pointer-events-none h-6" />
        <input
          className="w-full px-3 text-md outline-none text-gray-500"
          type="search"
          placeholder="filter by name, region"
          value={keyword}
          onChange={e => setKeyword(e.target.value.toLowerCase())}
        />
      </label>
      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
