import "./App.css";
import { useState } from "react";
import Papa from "papaparse";
import Table from "./components/Table";
// import { MDBDataTable } from 'mdbreact';

const DATA_URL = "https://storedata-3e6ee-default-rtdb.firebaseio.com/store.json"

function App() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const handleEditRow = (idx) => {
    console.log(idx)
    // setRowToEdit(idx);

    // setModalOpen(true);
  };

  const sendData = async () =>{
    const data ={
      headerdata: tableRows,
      value : values
    }
    // console.log(":");
    // console.log(el, "Prabhu",data);
    const response = await fetch(DATA_URL,{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      }
    });
    const results = await response.json();
    console.log(results);

  }

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },
    });
    // console.log("ParseData", parsedData);
  };

  return (
    <div>
      {/* File Uploader */}
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      <br />
      <br />
      {/* Table */}
      <table>
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
<div class = "btncenter">{values.length>0 && (<button  onClick= {sendData} class="button">Send Data</button>)

}

</div>

    </div>

  );
}

export default App;
