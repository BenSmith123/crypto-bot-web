

import React from 'react';

import { commands } from '../data/discordCommands.json';

import image from '../assets/crypto-assistant-icon.jpg';

export default function Commands() {

  return (
    <>
      <h1>Crypto assistant</h1>

      <img src={image} alt="Crypto assistant icon" />

      <p>
        The crypto assistant serves as an interface for your bot via Discord commands.
      </p>

      <h2>Commands</h2>

      <div className="pageContent-textLeft">

        {commands.map((command) => (
          <div className="commandItem">
            <h3>
              /
              {command.name}
            </h3>

            <p>
              {command.description}
            </p>

            {!command.options || (
            <p>
              <b>Options:</b>

              <div className="optionText">

                {command.options.map((option) => (

                  <li>
                    {!option.required || (
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
    </>
  );

}