
import React from 'react';


export default function Changelog(props) {

  const { apiChangelog } = props;

  function renderSwitch() {

    if (!apiChangelog) {
      return (
        <div>Loading...</div>
      );
    }

    if (!apiChangelog.logs) {
      return (
        <div>Error</div>
      );
    }

    return (

      <div className="pageContent-textLeft changelogPage">

        {apiChangelog.logs.map((log) => (
          <div key={log.version}>
            <h2>{log.version}</h2>

            {log.changes && log.changes.map((text) => (
              <li key={text}>
                -
                {' '}
                {text}
              </li>
            ))}

            {log.devChanges && log.devChanges.map((text) => (

              <li className="devLog" key={text}>
                {'- [maintenance] '}
                {text}
              </li>
            ))}
          </div>
        )).reverse()}

      </div>
    );
  }


  return (
    <>
      <h1>Changelog</h1>

      { renderSwitch() }
    </>
  );

}
