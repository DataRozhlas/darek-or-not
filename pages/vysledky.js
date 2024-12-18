import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import ResultsPanel from "../components/ResultsPanel";
import RelatedArticles from "../components/RelatedArticles";
import Link from "next/link";
import Head from "next/head";

export default function Vysledky(props) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const url =
      "https://datarozhlas.s3.eu-central-1.amazonaws.com/hot-or-not-results/cukrovi-stats.json";
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setResults(data);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Nejoblíbenější vánoční cukroví</title>
        <meta
          key="share-image"
          property="og:image"
          content="https://www.irozhlas.cz/sites/default/files/styles/zpravy_facebook/public/uploader/screenshot_2023-12-1_231211-145214_pek.png?itok=jFPMfLNa"
        />
        <meta
          property="og:title"
          content="Ponožky, nebo knihu? Pomozte nám zjistit, co kdo doopravdy chce pod stromeček"
        />
        <meta
          property="og:url"
          content="https://data.irozhlas.cz/cukrovi-or-not/"
        />
        <meta
          property="og:description"
          content={
            "Datový tým Českého rozhlasu hledá vánoční dárky, které potěší každého. Můžete s tím pomoci minutou bezmyšlenkovitého klikání."
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@irozhlascz" />
        <meta name="twitter:creator" content="@datarozhlas" />
        <meta
          name="twitter:title"
          content="Ponožky, nebo knihu? Pomozte nám zjistit, co kdo doopravdy chce pod stromeček"
        />
        <meta
          name="twitter:image"
          content="https://www.irozhlas.cz/sites/default/files/styles/zpravy_twitter/public/uploader/screenshot_2023-12-1_231211-145214_pek.png?itok=nRNn6Te9"
        />
        <meta
          name="twitter:description"
          content="Datový tým Českého rozhlasu hledá vánoční dárky, které potěší každého. Můžete s tím pomoci minutou bezmyšlenkovitého klikání."
        />
      </Head>

      <div className={styles.container}>
        <Header text="Nejoblíbenější vánoční cukroví"></Header>
        <div className={styles.buttonContainer}>
          <Link href="/">
            <button className={styles.button}>Zpět k hlasování</button>
          </Link>
        </div>
        <h3 className={`${styles.subtitle} ${styles.moveup}`}>
          Kliknutím na cukroví zobrazíte podrobnosti
        </h3>
        <ResultsPanel
          results={results}
          dativ={false}
          data={props.data}
        ></ResultsPanel>
        <RelatedArticles tag={85699} name={"Vánocích"}></RelatedArticles>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const data = await fetch(
    "https://data.irozhlas.cz/hot-or-not-data/cukrovi.json"
  ).then(res => res.json());
  return {
    props: {
      data: data.filter(item => item.use),
    },
  };
}
