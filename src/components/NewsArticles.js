import React, { Component } from 'react';
import Axios from 'axios';
import Table from './Table';
import ReactPaginate from 'react-paginate';
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class NewsArticles extends Component {
    constructor(props) {
      super(props)
      this.state = {
        offset: 0,
        newData: [],
        searchAll: '',
        perPage: 10,
        currentPage: 0
      };
      this.handlePageClick = this.handlePageClick.bind(this);
    }
  
    receivedData() {
    Axios.get(`https://newsapi.org/v2/everything?q=Apple&from=2021-05-10&sortBy=popularity&apiKey=85bfa5fe4e3e4264abe47f0a88ecac71`)
        .then((response) => {
            //console.log("----",response.data.articles)
            const newData = response.data.articles;
            const slice = newData.slice(this.state.offset, this.state.offset + this.state.perPage)
            console.log("***", slice)
            // const postData = slice.map(pd => <React.Fragment>
            //   <tr key={ pd.publishedAt }>
            //     <td><img src={ pd.urlToImage } style={{ width: 120 }}/></td>
            //     <td>{ pd.source.name }</td>
            //     <td>{pd.author}</td>
            //     <td>{ pd.title }</td>
            //     <td>{ pd.publishedAt }</td>
            //     <td> { pd.url }</td>
            //   </tr> 
            // </React.Fragment>)
            this.setState({
               // newData: response.data.articles,
               pageCount: Math.ceil(newData.length / this.state.perPage),
               slice 
            })
        })
        .catch((error) => {
            alert(`Error: ${error}`);
        })
    }
    handlePageClick = (e) => {
      const selectedPage = e.selected
      const offset = selectedPage * this.state.perPage;

      this.setState({
          currentPage: selectedPage,
          offset: offset
      }, () => {
          this.receivedData()
      });

  };
  componentDidMount() {
    this.receivedData()
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
      console.log("$$$$", this.state.newData)
        return (
          <div>
            <nav className="navbar navbar-light bg-light" >
            {/* Search: <input style={{float:"left"}} value={this.state.searchAll} onChange={this.searchAll} /> */}
            <input type="text" id="myInput" onKeyUp={this.myFunction} placeholder="Search for title..." title="Type in a name" style={{textAlign:"center", float:"revert", pending:"50px"}}></input>
            </nav>
            <div>
            {/* <Table newData={ this.state.slice} /> */}
            {/* <Table newData={ this.state.newData  } /> */}
            <Table newData={ this.state.slice} />
            {/* <Table newData= {this.state.postData}/> */}
              <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}/>
                  </div>
            </div>
        );
      }
    }

    export default NewsArticles