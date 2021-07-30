
import React from 'react';

import image from '../assets/crypto-assistant-icon.jpg';


export default function Commands(props) {

  const { apiCommands } = props;

  function renderSwitch() {

    if (!apiCommands) {
      return (
        <div>Loading...</div>
      );
    }

    if (!apiCommands.commands) {
      return (
        <div>Error</div>
      );
    }

    return (
      <div className="pageContent-textLeft">

        {apiCommands.commands.map((command) => (
          <div className="commandItem">
            <h3>
              /
              {command.name}
            </h3>

            <p>
              {command.description}
            </p>

            {command.options && (
            <p>
              <b>Options:</b>

              <div className="optionText">

                {command.options.map((option) => (

                  <li>
                    {option.required && (
                    <div className="label">
                      required
                    </div>
                    )}

                    <code>
                      <b>{option.name}</b>
                      :
                      {' '}
                      {option.description}
                    </code>
                  </li>

                ))}
              </div>
            </p>
            )}

          </div>
        ))}

      </div>

    );
  }

  return (
    <>
      <h1>Crypto assistant</h1>

      <img src={image} width={128} alt="Crypto assistant icon" />

      <p>
        The crypto assistant serves as an interface for your bot via Discord commands.
      </p>

      <h2>Commands</h2>

      {renderSwitch()}

    </>
  );

}
