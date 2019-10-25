'use strict';

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
               <NavigationForm />
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
               classes="storehouse-btn btn btn-danger nav-item"
               type="button"
               text="Run" />
            <Button
               classes="storehouse-btn btn btn-danger nav-item"
               type="button"
               text="Open DB" />
            <Button
               classes="storehouse-btn btn btn-danger nav-item"
               type="button"
               text="Save DB" />
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
            <textarea className="storehouse_textarea form-control" placeholder="Enter your query...."></textarea>
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
               <tr>
                  <th scope="col">ID</th>
               </tr>
            </thead>
         </table>
      </div>
   );
};

/**
 * Button component
 * @param props 
 */
const Button = props => {
   return (
      <input
         name="storehouse_nav_button"
         type={props.type}
         className={props.classes}
         value={props.text} />
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
   }

   render() {
      return (
         <>
            <NavigationBar />
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