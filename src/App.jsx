//data
import { data } from "./data/data";
//components
import Header from "./components/Header";
import Main from "./components/Main";
import MoodSelector from "./components/MoodSelector";
import MessageDisplay from "./components/MessageDisplay";
import MoodOptions from "./components/MoodOptions";
import Button from "./components/Button";
//util
import { getMessage } from "./utils/getMessage";
//react
import { useEffect, useState } from "react";

export default function App() {
  const [moods, setMoods] = useState(data.moodChecked);
  const [result, setResult] = useState(data.result);

  const handleChange = (e) => {
    e.target.checked
      ? setMoods((prev) => [...prev, e.target.id])
      : setMoods(moods.filter((id) => id !== e.target.id));
  };

  const handleClick = () => {
    localStorage.setItem("moods", JSON.stringify(moods));
    setResult(`Your moods - ${moods.toString().replace(",", " & ")}
      is saved!`);
  };

  useEffect(() => {
    if (moods.length === 1) {
      setResult(getMessage(moods[0]));
    } else if (moods.length === 2) {
      setResult(getMessage(moods.sort().join("_")));
    } else if (moods.length === 3 || moods.length === 4) {
      setResult("You're experiencing a complex feeling right now.");
    } else {
      setResult("I am here for you.");
    }
  }, [moods]);

  useEffect(() => {
    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  const handleLoad = () => {
    const storedMoods = JSON.parse(localStorage.getItem("moods"));
    setResult(
      `Hi, last time you feeled - ${storedMoods.toString().replace(",", " & ")}
      How are you feeling today?`
    );
  };

  return (
    <>
      <Header />
      <Main>
        <MoodSelector>
          <MoodOptions handleChange={handleChange} />
        </MoodSelector>
        <Button handleClick={handleClick}>Save</Button>
        <MessageDisplay>{result}</MessageDisplay>
      </Main>
    </>
  );
}
