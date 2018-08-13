function showTime(Counter) {
    var query = new AV.Query(Counter);
    query.descending('createdAt');
    query.find().then(function (results) {
        results.map(object => {
            let DOM = document.getElementById(object.get('url'));
            let time = object.get('time');
            if(DOM) {
                DOM.innerHTML = '已读：'+object.get('time')
            }
        })
    })
}

function addCount(Counter, DOMS) {
    // var Counter = AV.Object.extend('Counter');
    url = DOMS[0].id.trim();
    title = DOMS[0].getAttribute('data-title').trim();
    var query = new AV.Query(Counter);
    query.equalTo('url', url);
    query.find({
        success: function(results) {
            if (results.length > 0) {
                var counter = results[0];
                counter.fetchWhenSave(true);
                counter.increment('time');
                counter.save(null, {
                    success: function(counter) {
                        document.getElementById(url).innerHTML = '已读：' + counter.get('time');
                    },
                    error: function(counter, error) {
                        console.log('Failed to save Visitor num, with error message: ' + error.message);
                    }
                });
            } else {
                var newcounter = new Counter();
                newcounter.set('title', title);
                newcounter.set('url', url);
                newcounter.set('time', 1);
                newcounter.save(null, {
                    success: function(newcounter) {
                        document.getElementById(url).innerHTML = '已读：' + newcounter.get('time');
                    },
                    error: function(newcounter, error) {
                        console.error('Failed to create');
                    }
                });
            }
        },
        error: function(error) {
            console.error('Error:' + error.code + ' ' + error.message);
        }
    });
}
(function() {
    var Counter = AV.Object.extend('Counter');
    var DOMS = document.querySelectorAll('.leancloud_visitors');

    if (DOMS.length == 1) {
        addCount(Counter, DOMS);
    }
    else if (DOMS.length > 1) {
        showTime(Counter, DOMS);
    }
})();
