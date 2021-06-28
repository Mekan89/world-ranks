import { SearchIcon } from "@heroicons/react/outline";
import { useState } from "react";
import CountriesTable from "../components/CountriesTable";
import Layout from "../components/Layout";

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
      <p className="text-xl font-bold text-center">Found {countries.length} countries</p>

      <label className="flex p-1 m-3 bg-white border-2 border-transparent rounded-md shadow-lg focus-within:border-blue-400 dark:bg-gray-500">
        <SearchIcon className="h-6 text-gray-500 pointer-events-none dark:text-white" />
        <input
          className="w-full px-3 text-gray-500 bg-white outline-none text-md dark:bg-gray-500"
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
