//data
import { data } from "./data/data";
//components
import Header from "./components/Header";
import Main from "./components/Main";
import MoodCheckbox from "./components/MoodCheckbox";
import MessageDisplay from "./components/MessageDisplay";
import MoodOptions from "./components/MoodOptions";
import ButtonContainer from "./components/ButtonContainer";
import Button from "./components/Button";
//util
import { getMessage } from "./utils/getMessage";
//context
import { useTheme } from "./context/ThemeContext";
//react
import { useEffect, useState } from "react";

/**
 1. Remove item isn't working.
 2. Button active effect is bad
 */

export default function App() {
  const [moods, setMoods] = useState(data.moodChecked);
  const [result, setResult] = useState(data.result);
  const [isLoading, setIsLoading] = useState(true);
  const { moodTheme, setMoodTheme } = useTheme();

  /** handlers */

  //  save checkbox options to moods state
  const handleChange = (e) => {
    const { checked, id } = e.target;
    setMoods((prev) =>
      checked ? [...prev, e.target.id] : prev.filter((mood) => mood !== id)
    );
  };

  // uncheck all the checkboxes / moods
  const unCheckAll = () => {
    setMoods([]);
  };

  // save moods to local storage
  const handleSave = () => {
    if (moods.length !== 0) {
      localStorage.setItem("moods", JSON.stringify(moods));
      setResult(
        `Saving your mood(s) - 
      ${moods.toString().replaceAll(",", " & ")}⏳`
      );
      setTimeout(() => {
        unCheckAll();
      }, 2000);
    } else {
      setResult("Please select at least one mood✅");
    }
  };

  // load saved moods
  const handleLoad = () => {
    const storedMoods = JSON.parse(localStorage.getItem("moods"));
    setIsLoading(false);
    setResult(
      storedMoods
        ? `Hi, last time you felt - ${storedMoods.toString().replaceAll(",", " & ")}.
      How are you feeling today?`
        : `How are you feeling today?`
    );
  };

  // remove saved moods
  const handleRemove = () => {
    const storedMoods = JSON.parse(localStorage.getItem("moods"));
    if (!storedMoods) {
      setResult("You don't have any saved moods");
      setTimeout(() => {
        setResult("I am here for you");
      }, 2000);
    } else {
      setResult(
        `Removing your saved mood(s) - ${storedMoods.toString().replaceAll(",", " & ")}`
      );
      localStorage.removeItem("moods");
    }
    setTimeout(() => {
      unCheckAll();
    }, 2000);
  };

  /** logic */

  // get a random message for different mood(s), also set the background color
  useEffect(() => {
    let moodKey = "";
    if (moods.length === 1) {
      moodKey = moods[0];
      setResult(getMessage(moodKey));
    } else if (moods.length === 2) {
      moodKey = moods.sort().join("_");
      setResult(getMessage(moodKey));
    } else if (moods.length === 3) {
      moodKey = "three-moods";
      setResult("You're experiencing a complex feeling right now.");
    } else if (moods.length === 4) {
      moodKey = "four-moods";
      setResult("Please make an appointment with a psychologist.");
    } else {
      setResult("I am here for you.");
    }
    setMoodTheme(moodKey);
  }, [moods]);

  // when the window reloaded, it will show the old moods
  useEffect(() => {
    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  // change the body background color
  useEffect(() => {
    document.body.className = moodTheme;
  });

  return (
    <>
      <Header />
      <Main>
        <MoodCheckbox>
          <MoodOptions checkedMoods={moods} handleChange={handleChange} />
        </MoodCheckbox>
        <ButtonContainer>
          <Button style="btn-remove" handleClick={handleRemove}>
            Remove
          </Button>
          <Button style="btn-save" handleClick={handleSave}>
            Save
          </Button>
        </ButtonContainer>
        <MessageDisplay>{!isLoading ? result : "Loading..."}</MessageDisplay>
      </Main>
    </>
  );
}
