
import React from 'react';

import { CRYPTO_ICONS_URL } from '../environment';

export default function CryptoIcon(props) {
  const { name } = props;
  return (
    <div className="cryptoIcon">
      <img
        className="fadein-image"
        src={`${CRYPTO_ICONS_URL}white/${name.toLowerCase()}/32`}
        alt="icon"
        width="32"
        height="32"
      />
    </div>
  );
}
