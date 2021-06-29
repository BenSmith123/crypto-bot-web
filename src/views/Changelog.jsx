
import React from 'react';


export default function Changelog(props) {

  const { apiChangelog } = props;

  return (
    <>

      <h1>Changelog</h1>

      { !apiChangelog
        ? <div>loading...</div>
        : (
          <div className="pageContent-textLeft">

            {apiChangelog.logs.map((log) => (
              <>
                <h2>{log.version}</h2>

                {!log.changes || log.changes.map((a) => (
                  <li>
                    -
                    {' '}
                    {a}
                  </li>
                ))}

                {!log.devChanges || log.devChanges.map((a) => (

                  <li>
                    <b>{'- [maintenance] '}</b>
                    {a}
                  </li>
                ))}
              </>
            ))}

          </div>
        )}
    </>
  );

}
