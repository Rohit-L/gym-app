/*****************
 ** App Content **
 *****************/

// Creates a Table Header
var TableHeader = React.createClass({
  displayName: "TableHeader",

  render: function () {
    var headers = this.props.headers;
    return React.createElement(
      "thead",
      null,
      React.createElement(
        "tr",
        null,
        headers.map(function (header) {
          return React.createElement(
            "th",
            { key: header },
            header
          );
        })
      )
    );
  }
});

// Creates a Table Row
var TableRow = React.createClass({
  displayName: "TableRow",

  render: function () {
    var items = this.props.items;
    return React.createElement(
      "tr",
      null,
      items.map(function (item) {
        return React.createElement(
          "th",
          { key: item },
          item
        );
      })
    );
  }
});

// Creates a Table Body
var TableBody = React.createClass({
  displayName: "TableBody",

  render: function () {
    var logs = this.props.logs;
    return React.createElement(
      "tbody",
      null,
      logs.map(function (log) {
        return React.createElement(TableRow, { key: log, items: log });
      })
    );
  }
});

// Creates a Workout Log Card
var LogCard = React.createClass({
  displayName: "LogCard",

  render: function () {
    var data = this.props.data;
    return React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "div",
        { className: "col s12 m6" },
        React.createElement(
          "div",
          { className: "card blue-grey darken-1" },
          React.createElement(
            "div",
            { className: "card-content white-text" },
            React.createElement(
              "span",
              { className: "card-title" },
              this.props.workoutName,
              " Log"
            ),
            React.createElement(
              "table",
              null,
              React.createElement(TableHeader, { headers: data.headers }),
              React.createElement(TableBody, { logs: data.logs })
            )
          ),
          React.createElement(
            "div",
            { className: "card-action" },
            React.createElement(
              "a",
              { href: "#" },
              "This is a link"
            ),
            React.createElement(
              "a",
              { href: "#" },
              "This is a link"
            )
          )
        )
      )
    );
  }
});

/****************
 ** Navigation **
 ****************/

// Main UI Header
var Header = React.createClass({
  displayName: "Header",

  render: function () {
    return React.createElement(
      "header",
      null,
      React.createElement(
        "nav",
        { className: "top-nav" },
        React.createElement(NavBar, null),
        React.createElement(SideBar, null)
      )
    );
  }
});

// Main UI Navigation Bar
var NavBar = React.createClass({
  displayName: "NavBar",

  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "nav-wrapper row>" },
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col s12 m9" },
              React.createElement(
                "a",
                { className: "page-title" },
                "Welcome"
              )
            ),
            React.createElement(
              "div",
              { className: "col s12 m3 valign-wrapper" },
              React.createElement(
                "a",
                { className: "waves-effect waves-light btn blue valign", href: "/logout" },
                "Logout"
              )
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "a",
          { className: "button-collapse top-nav full hide-on-large-only", href: "#", "data-activates": "nav-movile" },
          React.createElement(
            "i",
            { className: "material-icons" },
            "Menu"
          )
        )
      )
    );
  }
});

// Main UI SideBar
var SideBar = React.createClass({
  displayName: "SideBar",

  render: function () {
    return React.createElement(
      "ul",
      { id: "nav-mobile", className: "side-nav fixed" },
      React.createElement(
        "li",
        { className: "logo" },
        React.createElement(
          "a",
          { id: "logo-container", className: "brand-logo" },
          React.createElement(
            "h4",
            null,
            "GymRec"
          )
        )
      ),
      React.createElement(
        "ul",
        { className: "collapsible collapsible-accordion" },
        React.createElement(
          "li",
          { className: "bold" },
          React.createElement(
            "a",
            { className: "collapsible-header waves-effect waves-teal" },
            "Exercises"
          ),
          React.createElement(
            "div",
            { className: "collapsible-body" },
            React.createElement(
              "ul",
              null,
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  null,
                  "Benchpress"
                )
              ),
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  null,
                  "Deadlift"
                )
              ),
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  null,
                  "Squat"
                )
              )
            )
          )
        )
      )
    );
  }
});

/**********************
 ** Main Application **
 **********************/
var App = React.createClass({
  displayName: "App",

  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(Header, null),
      React.createElement(
        "main",
        null,
        React.createElement(LogCard, { workoutName: "Benchpress", data: data })
      )
    );
  }
});

/***************
 ** Rendering **
 ***************/
data = { headers: ['Date', 'Weight', 'Reps'], logs: [['October 30', 20, 30], ['November 2', 30, 40]] };
ReactDOM.render(React.createElement(App, null), document.getElementById('content'));