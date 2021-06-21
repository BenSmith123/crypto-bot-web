

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
          <>
            <h3>
              /
              {command.name}
            </h3>

            <p>
              {command.description}
            </p>

            {!command.options || (
            <p>
              Options:
              {command.options.map((option) => (
                <>
                  <li>
                    {!option.required || (
                    <div className="Label--small">
                      required
                    </div>
                    )}
                    <code>
                      {option.name}
                    </code>
                  </li>
                </>
              ))}
            </p>
            )}


          </>
        ))}

      </div>
    </>
  );

}
