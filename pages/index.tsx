import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Head from "next/head";
import MainPanel from "../components/MainPanel";
import HistoryPanel from "../components/HistoryPanel";
import RelatedArticles from "../components/RelatedArticles";
import styles from "../styles/Home.module.css";

export default function Home(props: { data: [] }) {
  // const [data, setData] = useState([]);
  const [history, setHistory] = useState([]);
  const [results, setResults] = useState([]);

  // useEffect(() => {
  //   const url = "https://data.irozhlas.cz/hot-or-not-data/prez.json";
  //   fetch(url)
  //     .then(res => res.json())
  //     .then(data => {
  //       setData(data);
  //     });
  // }, []);

  useEffect(() => {
    const url =
      "https://datarozhlas.s3.eu-central-1.amazonaws.com/hot-or-not-results/darky-stats.json";
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setResults(data);
      });
  }, []);

  const greyStyle =
    history.length < 4 ? `grey${(history.length + 1) * 20}` : "grey100";

  return (
    <>
      <Head>
        <title>Co byste chtěli k Vánocům</title>
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
          content="https://data.irozhlas.cz/darek-or-not/"
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
      {props.data.length > 0 && (
        <div className={styles.container}>
          <Header text="Co by vás potěšilo víc?"></Header>
          <h3 className={styles.subtitle}>
            {history.length > 0
              ? `Vyberte další dárek`
              : "Klikněte na jeden z dárků"}
          </h3>
          <MainPanel
            data={props.data}
            history={history}
            setHistory={setHistory}
          ></MainPanel>
          <HistoryPanel
            data={props.data}
            history={history}
            results={results}
          ></HistoryPanel>
          <div className={styles.buttonContainer}>
            <Link href="/vysledky">
              <button className={`${styles.button} ${styles[greyStyle]}`}>
                Zobrazit výsledky hlasování<br></br>
                <span className={styles.buttonSmall}>
                  čtenářů a čtenářek iROZHLAS.cz
                </span>
              </button>
            </Link>
          </div>
          <div className={styles.text}>
            <p><strong>
              Datový tým Českého rozhlasu hledá vánoční dárky, které potěší každého. Můžete s tím pomoci minutou bezmyšlenkovitého klikání.
            </strong></p>
            <p>
              Vybrat blízkému člověku konkrétní dárek, který se nemusí líbit, nebo raději věnovat neosobní poukaz? Je pověst tvrdých hranatých balíčků jako těch hodnotnějších darů oprávněná? Příčí se nám přijímat o Vánocích hotovost či alkohol, nebo se na věc díváme pragmaticky? Odpovědi na otázky, jež vrtaly hlavou několika generacím, budeme znát ještě tento týden. Pomůže nám k nim stejný rozstřel jeden na jednoho, kterým jsme loni definitivně <a href="https://www.irozhlas.cz/zivotni-styl/vareni-jidlo/bramborovy-salat-ingredience-vysledky_2212220600_pek" target="_blank" className="odkaz">rozlouskli přijatelnost přísad do bramborových salátů</a>. Potřebujeme jenom chvíli vašeho času.

            </p>
            <p>
            V primitivní interaktivní aplikaci jednoduše klepnete na to, co byste sami dostali k Vánocům raději. Představte si, že vám to nadělí někdo z běžné skupiny lidí, se kterými si vyměňujete dárky. Nevíte však, kdo přesně. O konkrétní podobě dárku (jaký vzor má šála, ve kterých kinech platí kupon atd.) rozhoduje darující, pro vás to bude překvapení.
            </p>
            <p>
            Dárky pro srovnání jsme vybrali podle jednoduchých klíčů: jde o dary kupované, maximálně za vyšší stovky korun, nijak zvlášť originální, neberoucí v potaz pohlaví, koníčky ani například preferovaný způsob přepravy obdarovávaných. Nenajdete tedy mezi nimi zájezd k moři, akvarijní rybičky ani škrabku na auto. Předpokládáme však běžný životní styl - tedy že obdarovaní párkrát za rok vyrazí za kulturou či sportem nebo se občas napijí alkoholu.
            </p>
            <p><em>Ilustrační obrázky jsme vygenerovali ve Stable Diffusion, po kterém jsme chtěli ilustrace ve stylu východoevropského grafického designu 60. let.</em></p>
          </div>
          <RelatedArticles tag={85699} name={"Vánocích"}></RelatedArticles>
        </div>
      )}
    </>
  );
}

export async function getStaticProps() {
  const data = await fetch(
    "https://data.irozhlas.cz/hot-or-not-data/darky.json"
  ).then(res => res.json());
  return {
    props: {
      data: data.filter((item: { use: boolean }) => item.use),
    },
  };
}
