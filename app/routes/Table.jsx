import React from "react";


const Table = ({ caption, header, body }) => {
  return (
    <table className="table-auto w-full">
      {caption && <caption>{caption}</caption>}
      <thead>
        {header && (
          <tr>
            {header.map((head) => (
              <th key={head.key || head.children}>{head.children}</th>
            ))}
          </tr>
        )}
      </thead>
      <tbody>{body}</tbody>
    </table>
  );
};

export default Table;