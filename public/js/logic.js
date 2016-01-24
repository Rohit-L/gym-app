$(document).ready(function () {
  $.ajax({url: "/info" }).done(function(response) {
      console.log(response);
      createTable(response);
  });
});

function createTable(data) {
  main = $('main');
  html = '<div class="row"> \
            <div class="col s6"> \
              <div class="card blue-grey"> \
                <div class="card-content white-text"> \
                  <span class="card-title">Log</span> \
                </div> \
              </div> \
            </div> \
           </div>'
  main.append(html);
}
