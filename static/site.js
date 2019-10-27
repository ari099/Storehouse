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
         className="storehouse_label bg-dark text-white">{props.text.toUpperCase()}</div>
   );
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

/**
 * Navigation bar React component
 * @param props 
 */
const NavigationBar = props => {
   return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
         <a className="storehouse_navbar_brand navbar-brand" href="/">Storehouse</a>
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
         </button>
         <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
               <NavigationForm
                  run={props.handleQuery}
                  open={props.handleOpenDB}
                  save={props.handleSaveDB} />
            </div>
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
      <form className="form-inline">
         <div className="storehouse-form-group form-group">
            <Button
               id="run_query"
               classes="storehouse-btn btn btn-danger nav-item"
               onClick={props.run}
               imageUrl="./static/storehouse_run.svg" />
            <Button
               id="open_db"
               classes="storehouse-btn btn btn-danger nav-item"
               onClick={props.open}
               imageUrl="./static/storehouse_open_db.svg" />
            <Button
               id="save_db"
               classes="storehouse-btn btn btn-danger nav-item"
               onClick={props.save}
               imageUrl="./static/storehouse_save_db.svg" />
            <Label
               text="demo" />
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
         <QueryTextArea />
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
            <textarea id="query" className="storehouse_textarea form-control" placeholder="Enter your query...."></textarea>
         </div>
         <ResultsTable />
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
               <ResultsTableHeadingRow />
            </thead>
            <tbody>
               <ResultsTableRow />
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
         <ResultsTableHeadingCell text="ID" />
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
         <ResultsTableCell text="(data)" />
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
   handleQuery(e) {
      e.preventDefault();

      // let newQuery = {
      //    "db_name": "demo",
      //    "query": document.getElementById("query").value
      // };

      // fetch("/", { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(newQuery) })
      //    .then(res => res.json())
      //    .then(data => {
      //       let results = data.map(ingredient => {
      //          return (
      //             <ResultsTableRow />
      //          );
      //       });
      //       this.setState({results: results});
      //    }
      // );
      console.log("run");
   }

   handleOpenDB(e) {
      e.preventDefault();
      console.log("open");
   }

   handleSaveDB(e) {
      e.preventDefault();
      console.log("save");
   }

   render() {
      return (
         <>
            <NavigationBar
               run={this.props.handleQuery}
               open={this.props.handleOpenDB}
               save={this.props.handleSaveDB} />
            <Line />
            <QueryForm />
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