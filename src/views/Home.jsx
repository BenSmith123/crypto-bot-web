
import React from 'react';
import PropTypes from 'prop-types';

import { HashLink } from 'react-router-hash-link';


const sections = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'features',
    title: 'Features',
  },
  {
    id: 'examples',
    title: 'Examples',
  },
];


function Section({ title, id }) {

  return (
    <section id={id}>
      <h2>{title}</h2>

      <p style={{ height: 600 }}>
        Here is some text
      </p>
    </section>
  );
}


export default function Topics() {

  return (
    <div className="pageContent-textLeft">

      <h2>Topics</h2>

      <TableOfContents />

      <Section />

      {sections.map((section) => (
        <Section id={section.id} title={section.title} />
      ))}

    </div>
  );
}


function TableOfContents() {
  return (
    <>
      {sections.map((section) => (
        <li>
          <HashLink smooth to={`/#${section.id}`}>{section.title}</HashLink>
        </li>
      ))}
    </>
  );
}


Section.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
