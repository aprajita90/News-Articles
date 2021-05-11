import React, { Component } from 'react';
import Axios from 'axios';
import Table from './Table';
import 'bootstrap/dist/css/bootstrap.min.css';

class NewsArticles extends Component {
    constructor(props) {
      super(props)
      this.state = {
        newData: [],
        searchAll: ''
      }
    }
  
    componentDidMount() {
    Axios.get(`https://newsapi.org/v2/everything?q=Apple&from=2021-05-10&sortBy=popularity&apiKey=85bfa5fe4e3e4264abe47f0a88ecac71`)
        .then((response) => {
            //console.log("----",response.data.articles)
            this.setState({
                newData: response.data.articles,
            })
        })
        .catch((error) => {
            alert(`Error: ${error}`);
        })
    }
    
    myFunction = () => {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            console.log(tr[i])
          td = tr[i].getElementsByTagName("td")[3];
          console.log(td)
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }       
        }
      }

    
    render() {
        console.log("----",this.state.newData)
        return (
          <div>
            <nav className="navbar navbar-light bg-light" >
            {/* Search: <input style={{float:"left"}} value={this.state.searchAll} onChange={this.searchAll} /> */}
            <input type="text" id="myInput" onKeyUp={this.myFunction} placeholder="Search for title..." title="Type in a name" style={{textAlign:"center", float:"revert", pending:"50px"}}></input>
            </nav>
            <div>
            <Table newData={ this.state.newData } />
            </div>
          </div>
        );
      }
    }

    export default NewsArticles