// Variables
var URL = 'http://en.wikipedia.org/w/api.php';
var time = 500;

// Keys
var input = document.getElementById('input');
var results = document.getElementById('results');

/* Only get the value from each key up */
var keyups = Rx.Observable.fromEvent(input, 'keyup')
    .map(e => e.target.value)
    .filter(text => text.length > 3);

/* Now throttle/debounce the input for 500ms */
var throttled = keyups.throttleTime(time);

/* Now get only distinct values, so we eliminate the arrows and other control characters */
var distinct = throttled.distinctUntilChanged();

var suggestions = distinct.switchMap(searchWikipedia);

suggestions.subscribe(
    data => {
        var res = data[1];
        var link = data[3];
        var disp = res.map((x, i) => [x, link[i]]);
        console.log(disp);
        results.innerHTML = '';
        disp.map(value => {
            results.innerHTML += `<li><a href="${value[1]}" target="_blank">${
                value[0]
            }</a></li>`;
        });
    },
    error => {
        results.innerHTML = '';
        results.innerHTML += '<li>Error: ' + error + '</li>';
    }
);

function searchWikipedia(term) {
    console.log(term);
    return $.ajax({
        url: URL,
        dataType: 'jsonp',
        data: {
            action: 'opensearch',
            format: 'json',
            search: term
        }
    }).promise();
}
