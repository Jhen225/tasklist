import React, { } from 'react';

const taskitem = (props) => {
  let items = props.items.map((item, i) => {
    return (
      <a className="item" key={item._id} onClick={props.onItemClick}>
        <p className="itemPriority">{item.priority}</p>
        <p className="itemDescription">{item.description}</p>
      </a>
    );
  });
  return (
    <div className="items">
      {items ? items : <p>You have no tasks</p>}
    </div>
  );
}

export default taskitem;