import React from 'react';
import {Circle} from 'react-konva';

export default function Food(props) {
  let x=Math.floor(Math.random()*(props.size-1))*30+15;
  let y=Math.floor(Math.random()*(props.size-1))*30+15;
  return(<Circle radius={8} x={x} y={y} fill='red' />)
}
