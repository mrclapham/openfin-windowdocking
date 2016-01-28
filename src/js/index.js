var dockingManager, _childWindows, _dockButton,  _dockingEnabled = false;

document.addEventListener("DOMContentLoaded", function(){
    init();
});

function init(){
    console.log("Dom Loaded ", this);
    try{
        fin.desktop.main(function(){
            initWithOpenFin();
        })
    }catch(err){
        initNoOpenFin();
    }
};

function initWithOpenFin(){
    dockingManager = DockingManager.getInstance();
    dockingManager.register(fin.desktop.Window.getCurrent(), true);
    // Your OpenFin specific code to go here...
    // Create a bunch of simple external windows -- the
    var _windowPromises = [createDockedWindow(),createDockedWindow(),createDockedWindow(),createDockedWindow()];
    // Once all promises are fulfilled - save them in _childWindows Array.
    Promise.all(_windowPromises).then(function(values) {
        _childWindows = values;
        console.log("_childWindows ", values );
        _dockButton = document.querySelector("#dockButton");
        _dockButton.addEventListener('click', function(){
            _dockingEnabled ? removeArrayFromDockingWindows(_childWindows) :  addArrayToDockingWindows(_childWindows);
        })
    });
}

function initNoOpenFin(){
    alert("OpenFin is not available - you are probably running in a browser.");
}
//

function addArrayToDockingWindows(array){
    console.log(">> addArrayToDockingWindows")
    array.map(function(d,i){
        dockingManager.register(d, true);
    });
    _dockingEnabled = true;
    _dockButton.value = "disable docking "
}

function removeArrayFromDockingWindows(array){
    console.log("__ removeArrayFromDockingWindows")

    array.map(function(d,i){
        dockingManager.unregister(d);
    });
    _dockingEnabled = false;
    _dockButton.value = "enable docking "

}


var _generateRandomName = function(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

function createDockedWindow(){
    var _name =  _generateRandomName(),
        _content = document.createElement('div');
        _content.innerHTML = "<h3>"+_name+"</h3>";
    return new Promise(function(resolve, reject){
        var child = new fin.desktop.Window({
            name:_name,
            defaultWidth: 266,
            defaultHeight: 127,
            defaultTop: (Math.random() * 800),
            defaultLeft: (Math.random() * 800),
            showTaskbarIcon: true
        }, function () {
            // gets the HTML window of the child
            // dockingManager.register(child, true);
            var wnd = child.getNativeWindow();
            wnd.document.body.appendChild(_content);
            child.show();
            resolve(child);
        });
    });
}