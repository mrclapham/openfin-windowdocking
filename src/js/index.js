var dockingManager;

document.addEventListener("DOMContentLoaded", function(){
    init();
})

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
    createDockedWindow()
}

function initNoOpenFin(){
    alert("OpenFin is not available - you are probably running in a browser.");
}
var _generateRandomName = function(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function createDockedWindow(){
    var _name =  _generateRandomName()
    var _content = document.createElement('div');
    _content.innerHTML = "<h3>"+_name+"</h3>"
    var child = new fin.desktop.Window({
        name:_name,
        defaultWidth: 266,
        defaultHeight: 127,
        defaulTop: 127,
        defaultLeft: 127,
        showTaskbarIcon: true
    }, function () {
        // gets the HTML window of the child
        dockingManager.register(child, true);
        var wnd = child.getNativeWindow();
        wnd.document.body.appendChild(_content);
        child.show();
    });
}