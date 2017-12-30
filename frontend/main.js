// Variables
var URL = 'https://backend-gpreewhcgk.now.sh/v1/tag/';
// var time = 1500;

/* Only get the value from each key up */
var keyups = Rx.Observable.fromEvent(input, 'keyup')
    .map(e => e.target.value)
    .filter(text => text.length > 3);

/* Now throttle/debounce the input for 500ms */
var throttled = keyups.throttleTime(500 /* ms */);

/* Now get only distinct values, so we eliminate the arrows and other control characters */
var distinct = throttled.distinctUntilChanged();

var suggestions = distinct.switchMap(searchWikipedia);

suggestions.subscribe(
    data => {
        if (data === [] || typeof data != 'object') {
            results.innerHTML = `<li>FAILED TO FIND THAT TAG</li>`;
        } else {
            results.innerHTML = '';
            data.map(function(val, counter) {
                results.innerHTML += `<li>${counter +
                    1} <a href="${'https://steemit.com' +
                    val.url}" target="_blank">${val.Titles}</a><br/>by ${
                    val.author
                } <br/>${val.Votes} upvotes, ${val.PendingPayouts}</li>`;
            });

            var price = document.getElementById('price');
            var post = document.getElementById('post');
            var upvote = document.getElementById('upvote');

            var totalData = data.reduce((a, b) => ({
                PendingPayouts: a.PendingPayouts + b.PendingPayouts,
                Votes: a.Votes + b.Votes
            }));
            totalData.Posts = data.length;

            console.log(totalData);

            price.innerHTML = totalData.PendingPayouts;
            upvote.innerHTML = totalData.Votes;
            post.innerHTML = totalData.Posts;
        }
    },
    error => {
        results.innerHTML = '';
        results.innerHTML += '<li>Error: ' + error + '</li>';
    }
);

function searchWikipedia(term) {
    var link = URL + term;
    console.log(link);
    results.innerHTML = 'Loading...';

    return fetch(link, { method: 'GET', mode: 'cors' })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            console.log(data);
            return data;
        });
}
