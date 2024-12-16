import React, { useState, useLayoutEffect } from "react";
import Item from "./Item";
import styles from "../styles/MainPanel.module.css";
import { useRouter } from "next/router";

const pickRandomCandidates = (candidates, prevCandidates) => {
  const prevCandidatesIDs = prevCandidates.map(c => [c[0], c[1]]);
  let result;
  let candidate1;
  let candidate2;

  do {
    //pick random candidate
    candidate1 = candidates[Math.floor(Math.random() * candidates.length)];
    candidate2 = candidates[Math.floor(Math.random() * candidates.length)];
    result = [candidate1, candidate2];
  } while (
    candidate1.id === candidate2.id ||
    prevCandidatesIDs.some(
      item => item.includes(candidate1.id) && item.includes(candidate2.id)
    )
  );
  if (prevCandidatesIDs.length > 0) {
    // console.log(result[0], prevCandidatesIDs[prevCandidatesIDs.length - 1][0]);
    if (
      result[0].id === prevCandidatesIDs[prevCandidatesIDs.length - 1][0] ||
      result[1].id === prevCandidatesIDs[prevCandidatesIDs.length - 1][1]
    ) {
      return result.reverse();
    }
  }
  return result;
};


const MainPanel = props => {
  const router = useRouter();
  const [candidates, setCandidates] = useState([props.data[0], props.data[1]]);
  const [sex, setSex] = useState("all");
  const [age, setAge] = useState("all");
  let lastClickTime = Date.now();

  const handleSexChange = (e) => {
    setSex(e.target.id);
  }

  const handleAgeChange = (e) => {
    setAge(e.target.id);
  }

  const buttonClickHandler = candidate => {
    if (Date.now() - lastClickTime > 0) {
      // save tip to dynamodb
      const http = new XMLHttpRequest();
      const url =
        "https://2sc7lqahghwdegw3ke7pctis7i0twier.lambda-url.eu-central-1.on.aws/";
      http.open("POST", url);
      http.send(
        JSON.stringify({
          appID: "darky",
          winnerID: candidate.id,
          loserID: candidates.filter(c => c.id !== candidate.id)[0].id,
          url: document.URL,
          ref: document.referrer,
          draw: false,
          age: age,
          sex: sex
        })
      );
    }
    if (
      props.history.length ===
      (props.data.length ** 2 - props.data.length) / 2 - 1
    ) {
      router.push("/vysledky");
    } else {
      props.setHistory(prevState => {
        return [
          ...prevState,
          [candidates[0].id, candidates[1].id, candidate.id],
        ];
      });

      lastClickTime = Date.now();
    }
  };

  useLayoutEffect(() => {
    setCandidates(pickRandomCandidates(props.data, props.history));
  }, [props.data, props.history]);

  return (
    <main>
      <div className={styles.container}>
        <Item
          candidate={candidates[0]}
          buttonClickHandler={buttonClickHandler}
        ></Item>
        <Item
          candidate={candidates[1]}
          buttonClickHandler={buttonClickHandler}
        ></Item>
      </div>
      <div className={styles.infoContainer}>

        <fieldset className={styles.radioContainer}>
          <legend>Jste</legend>
          <div>
            <input className={styles.input} type="radio" id="f" name="sex" value="f" onClick={handleSexChange} />
            <label htmlFor="f" >žena</label>
          </div>
          <div>
            <input className={styles.input} type="radio" id="m" name="sex" value="f" onClick={handleSexChange} />
            <label htmlFor="m">muž</label>
          </div>
        </fieldset>
        <fieldset className={styles.radioContainer}>
          <legend>Je vám</legend>
          <div className={styles.inputOption}>
            <input className={styles.input} type="radio" id="a1" name="age" value="a20" onClick={handleAgeChange} />
            <label>míň než&nbsp;25&nbsp;let</label>
          </div>
          <div className={styles.inputOption}>
            <input className={styles.input} type="radio" id="a2" name="age" value="a40" onClick={handleAgeChange} />
            <label>25&nbsp;-&nbsp;40</label></div>
          <div className={styles.inputOption}>
            <input className={styles.input} type="radio" id="a3" name="age" value="a60" onClick={handleAgeChange} />
            <label>41&nbsp;-&nbsp;65</label></div>
          <div className={styles.inputOption}>
            <input className={styles.input} type="radio" id="a4" name="age" value="a60" onClick={handleAgeChange} />
            <label>přes 65&nbsp;let</label></div>
        </fieldset>

        <div>
          <em><small>Pro kvalitnější vyhodnocení odpovědí se prosím zařaďte do základních populačních skupin. Vaše osobní data se nikde neukládají.</small></em>

        </div>

      </div>

    </main>
  );
};

export default MainPanel;
