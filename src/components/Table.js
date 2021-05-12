import React from 'react';

const SortTable = (n) => {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    dir = "asc";
    while (switching) {

      switching = false;
      rows = table.rows;
      
      for (i = 1; i < (rows.length - 1); i++) {
       
        shouldSwitch = false;
       
        x = rows[i].getElementsByTagName("td")[n];
        y = rows[i + 1].getElementsByTagName("td")[n];
        
        if (dir === "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            
            shouldSwitch = true;
            break;
          }
        } else if (dir === "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
       
        switchcount ++;
      } else {
        
        if (switchcount === 0 && dir === "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

const Table = ({ newData }) => {
    console.log(newData)
  return (
    <table id="myTable" className="table" >
      <thead>
        <tr>
            <th>Image</th>
            <th>Source</th>
            <th>Author</th>
            <th>Title</th>
            <th onClick={(e) => SortTable(0)}>Date</th>
            <th>URL</th>
        </tr>
      </thead>
      <tbody>
        { (newData) ? newData.map( (article) => {
           return (
            <tr key={ article.publishedAt }>
              <td><img src={ article.urlToImage } style={{ width: 120 }}/></td>
              <td>{ article.source.name }</td>
              <td>{article.author}</td>
              <td>{ article.title }</td>
              <td>{ article.publishedAt }</td>
              <td> { article.url }</td>
            </tr>
          )
         }) : <tr><td colSpan="5">Loading...</td></tr> }   
      </tbody>
    </table>
  );
}

export default Table