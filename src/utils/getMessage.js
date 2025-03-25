/**
 *Get message from the message array
 * @param {string} [str="happy"] string to find the message in data
 * @returns {string} a random message from the message data
 */
import { data } from "../data/data";

export const getMessage = (str = "") => {
  if (!str) return "I am here for you.";
  return data.moodMessages[str][
    Math.floor(Math.random() * data.moodMessages[str].length)
  ];
};
