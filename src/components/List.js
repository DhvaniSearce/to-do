import React from 'react';
import { FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";

const List = ({ items, removeItem, editItem, checkItem,toggleCompletion}) => {
  return (
    <div className='container'>
      {items.map((item) => {
        const { id, title, completed } = item;
        return (
          <ul className='list-group list-group-flush' key={id}>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
              <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
                {title}
              </span>
              <div className="div-icon" style={{ float: "right" }}>
                <button type='button' className='edit-btn' onClick={() => editItem(id)}>
                  <FaEdit />
                </button>
              
                <button type='button' className='delete-btn' onClick={() => removeItem(id)}>
                  <FaTrash />
                </button>
             
                <button type='button' className='check-btn' onClick={() => checkItem(id)}>
                  <FaCheckCircle style={{ color: completed ? 'green' : 'gray' }} />
                </button>
              </div>

            </li>

          </ul>
        )
      })

      }

    </div>
  )
}

export default List;
