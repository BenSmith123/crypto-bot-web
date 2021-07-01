
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

      <div className="pageContent-textLeft">

        {apiChangelog.logs.map((log) => (
          <>
            <h2>{log.version}</h2>

            {log.changes && log.changes.map((a) => (
              <li>
                -
                {' '}
                {a}
              </li>
            ))}

            {log.devChanges && log.devChanges.map((a) => (

              <li>
                <b>{'- [maintenance] '}</b>
                {a}
              </li>
            ))}
          </>
        ))}

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
