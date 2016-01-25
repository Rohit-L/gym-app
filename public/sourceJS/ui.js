/*****************
 ** App Content **
 *****************/

// Creates a Table Header
var TableHeader = React.createClass({
  render: function() {
    var headers = this.props.headers;
    return (
      <thead>
        <tr>
          {headers.map(function(header) {
            return <th key={header}>{header}</th>;
          })}
        </tr>
      </thead>
    );
  }
});

// Creates a Table Row
var TableRow = React.createClass({
  render: function() {
    var items = this.props.items;
    return (
      <tr>
        {items.map(function(item) {
          return <th key={item}>{item}</th>;
        })}
      </tr>
    );
  }
})

// Creates a Table Body
var TableBody = React.createClass({
  render: function() {
    var logs = this.props.logs;
    return (
      <tbody>
        {logs.map(function(log) {
          return <TableRow key={log} items={log} />
        })}
      </tbody>
    )
  }
})


// Creates a Workout Log Card
// Parameters: workoutName (String -- Name of workout)
//             exerciseData (Object: String -> Array)
var LogCard = React.createClass({
  render: function() {
    var data = this.props.exerciseData;
    return (
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{this.props.workoutName} Log</span>
              <table>
                <TableHeader headers={data["headers"]} />
                <TableBody logs={data["logs"]} />
              </table>
            </div>
            <div className="card-action">
              <a href="javascript:void(0);">This is a link</a>
              <a href="javascript:void(0);">This is a link</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

/****************
 ** Navigation **
 ****************/

// Main UI Header
var Header = React.createClass({
  render: function () {
    return (
      <header>
        <nav className='top-nav'>
          <NavBar />
          <SideBar />
        </nav>
      </header>
    );
  }
});

// Main UI Navigation Bar
var NavBar = React.createClass({
  render: function () {
    return (
      <div>
        <div className='container'>
          <div className='nav-wrapper row>'>
            <div className='row'>
              <div className='col s12 m9'>
                <a className='page-title'>Welcome</a>
              </div>
              <div className='col s12 m3 valign-wrapper'>
                <a className="waves-effect waves-light btn blue valign" href='/logout'>Logout</a>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <a className='button-collapse top-nav full hide-on-large-only' href='#' data-activates='nav-movile'>
            <i className='material-icons'>Menu</i>
          </a>
        </div>
      </div>
    );
  }
})

// Main UI SideBar
var SideBar = React.createClass({
  render: function () {
    return (
      <ul id='nav-mobile' className='side-nav fixed'>
        <li className='logo'>
          <a id='logo-container' className='brand-logo'>
            <h4>GymRec</h4>
          </a>
        </li>
        <ul className='collapsible collapsible-accordion'>
          <li className='bold'>
            <a className='collapsible-header waves-effect waves-red'>Logs</a>
          </li>
          <li className='bold'>
            <a className='collapsible-header waves-effect waves-red'>Settings</a>
          </li>
        </ul>
      </ul>
    );
  }
})

/**********************
 ** Main Application **
 **********************/
 var App = React.createClass({
   render: function () {
     var data = this.props.data;
     var LogCards = []
     for (var exercise in data.exercises) {
       exerciseData = data.exercises[exercise];
       LogCards.push(<LogCard workoutName={exercise.upCaseFirstLetter()} exerciseData={exerciseData} key={exercise} />);
     }
     return (
       <div>
        <Header />
        <main>
          {LogCards}
        </main>
       </div>
     );
   }
 })

/***************
 ** Rendering **
 ***************/
data = {
  exercises: {
    "benchpress": {
      "headers": ['Date', 'Weight', 'Reps'],
      "logs": [['October 30', 20, 30], ['November 2', 30, 40]]
    },
    "squat": {
      "headers": ['Date', 'Weight', 'Reps'],
      "logs": [['October 30', 20, 30], ['November 2', 30, 40]]
    },
  }
};
for (var key in data.exercises) {
  console.log(key);
}
ReactDOM.render(<App data={data}/>, document.getElementById('content'));
