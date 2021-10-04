
import React from 'react';

import Loader from '../components/Loader';
import { LabelOrange } from '../components/Label';
import image from '../assets/crypto-assistant-icon.jpg';


export default function Commands(props) {

  const { apiCommands } = props;

  function renderSwitch() {

    if (!apiCommands) {
      return (
        <Loader />
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
          <div className="commandItem" key={command.name}>
            <h3>
              /
              {command.name}
            </h3>

            <p>
              {command.description}
            </p>

            {command.options && (
            <>
              <b>Options:</b>

              <div className="optionText">

                {command.options.map((option) => (

                  <li key={option.name}>
                    {option.required && (
                      <LabelOrange text="Required" />
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
            </>
            )}

          </div>
        ))}

      </div>

    );
  }

  return (
    <>
      <h1>Crypto assistant</h1>

      <div style={{ height: 128 }}>
        <img src={image} width={128} className="fadein-image" alt="Crypto assistant icon" />
      </div>

      <p>
        The crypto assistant serves as an interface for your bot via Discord commands.
      </p>

      <h2>Commands</h2>

      {renderSwitch()}

    </>
  );

}
