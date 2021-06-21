/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { useForm } from 'react-hook-form';

import configuration from '../data/exampleConfiguration.json';

export default function Account() {

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>

      <h1>Account</h1>

      <h2>Configuration</h2>

      <div className="pageContent-textLeft">

        <pre>
          <code>
            {JSON.stringify(configuration.records, null, 4)}
          </code>
        </pre>

        <form onSubmit={handleSubmit(onSubmit)}>

          <input {...register('firstName')} />
          <select {...register('gender')}>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>

          <input {...register('firstName')} />


          <input type="submit" />

        </form>


      </div>
    </>
  );

}
