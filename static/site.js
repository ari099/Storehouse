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
         className="storehouse_label bg-dark text-white">{props.text.toUpperCase()}</div>
   );
}

/**
 * Special selectbox for showing the tables in the
 * current database
 * @param props 
 */
const TableSelectBox = props => {
   return (
      <select className="storehouse_select form-control text-white bg-dark">
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
               db_name={props.db_name}
               options={props.options} />
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
               text={props.db_name} />
            <TableSelectBox>
               {props.options}
            </TableSelectBox>
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
         <QueryTextArea onLoad={props.onLoad} records={props.records} />
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
         <ResultsTable onLoad={props.onLoad} records={props.records} />
      </form>
   );
};

/**
 * Table component for showing the results of the query
 * @param props 
 */
const ResultsTable = props => {
   return (
      <div className="storehouse_form_group form-group">
         <table className="storehouse_table table">
            <thead>
               <ResultsTableHeadingRow>
                  {/* <ResultsTableHeadingCell text="ID" /> */}
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
      <th className="storehouse_column border border-danger" scope="col">{props.text}</th>
   )
}

/**
 * Table cell for the ResultsTable component
 * @param props 
 */
const ResultsTableCell = props => {
   return (
      <td className="storehouse_column border border-danger" scope="col">{props.text}</td>
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
 * Main application container component
 */
class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         results: []
      };
      this.handleQuery = this.handleQuery.bind(this);
      this.handleOpenDB = this.handleOpenDB.bind(this);
      this.handleSaveDB = this.handleSaveDB.bind(this);
   }

   /**
    * Query the SQLite database
    */
   handleQuery = (e) => {
      e.preventDefault();

      let newQuery = {
         "db_name": document.getElementById("db_name").value.toLowerCase(),
         "sql": document.getElementById("query").value
      };

      fetch("/", { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(newQuery) })
         .then(res => res.json())
         .then(data => {
            let records = data.map(record => {
               return (
                  <ResultsTableRow>
                     {record.map(cell => {
                        return (
                           <ResultTableCell text={cell} />
                        );
                     })}
                  </ResultsTableRow>
               );
            });
            this.setState({results: records});
         }
      );
      console.log("run");
   }

   /**
    * Upload a SQLite 3 database to the API
    */
   handleOpenDB = () => {
      console.log("open");
   }

   /**
    * Download the current SQLite 3 database from the API
    */
   handleSaveDB = () => {
      console.log("save");
   }

   render() {
      return (
         <>
            <NavigationBar
               run={this.handleQuery}
               open={this.handleOpenDB}
               save={this.handleSaveDB}
               db_name="demo" />
            <Line />
            <QueryForm
               records={this.state.results}
               onLoad={this.handleQuery.bind(this)} />
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