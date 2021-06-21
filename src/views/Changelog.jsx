

import React from 'react';

import { logs } from '../data/changelog.json';

export default function Changelog() {

  return (
    <>

      <h1>Changelog</h1>

      <div className="pageContent-textLeft">

        {logs.reverse().map((log) => (
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

    </>
  );

}
