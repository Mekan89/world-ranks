import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const getCountry = async item => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${item}`);
  const country = await res.json();
  return country;
};

const Country = ({ country }) => {
  const [borders, setBorders] = useState([]);

  const getBorders = async () => {
    const borders = await Promise.all(country.borders?.map(item => getCountry(item)));
    setBorders(borders);
  };

  useEffect(() => {
    getBorders();
  }, []);

  return (
    <Layout title={country.name}>
      <div>
        <div className="p-5 bg-white rounded-md shadow-md dark:bg-gray-500">
          <div className="text-center">
            {country.flag?.length > 0 && <Image src={country.flag} alt={country.name} width={600} height={300} />}
          </div>
          <h1 className="mt-2 text-4xl text-center">{country.name}</h1>
          <div className="mt-1 mb-6 text-center">{country.region}</div>
          <div className="flex text-center justify-evenly">
            <div>
              <div>{country?.population?.toLocaleString() || 0}</div>
              <div className="font-bold">Population</div>
            </div>

            <div>
              <div>{(+country?.area)?.toLocaleString() || 0}</div>
              <div className="font-bold">
                Area (km<sup>2</sup>)
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 mt-4 bg-white rounded-md shadow-md dark:bg-gray-500">
          <h4 className="font-bold">Details :</h4>

          <div className="flex justify-between py-4 border-b-2">
            <div>Capital</div>
            <div>{country.capital}</div>
          </div>

          <div className="flex justify-between py-4 border-b-2">
            <div>Languages</div>
            <div>{country.languages?.map(({ name }) => name).join(", ")}</div>
          </div>

          <div className="flex justify-between py-4 border-b-2">
            <div>Currencies</div>
            <div>{country.currencies?.map(({ name }) => name).join(", ")}</div>
          </div>

          <div className="flex justify-between py-4 border-b-2">
            <div>Native name</div>
            <div>{country.nativeName}</div>
          </div>

          <div className="flex justify-between pt-3">
            <div>Gini</div>
            <div>{country.gini || 0} %</div>
          </div>

          <div className="mt-6 font-bold text-center">Neighboring Countries</div>
          <div className="grid grid-cols-3">
            {borders?.map(({ flag, name }) => (
              <div className="p-3">
                {flag.length > 0 && <Image src={flag} width={250} height={120} alt={name} />}
                <p className="text-center">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

// fetch data on server side before render the page to client
export const getServerSideProps = async ({ params }) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${params.id}`);
  const country = await res.json();
  return {
    props: { country },
  };
};
