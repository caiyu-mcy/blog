function showTime(Counter) {
    var query = new AV.Query(Counter);
    document.querySelectorAll('.leancloud_visitors').forEach(function(item) {
        var url = item.id.trim();
        query.equalTo('url', url);
        query.find({
            success: function(results) {
                if (results.length == 0) {
                    document.getElementById(url).innerHTML = '已读：0';
                    return;
                }
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    document.getElementById(url).innerHTML = '已读：' + object.get('time');
                }
            },
            error: function(object, error) {
                console.log('Error: ' + error.code + ' ' + error.message);
            }
        });

    });
}

function addCount(Counter) {
    var Counter = AV.Object.extend('Counter');
    url = document.querySelector('.leancloud_visitors').id.trim();
    title = document.querySelector('.leancloud_visitors').getAttribute('data-title').trim();
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
    if (document.querySelectorAll('.leancloud_visitors').length == 1) {
        addCount(Counter);
    } else if (document.querySelectorAll('.leancloud_visitors').length > 1) {
        showTime(Counter);
    }
})();