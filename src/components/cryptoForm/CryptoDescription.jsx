
import React, { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import AppContext from '../AppContext';


export default function CryptoDescription(props) {

  const { text } = props;
  const [display, setDisplay] = useState();

  return (
    <>
      <AppContext.Consumer>
        {({ isMobile }) => (
          <>
            <AiOutlineInfoCircle onClick={() => setDisplay(true)} />
            {(!isMobile || display) && <p>{text}</p>}
          </>
        )}
      </AppContext.Consumer>
      {text}

      <div>
        The amount of USDT to use when trading the given crypto. The limit will be adjusted on
        every sell transaction to continue trading with additional gains/losses.
      </div>
    </>
  );
}
