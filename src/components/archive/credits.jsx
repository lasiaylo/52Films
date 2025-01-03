import { isEmpty } from "../../util/StringUtil";
import React from "react";
import "../../styles/credits.sass";

export default function Credits({ film, setSelected }) {
  try {
    const { credits } = film;
    // const credits = Array.from({
    //     length: 30
    // }, () => film.credits).flat();
    const text = credits.map((line, i) => {
      if (isEmpty(line)) {
        return null;
      }
      let [role, member] = line.trim().split(":");
      role = `${role.trim()}: `;
      member = member.trim();
      return (
        <div
          className={"creditPair"}
          id={`credit pair ${i}`}
          key={`credit pair ${i}`}
        >
          <span key={`role${i}`}>{role}</span>
          <span key={`member${i}`} className={"name"}>
            {member}
          </span>
        </div>
      );
    });
    return (
      <div className={"creditContainer"} onClick={() => setSelected()}>
        <div className={"credits"}>
          <ul className={"creditsList"}>{text}</ul>
        </div>
      </div>
    );
  } catch {
    return null;
  }
}
