import React, {Component} from 'react';

export default function Input({type, name, placeholder, value}) {
  return (<div>
    <input type={type} name={name} placeholder={placeholder} value={value}/>
  </div>)

}
