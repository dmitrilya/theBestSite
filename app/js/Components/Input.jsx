import React, {Component} from 'react';

export default function Input(props) {
  return (<div>
    <input type={props.type
} name={props.name
} placeholder={props.placeholder
} value={props.value
} onClick={props.onClick
} onChange={props.onChange
} className={props.className
} ref={props.inputRef
}/>
  </div>)

}
