'use strict';

// Components
/**
 * Textbox component
 * @param props 
 */
const TextBox = props => {
   return (
      <input
         className="storehouse_textbox form-control-lg text-white bg-dark"
         name={props.name}
         type="text"
         placeholder={props.placeholder} />
   );
};

/**
 * Label component
 * @param props 
 */
const Label = props => {
   return (
      <div
         id={props.id}
         className={props.type + " text-white"}>{props.text.toUpperCase()}</div>
   );
}

/**
 * Special selectbox for showing the tables in the
 * current database
 * @param props 
 */
const TableSelectBox = props => {
   return (
      <select className="storehouse_select container form-control text-white">
         {props.children}
      </select>
   )
}

const TableSelectOption = props => {
   return (
      <option value={props.value}>{props.value}</option>
   )
}

/**
 * Line component
 * @param props 
 */
const Line = props => {
   return (
      <br />
   );
};

const Image = props => {
   return (
      <img className="storehouse_image" src={props.sourcePath} />
   );
}

/**
 * Navigation bar React component
 * @param props 
 */
const NavigationBar = props => {
   return (
      <nav className="storehouse-navbar navbar navbar-expand-lg navbar-dark">
         <a className="storehouse_navbar_brand navbar-brand" href="/">
            <Image sourcePath="./static/storehouse-cube-logo(1).png" />
         </a>
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
         </button>
         <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <NavigationForm
               run={props.handleQuery}
               open={props.handleOpenDB}
               save={props.handleSaveDB}
               db_name={props.db_name} />
         </div>
      </nav>
   );
};

/**
 * Navigation form meant for executing SQLite queries
 * and uploading and downloading SQLite databases
 * @param props 
 */
const NavigationForm = props => {
   return (
      <form className="form-inline navbar-nav">
         <div className="storehouse-form-group form-group">
            <Button
               id="run_query"
               classes="storehouse-btn btn nav-item"
               onClick={props.run}
               imageUrl="./static/storehouse_run.svg" />
            <Button
               id="open_db"
               classes="storehouse-btn btn nav-item"
               onClick={props.open}
               imageUrl="./static/storehouse_open_db.svg" />
            <Button
               id="save_db"
               classes="storehouse-btn btn nav-item"
               onClick={props.save}
               imageUrl="./static/storehouse_save_db.svg" />
            <Label
               id="db_name"
               type="storehouse_label"
               text={props.db_name} />
         </div>
      </form>
   );
};

/**
 * Form for querying the SQLite database
 * @param props 
 */
const QueryForm = props => {
   return (
      <div className="container-fluid">
         <form className="storehouse_jumbotron">
            <div className="storehouse_form_group form-group">
               <textarea
                  id="query"
                  name="query"
                  className="storehouse_textarea form-control"
                  placeholder="Enter your query...."
                  defaultValue="SELECT * FROM demo"></textarea>
            </div>
            <TableSelectBox>
               {props.options}
            </TableSelectBox>
         </form>
      </div>
   );
};

/**
 * TextArea meant for querying the SQLite database
 * @param props 
 */
const QueryTextArea = props => {
   return (
         <form className="storehouse_jumbotron">
            <div className="storehouse_form_group form-group">
               <textarea
                  id="query"
                  className="storehouse_textarea form-control"
                  placeholder="Enter your query...."
                  defaultValue="SELECT * FROM demo"></textarea>
            </div>
         </form>
   );
};

/**
 * Table component for showing the results of the query
 * @param props 
 */
const ResultsTable = props => {
   return (
      <div onLoad={props.onLoad} className="storehouse_form_group storehouse_form_group_table form-group">
         <table className="storehouse_table table">
            <thead>
               <ResultsTableHeadingRow>
                  {props.record_headings}
               </ResultsTableHeadingRow>
            </thead>
            <tbody>
               {props.records}
            </tbody>
         </table>
      </div>
   );
};

/**
 * Table heading row for the ResultsTable component
 * @param props 
 */
const ResultsTableHeadingRow = props => {
   return (
      <tr>
         {props.children}
      </tr>
   );
}

/**
 * Table row for the ResultsTable component
 * @param props 
 */
const ResultsTableRow = props => {
   return (
      <tr>
         {props.children}
      </tr>
   );
}

/**
 * Table heading cell for the ResultsTable component
 * @param props 
 */
const ResultsTableHeadingCell = props => {
   return (
      <th className="storehouse_column border-0 border-danger" scope="col">{props.text}</th>
   )
}

/**
 * Table cell for the ResultsTable component
 * @param props 
 */
const ResultsTableCell = props => {
   return (
      <td className="storehouse_column border-0 border-danger" scope="col">{props.text}</td>
   )
}

/**
 * Button component
 * @param props 
 */
const Button = props => {
   return (
      <button
         id={props.id}
         name="storehouse_nav_button"
         onClick={props.onClick}
         className={props.classes}>
         <img className="storehouse_query_button_image" src={props.imageUrl} />
      </button>
   );
};

/**
 * Switch component
 * @param props 
 */
const Switch = props => {
   return (
      <input type="checkbox" onChange={props.onChange} className="storehouse_switch custom-control-input" id="customSwitch1" />
   );
}

/**
 * Main application container component
 */
class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         results: [],
         tables: [],
         errorMessage: null,
         showDesignView: false,
         currentDB: <Label id="db_name" type="storehouse_label" text="demo" />
      };

      this.handleQuery = this.handleQuery.bind(this);
      this.handleOpenDB = this.handleOpenDB.bind(this);
      this.handleSaveDB = this.handleSaveDB.bind(this);
      this.handleCheck = this.handleCheck.bind(this);
      this.listTables = this.listTables.bind(this);
   }

   /**
    * Query the SQLite database
    */
   handleQuery = (e) => {
      e.preventDefault();

      const newQuery = {
         "db_name": document.getElementById("db_name").innerText.toLowerCase(),
         "sql": document.getElementById("query").value
      };

      fetch('/', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(newQuery) })
         .then(res => res.json())
         .then(data => {
            if(data.length !== undefined) {
               let records = data.map(record => {
                  return (
                     <ResultsTableRow key={record[0]}>
                        {record.map(cell => {
                           return (
                              <ResultsTableCell key={Math.round(Math.random() * 1000,0)} text={cell} />
                           );
                        })}
                     </ResultsTableRow>
                  );
               });
               this.setState({results: records});
               this.setState({errorMessage: <></>});
            } else {
               this.setState({results: []});
               this.setState({errorMessage: <Label id="errorMessage" type="storehouse_danger_label" text={data['Error']} /> });
            }
         }
      );
      this.listTables(e);
   }

   /**
    * Get tables from particular database
    * to put in the TableSelectBox
    */
   listTables = (e) => {
      const newQuery = {
         "db_name": document.getElementById("db_name").innerText.toLowerCase(),
         "sql": "SELECT * FROM sqlite_master WHERE type='table';"
      };

      fetch('/', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(newQuery) })
         .then(res => res.json())
         .then(data => {
            let options = data.map(option => {
               return (
                  <TableSelectOption key={Math.round(Math.random() * 1000,0)} value={option[1]} />
               );
            });
            this.setState({tables: options});
         }
      );
   }

   /**
    * Open file dialog
    */
   handleOpenDB = (e) => {
      e.preventDefault();
      document.getElementById('db_file_upload').click();
   }

   /**
    * Upload a SQLite 3 database to the API
    * First, get the file object
    * Send it through fetch to the right API method
    * Use the results to reassign the database name label
    * and update the table select box with the tables in the
    * database
    * Set the state of 'results' to an empty array
    */
   sendFile = (e) => {
      const fileInput = document.querySelector('#db_file_upload');
      const formData = new FormData();

      formData.append('db_file_upload', fileInput.files[0]);

      const options = {
         method: 'POST',
         body: formData
      };

      fetch('/upload_db_file/', options)
         .then(res => res.json())
         .then(data => {
            if(data['name'] !== null) {
               document.getElementById("query").value = "";
               this.setState({currentDB: <Label id="db_name" type="storehouse_label" text={data['name'].toUpperCase()} />})
               this.listTables(e);
               this.setState({results: []});
               this.setState({errorMessage: <></>});
            } else {
               this.setState({errorMessage: <Label id="errorMessage" type="storehouse_danger_label" text="Please upload an actual SQLite 3 database" />});
            }
         });
   }

   /**
    * Download the current SQLite 3 database from the API
    */
   handleSaveDB = (e) => {
      e.preventDefault();

      const downloadJson = {
         "db_name": document.getElementById("db_name").innerText.toLowerCase()
      };

      const options = {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(downloadJson)
      };

      fetch('/download_db_file/', options)
         .then(res => res.blob())
         .then(data => {
            let url = window.URL.createObjectURL(data);
            let a = document.createElement('a');
            a.href = url;
            a.download = downloadJson['db_name'] + ".sqlite3";
            document.body.appendChild(a);
            a.click();
            a.remove();
         });
   }

   handleCheck = () => {
      this.setState({showDesignView: !this.state.showDesignView});

      if(this.state.showDesignView === false)
         this.listTables();
   }

   handleEntity = (e) => {
      e.preventDefault();
   }

   handleRelationship = (e) => {
      e.preventDefault();
   }

   render() {
      let formToShow;
      let controlsToShow;
      if (this.state.showDesignView) {
         formToShow = <svg className="storehouse_design_ui container-fluid"></svg>;
         controlsToShow = <>
            <Button
               id="add_entity"
               classes="storehouse-btn btn nav-item"
               onClick={this.handleEntity}
               imageUrl="./static/storehouse_entity.svg" />
            <Button
               id="add_relationship"
               classes="storehouse-btn btn nav-item"
               onClick={this.handleRelationship}
               imageUrl="./static/storehouse_relationship.svg" />
         </>;
      } else {
         formToShow = <><QueryForm options={this.state.tables} /><ResultsTable records={this.state.results} /></>;
         controlsToShow = <>
            <Button
               id="run_query"
               classes="storehouse-btn btn nav-item"
               onClick={this.handleQuery}
               imageUrl="./static/storehouse_run.svg" />
            <Button
               id="open_db"
               classes="storehouse-btn btn nav-item"
               onClick={this.handleOpenDB}
               imageUrl="./static/storehouse_open_db.svg" />
            <Button
               id="save_db"
               classes="storehouse-btn btn nav-item"
               onClick={this.handleSaveDB}
               imageUrl="./static/storehouse_save_db.svg" />
         </>;
      }

      return (
         <>
            <nav onLoad={this.listTables} className="storehouse-navbar navbar navbar-expand-lg navbar-dark">
               <a className="storehouse_navbar_brand navbar-brand" href="/">
                  <Image sourcePath="./static/storehouse-cube-logo(2).png" />
               </a>
               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <form className="form-inline navbar-nav">
                     <div id="admin_bar" className="storehouse-form-group form-group">
                        {controlsToShow}
                        {this.state.currentDB}
                        <input type="file"
                           id="db_file_upload"
                           name="db_file_upload"
                           className="form-control"
                           onChange={this.sendFile}
                           hidden />
                        <div className="custom-control custom-switch">
                           <Switch onChange={this.handleCheck} />
                           <label className="storehouse-text custom-control-label" htmlFor="customSwitch1">Design View</label>
                        </div>
                        {this.state.errorMessage}
                     </div>
                  </form>
               </div>
            </nav>
            <Line />
            {formToShow}
         </>
      );
   }
};

/**
 * Rendering the application
 */
ReactDOM.render(
   <App />,
   document.getElementById("root")
);