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
      "https://datarozhlas.s3.eu-central-1.amazonaws.com/hot-or-not-results/cukrovi-stats.json";
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
        <title>Nejoblíbenější vánoční cukroví</title>
        <meta
          key="share-image"
          property="og:image"
          content="https://www.irozhlas.cz/sites/default/files/styles/zpravy_facebook/public/uploader/screenshot_2024-12-1_241219-234114_pek.png?itok=FdXCRKfD"
        />
        <meta
          property="og:title"
          content="Perníčky, linecké, nebo pracny? Pomozte seřadit vánoční cukroví podle oblíbenosti"
        />
        <meta
          property="og:url"
          content="https://data.irozhlas.cz/cukrovi-or-not/"
        />
        <meta
          property="og:description"
          content={
            "V máslovém oktagonu se rozhodne o šampionovi patrových podnosů. Přispěje k tomu minuta vašeho bezmyšlenkovitého klikání."
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@irozhlascz" />
        <meta name="twitter:creator" content="@datarozhlas" />
        <meta
          name="twitter:title"
          content="Perníčky, linecké, nebo pracny? Pomozte seřadit vánoční cukroví podle oblíbenosti"
        />
        <meta
          name="twitter:image"
          content="https://www.irozhlas.cz/sites/default/files/styles/zpravy_twitter/public/uploader/screenshot_2024-12-1_241219-234114_pek.png?itok=f7-oFhzw"
        />
        <meta
          name="twitter:description"
          content="V máslovém oktagonu se rozhodne o šampionovi patrových podnosů. Přispěje k tomu minuta vašeho bezmyšlenkovitého klikání."
        />
      </Head>
      {props.data.length > 0 && (
        <div className={styles.container}>
          <Header text="Co si radši dáte?"></Header>
          <h3 className={styles.subtitle}>
            {history.length > 0
              ? `Vyberte další cukroví`
              : "Klikněte na jeden druh cukroví"}
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
              V máslovém oktagonu se rozhodne o šampionovi patrových podnosů. Přispěje k tomu minuta vašeho bezmyšlenkovitého klikání.
            </strong></p>
            <p>
              Datový tým Českého rozhlasu už vyřešil dvě ze tří největších vánočních záhad. S pomocí vás, čtenářů a čtenářek serveru iROZHLAS.cz, předloni zjistil, že <a className={styles.underlined} href="https://www.irozhlas.cz/zivotni-styl/vareni-jidlo/bramborovy-salat-ingredience-vysledky_2212220600_pek" target="_blank">čára oddělující přijatelné přísady do bramborových salátů od nepřijatelných</a> leží zhruba mezi celerem a tatarkou. Loni pak z podobného rozstřelu vzešel <a className={styles.underlined} href="https://www.irozhlas.cz/ekonomika/vanoce-darky-co-si-preji-cesi-data-anketa_2312210600_ksp" target="_blank">nejvděčnější vánoční dárek</a>, což je kniha či poukaz do knihkupectví, i dárek nejproblematičtější, tedy štěně. Zbývá zodpovědět otázku poslední: které cukroví nám chutná nejvíc?
            </p>
            <p>
              Data opět sbíráme jednoduchým systémem <em>hot or not</em>. Dokud vás to nepřestane bavit, vybírejte níže ze dvou cukroví to, po kterém byste sáhli raději. Neřešte při tom ceny surovin ani pracnost přípravy – pouze se krmte.
            </p>
            <p><em>Autorkami fotografií jsou Zuzana Jarolímková, Marie Starostová a Marcela Bočková.</em></p>
          </div>
          <RelatedArticles tag={85699} name={"Vánocích"}></RelatedArticles>
        </div>
      )}
    </>
  );
}

export async function getStaticProps() {
  const data = await fetch(
    "https://data.irozhlas.cz/hot-or-not-data/cukrovi.json"
  ).then(res => res.json());
  return {
    props: {
      data: data.filter((item: { use: boolean }) => item.use),
    },
  };
}
