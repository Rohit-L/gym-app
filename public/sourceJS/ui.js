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
var LogCard = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{this.props.workoutName} Log</span>
              <table>
                <TableHeader headers={data.headers} />
                <TableBody logs={data.logs} />
              </table>
            </div>
            <div className="card-action">
              <a href="#">This is a link</a>
              <a href="#">This is a link</a>
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
            <a className='collapsible-header waves-effect waves-teal'>
              Exercises
            </a>
            <div className='collapsible-body'>
              <ul>
                <li>
                  <a>Benchpress</a>
                </li>
                <li>
                  <a>Deadlift</a>
                </li>
                <li>
                  <a>Squat</a>
                </li>
              </ul>
            </div>
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
     return (
       <div>
        <Header />
        <main>
          <LogCard workoutName={"Benchpress"} data={data} />
        </main>
       </div>
     );
   }
 })

/***************
 ** Rendering **
 ***************/
data = {headers: ['Date', 'Weight', 'Reps'], logs: [['October 30', 20, 30], ['November 2', 30, 40]]};
ReactDOM.render(<App />, document.getElementById('content'));
